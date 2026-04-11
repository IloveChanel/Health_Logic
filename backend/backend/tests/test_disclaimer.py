from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_disclaimer():
    response = client.get("/disclaimer")
    assert response.status_code == 200
    assert "educational information" in response.json().get("text", "")
