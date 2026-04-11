from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_profile():
    response = client.post("/user/profile", json={"username": "testuser"})
    assert response.status_code == 200
    assert response.json().get("status") == "saved"
