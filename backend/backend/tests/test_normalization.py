from app.services.normalization import IngredientNormalizer

def test_normalizer():
    norm = IngredientNormalizer()
    assert norm.normalize("  Sodium Bicarbonate ") == "sodium bicarbonate"
    assert norm.normalize("Milk Solids") == "milk solids"
