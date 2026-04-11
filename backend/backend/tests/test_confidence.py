from app.services.confidence import ConfidenceCalculator

def test_confidence_calculator():
    calc = ConfidenceCalculator()
    assert calc.compute(1, True) == 30
    assert calc.compute(4, False) == 80
    assert calc.compute(5, True) == 90 or calc.compute(5, True) == 100
