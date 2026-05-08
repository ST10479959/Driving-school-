"""Backend API tests for MVELO Trading Enterprise."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://mvelo-soweto.preview.emergentagent.com").rstrip("/")
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
        assert data["name"] == "MVELO TRADING ENTERPRISE"
        assert data["rating"] == 4.6
        assert data["reviews_count"] == 18
        assert "Mohlomi Street" in data["address"]
        assert "Naledi" in data["address"]
        assert "Soweto" in data["address"]
        assert data["phone"] == "065 805 1448"
        assert isinstance(data["services"], list)
        assert len(data["services"]) == 17
        assert "_id" not in data


# ===== Quotes =====
class TestQuotes:
    def test_create_quote_valid(self, client):
        payload = {
            "name": "TEST_John Doe",
            "phone": "0612345678",
            "service": "Tile installation",
            "location": "Soweto",
            "message": "Need urgent tile installation",
            "email": "test_john@example.com",
        }
        r = client.post(f"{API}/quotes", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert "id" in data
        assert isinstance(data["id"], str) and len(data["id"]) > 0
        assert data["name"] == payload["name"]
        assert data["phone"] == payload["phone"]
        assert data["service"] == payload["service"]
        assert data["status"] == "new"
        assert "_id" not in data
        # persistence verification via GET
        list_r = client.get(f"{API}/quotes")
        assert list_r.status_code == 200
        items = list_r.json()
        assert any(q["id"] == data["id"] for q in items)

    def test_create_quote_minimal_required(self, client):
        payload = {
            "name": "TEST_Mini",
            "phone": "0658051448",
            "service": "Painting services",
        }
        r = client.post(f"{API}/quotes", json=payload)
        assert r.status_code == 201
        d = r.json()
        assert d["name"] == "TEST_Mini"
        assert d["email"] is None
        assert d["location"] is None
        assert "_id" not in d

    def test_create_quote_missing_required(self, client):
        # missing service
        r = client.post(f"{API}/quotes", json={"name": "X", "phone": "0612345678"})
        assert r.status_code == 422

    def test_create_quote_missing_name(self, client):
        r = client.post(f"{API}/quotes", json={"phone": "0612345678", "service": "Painting services"})
        assert r.status_code == 422

    def test_create_quote_invalid_email(self, client):
        payload = {
            "name": "TEST_BadEmail",
            "phone": "0612345678",
            "service": "Painting services",
            "email": "not-an-email",
        }
        r = client.post(f"{API}/quotes", json=payload)
        assert r.status_code == 422

    def test_list_quotes_no_id_leak(self, client):
        r = client.get(f"{API}/quotes")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        for item in data:
            assert "_id" not in item
            assert "id" in item
            assert "name" in item
            assert "phone" in item
            assert "service" in item


# ===== Contact =====
class TestContact:
    def test_create_contact_valid(self, client):
        payload = {
            "name": "TEST_Contact",
            "message": "Hello, I'd like more info.",
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
        # persistence
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
