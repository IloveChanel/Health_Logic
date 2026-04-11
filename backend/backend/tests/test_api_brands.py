from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_safe_brands():
    response = client.get("/brands/safe")
    assert response.status_code == 200
    assert "brands" in response.json()
