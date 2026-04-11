import pytest
from app.services.risk_engine import RiskEngine

def test_risk_engine_safe():
    engine = RiskEngine()
    ingredients = ["water", "salt"]
    result = engine.evaluate(ingredients, [])
    assert isinstance(result, list)
    assert all(r["risk_level"] == "safe" for r in result)
