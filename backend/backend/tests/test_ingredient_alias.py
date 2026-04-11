from app.models.ingredient_alias import IngredientAlias

def test_ingredient_alias_model():
    alias = IngredientAlias(ingredient_id="uuid", alias="baking soda", language="en")
    assert alias.alias == "baking soda"
    assert alias.language == "en"
