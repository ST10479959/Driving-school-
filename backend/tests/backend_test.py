"""Backend API tests for Ray Driving School (Reviews + Admin moderation + regression)."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")
API = f"{BASE_URL}/api"
ADMIN_TOKEN = "ray-admin-2025"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def admin_headers():
    return {"X-Admin-Token": ADMIN_TOKEN, "Content-Type": "application/json"}


# ===== Root =====
class TestRoot:
    def test_root_ok(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "message" in data


# ===== Business (regression) =====
class TestBusiness:
    def test_get_business(self, client):
        r = client.get(f"{API}/business")
        assert r.status_code == 200
        d = r.json()
        assert d["name"] == "Ray Driving School"
        assert d["phone"] == "073 403 7108"
        assert "1 Goldman Street" in d["address"]
        assert "Florida" in d["address"]
        assert "Roodepoort" in d["address"]
        assert isinstance(d["services"], list) and len(d["services"]) == 9
        assert isinstance(d["hours"], list) and len(d["hours"]) == 3
        assert "_id" not in d


# ===== Lessons (regression) =====
class TestLessons:
    def test_create_lesson_full(self, client, admin_headers):
        payload = {
            "name": "TEST_Lerato Dlamini",
            "phone": "0734037108",
            "email": "test_lerato@example.com",
            "licence_type": "Learner's Licence Training",
            "preferred_days": "Saturday Morning",
            "experience_level": "Complete beginner",
            "message": "I'm a complete beginner.",
        }
        r = client.post(f"{API}/lessons", json=payload)
        assert r.status_code == 201, r.text
        d = r.json()
        assert d["name"] == payload["name"]
        assert d["status"] == "new"
        assert "_id" not in d
        assert isinstance(d["id"], str) and len(d["id"]) > 0

        # Admin GET to verify persistence
        list_r = requests.get(f"{API}/admin/lessons", headers=admin_headers)
        assert list_r.status_code == 200
        assert any(item["id"] == d["id"] for item in list_r.json())

    def test_create_lesson_missing_name(self, client):
        r = client.post(f"{API}/lessons", json={"phone": "0612345678", "licence_type": "X"})
        assert r.status_code == 422

    def test_create_lesson_missing_phone(self, client):
        r = client.post(f"{API}/lessons", json={"name": "TEST_X", "licence_type": "X"})
        assert r.status_code == 422


# ===== Contact (regression) =====
class TestContact:
    def test_create_contact_valid(self, client, admin_headers):
        payload = {
            "name": "TEST_Contact",
            "message": "Hello, I'd like info.",
            "phone": "0612345678",
            "email": "test_contact@example.com",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 201, r.text
        d = r.json()
        assert d["name"] == "TEST_Contact"
        assert d["message"] == payload["message"]
        assert "_id" not in d

        list_r = requests.get(f"{API}/admin/contact", headers=admin_headers)
        assert list_r.status_code == 200
        assert any(m["id"] == d["id"] for m in list_r.json())

    def test_create_contact_missing_message(self, client):
        r = client.post(f"{API}/contact", json={"name": "TEST_C3"})
        assert r.status_code == 422


# ===== Reviews public =====
class TestReviewsPublic:
    @pytest.fixture
    def created_review_id(self, client):
        payload = {
            "name": "TEST_Review_Public",
            "rating": 5,
            "text": "Ray was a fantastic instructor and very patient with me.",
            "location": "Roodepoort",
            "achievement": "Passed K53",
        }
        r = client.post(f"{API}/reviews", json=payload)
        assert r.status_code == 201, r.text
        d = r.json()
        assert d["name"] == payload["name"]
        assert d["rating"] == 5
        assert d["approved"] is False, "New reviews must default to approved=false"
        assert "_id" not in d
        assert isinstance(d["id"], str) and len(d["id"]) > 0
        return d["id"]

    def test_create_review_valid(self, created_review_id):
        assert created_review_id  # creation succeeded

    def test_create_review_missing_name(self, client):
        r = client.post(f"{API}/reviews", json={"rating": 5, "text": "Great instructor truly."})
        assert r.status_code == 422

    def test_create_review_missing_text(self, client):
        r = client.post(f"{API}/reviews", json={"name": "TEST_x", "rating": 5})
        assert r.status_code == 422

    def test_create_review_missing_rating(self, client):
        r = client.post(f"{API}/reviews", json={"name": "TEST_x", "text": "Great instructor truly."})
        assert r.status_code == 422

    def test_create_review_invalid_rating_zero(self, client):
        r = client.post(
            f"{API}/reviews",
            json={"name": "TEST_x", "rating": 0, "text": "Great instructor truly."},
        )
        assert r.status_code == 422

    def test_create_review_invalid_rating_six(self, client):
        r = client.post(
            f"{API}/reviews",
            json={"name": "TEST_x", "rating": 6, "text": "Great instructor truly."},
        )
        assert r.status_code == 422

    def test_get_public_reviews_only_approved(self, client, created_review_id):
        r = client.get(f"{API}/reviews")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        for it in items:
            assert "_id" not in it
            assert it.get("approved") is True, "Public list should only contain approved reviews"
        # The newly created (unapproved) review must NOT appear
        assert not any(it["id"] == created_review_id for it in items)


# ===== Admin auth =====
class TestAdminAuth:
    def test_verify_no_header(self, client):
        r = client.post(f"{API}/admin/verify", json={})
        assert r.status_code == 401

    def test_verify_wrong_token(self, client):
        r = client.post(f"{API}/admin/verify", json={}, headers={"X-Admin-Token": "wrong"})
        assert r.status_code == 401

    def test_verify_correct_token(self, client, admin_headers):
        r = client.post(f"{API}/admin/verify", json={}, headers=admin_headers)
        assert r.status_code == 200
        assert r.json() == {"ok": True}

    def test_admin_lessons_requires_token(self, client):
        r = client.get(f"{API}/admin/lessons")
        assert r.status_code == 401

    def test_admin_contact_requires_token(self, client):
        r = client.get(f"{API}/admin/contact")
        assert r.status_code == 401

    def test_admin_reviews_requires_token(self, client):
        r = client.get(f"{API}/admin/reviews")
        assert r.status_code == 401

    def test_admin_lessons_with_token(self, client, admin_headers):
        r = client.get(f"{API}/admin/lessons", headers=admin_headers)
        assert r.status_code == 200
        assert isinstance(r.json(), list)
        for item in r.json():
            assert "_id" not in item

    def test_admin_contact_with_token(self, client, admin_headers):
        r = client.get(f"{API}/admin/contact", headers=admin_headers)
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_admin_reviews_with_token(self, client, admin_headers):
        r = client.get(f"{API}/admin/reviews", headers=admin_headers)
        assert r.status_code == 200
        assert isinstance(r.json(), list)


# ===== Admin moderation flows =====
class TestAdminModeration:
    @pytest.fixture
    def review_id(self, client):
        payload = {
            "name": "TEST_Mod_Flow",
            "rating": 4,
            "text": "Great driving instructor, would recommend!",
        }
        r = client.post(f"{API}/reviews", json=payload)
        assert r.status_code == 201
        return r.json()["id"]

    def test_approve_then_visible_publicly(self, client, admin_headers, review_id):
        r = client.post(f"{API}/admin/reviews/{review_id}/approve", headers=admin_headers)
        assert r.status_code == 200
        d = r.json()
        assert d["approved"] is True
        assert d["id"] == review_id
        assert "_id" not in d

        # Verify visible publicly
        pub = client.get(f"{API}/reviews")
        assert pub.status_code == 200
        assert any(it["id"] == review_id for it in pub.json())

    def test_unapprove_removes_from_public(self, client, admin_headers, review_id):
        # approve first
        client.post(f"{API}/admin/reviews/{review_id}/approve", headers=admin_headers)
        # then unapprove
        r = client.post(f"{API}/admin/reviews/{review_id}/unapprove", headers=admin_headers)
        assert r.status_code == 200
        assert r.json()["approved"] is False
        pub = client.get(f"{API}/reviews")
        assert not any(it["id"] == review_id for it in pub.json())

    def test_delete_review(self, client, admin_headers, review_id):
        r = client.delete(f"{API}/admin/reviews/{review_id}", headers=admin_headers)
        assert r.status_code == 204
        # Verify removed from admin list
        adm = client.get(f"{API}/admin/reviews", headers=admin_headers)
        assert adm.status_code == 200
        assert not any(it["id"] == review_id for it in adm.json())

    def test_approve_nonexistent_returns_404(self, client, admin_headers):
        r = client.post(f"{API}/admin/reviews/nonexistent-id-xyz/approve", headers=admin_headers)
        assert r.status_code == 404

    def test_approve_requires_token(self, client, review_id):
        r = client.post(f"{API}/admin/reviews/{review_id}/approve")
        assert r.status_code == 401
