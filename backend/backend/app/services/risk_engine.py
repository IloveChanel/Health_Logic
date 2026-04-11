class RiskEngine:
    def evaluate(self, ingredients, conditions):
        results = []
        for ing in ingredients:
            results.append({
                "ingredient": ing,
                "risk_level": "safe",
                "mechanism": "No known risk",
                "confidence": 90
            })
        return results
