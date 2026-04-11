from fastapi import APIRouter
from app.services.risk_engine import RiskEngine

router = APIRouter()

@router.post("/barcode")
def scan_barcode(payload: dict):
    ingredients = payload.get("ingredients", [])
    engine = RiskEngine()
    return engine.evaluate(ingredients, [])
