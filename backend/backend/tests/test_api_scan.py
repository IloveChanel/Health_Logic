from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_scan_barcode():
    response = client.post("/scan/barcode", json={"ingredients": ["water"]})
    assert response.status_code == 200
    assert response.json()[0]["risk_level"] == "safe"
