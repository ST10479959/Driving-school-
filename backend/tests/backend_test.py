"""Backend API tests for Ray Driving School."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ===== Root =====
class TestRoot:
    def test_root_ok(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "message" in data


# ===== Business =====
class TestBusiness:
    def test_get_business(self, client):
        r = client.get(f"{API}/business")
        assert r.status_code == 200
        data = r.json()
        assert data["name"] == "Ray Driving School"
        assert data["phone"] == "073 403 7108"
        assert "1 Goldman Street" in data["address"]
        assert "Florida" in data["address"]
        assert "Roodepoort" in data["address"]
        assert isinstance(data["services"], list)
        assert len(data["services"]) == 9, f"Expected 9 services, got {len(data['services'])}"
        assert isinstance(data["hours"], list)
        assert len(data["hours"]) == 3
        assert "_id" not in data


# ===== Lessons =====
class TestLessons:
    def test_create_lesson_full(self, client):
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
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert data["name"] == payload["name"]
        assert data["phone"] == payload["phone"]
        assert data["licence_type"] == payload["licence_type"]
        assert data["preferred_days"] == payload["preferred_days"]
        assert data["experience_level"] == payload["experience_level"]
        assert data["status"] == "new"
        assert "_id" not in data

        # persistence check
        list_r = client.get(f"{API}/lessons")
        assert list_r.status_code == 200
        items = list_r.json()
        assert any(l["id"] == data["id"] for l in items)

    def test_create_lesson_minimal(self, client):
        payload = {
            "name": "TEST_Min",
            "phone": "0612345678",
            "licence_type": "Defensive Driving",
        }
        r = client.post(f"{API}/lessons", json=payload)
        assert r.status_code == 201, r.text
        d = r.json()
        assert d["name"] == "TEST_Min"
        assert d["email"] is None
        assert d["preferred_days"] is None
        assert d["experience_level"] is None
        assert "_id" not in d

    def test_create_lesson_missing_name(self, client):
        r = client.post(f"{API}/lessons", json={"phone": "0612345678", "licence_type": "X"})
        assert r.status_code == 422

    def test_create_lesson_missing_phone(self, client):
        r = client.post(f"{API}/lessons", json={"name": "TEST_X", "licence_type": "X"})
        assert r.status_code == 422

    def test_create_lesson_missing_licence_type(self, client):
        r = client.post(f"{API}/lessons", json={"name": "TEST_X", "phone": "0612345678"})
        assert r.status_code == 422

    def test_create_lesson_invalid_email(self, client):
        r = client.post(
            f"{API}/lessons",
            json={"name": "TEST_X", "phone": "0612345678", "licence_type": "X", "email": "not-email"},
        )
        assert r.status_code == 422

    def test_list_lessons_no_id_leak(self, client):
        r = client.get(f"{API}/lessons")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        for item in data:
            assert "_id" not in item
            assert "id" in item
            assert "name" in item
            assert "phone" in item
            assert "licence_type" in item


# ===== Contact =====
class TestContact:
    def test_create_contact_valid(self, client):
        payload = {
            "name": "TEST_Contact",
            "message": "Hello, I'd like info.",
            "phone": "0612345678",
            "email": "test_contact@example.com",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert "id" in data
        assert data["name"] == "TEST_Contact"
        assert data["message"] == payload["message"]
        assert "_id" not in data

        list_r = client.get(f"{API}/contact")
        assert list_r.status_code == 200
        assert any(m["id"] == data["id"] for m in list_r.json())

    def test_create_contact_minimal(self, client):
        r = client.post(f"{API}/contact", json={"name": "TEST_C2", "message": "hi"})
        assert r.status_code == 201
        d = r.json()
        assert d["phone"] is None
        assert d["email"] is None

    def test_create_contact_missing_message(self, client):
        r = client.post(f"{API}/contact", json={"name": "TEST_C3"})
        assert r.status_code == 422

    def test_create_contact_missing_name(self, client):
        r = client.post(f"{API}/contact", json={"message": "hi"})
        assert r.status_code == 422

    def test_list_contact_no_id_leak(self, client):
        r = client.get(f"{API}/contact")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        for m in data:
            assert "_id" not in m
            assert "id" in m
            assert "name" in m
            assert "message" in m


# ===== Status legacy =====
class TestStatus:
    def test_create_status(self, client):
        r = client.post(f"{API}/status", json={"client_name": "TEST_status_client"})
        assert r.status_code == 200
        data = r.json()
        assert data["client_name"] == "TEST_status_client"
        assert "id" in data
        assert "_id" not in data

    def test_get_status_no_id_leak(self, client):
        r = client.get(f"{API}/status")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        for s in data:
            assert "_id" not in s
            assert "id" in s
            assert "client_name" in s
