from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
import uuid

class IngredientConditionRisk(Base):
    __tablename__ = "ingredient_condition_risks"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ingredient_id = Column(UUID, ForeignKey("ingredients.id"))
    condition_id = Column(UUID, ForeignKey("conditions.id"))
    risk_level = Column(String)
    explanation = Column(String)
    confidence = Column(Integer)
