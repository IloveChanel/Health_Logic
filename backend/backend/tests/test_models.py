from app.models.ingredient import Ingredient
from app.models.condition import Condition
from app.models.ingredient_condition_risk import IngredientConditionRisk
from app.models.product import Product
from app.models.product_ingredient import ProductIngredient
from app.models.brand import Brand
from app.models.user_profile import UserProfile

def test_models_instantiation():
    i = Ingredient(name="Salt")
    c = Condition(name="Hypertension")
    r = IngredientConditionRisk(ingredient_id="uuid", condition_id="uuid", risk_level="moderate", explanation="Test", confidence=80)
    p = Product(barcode="1234567890", name="Test Product", brand="Test Brand")
    pi = ProductIngredient(product_id="uuid", ingredient_id="uuid")
    b = Brand(name="Test Brand", average_risk_score=0.5)
    u = UserProfile(username="testuser", preferred_language="en")
    assert i.name == "Salt"
    assert c.name == "Hypertension"
    assert r.risk_level == "moderate"
    assert p.barcode == "1234567890"
    assert pi.product_id == "uuid"
    assert b.name == "Test Brand"
    assert u.username == "testuser"
