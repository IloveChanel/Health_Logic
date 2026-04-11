from sqlalchemy import Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
import uuid

class ProductIngredient(Base):
    __tablename__ = "product_ingredients"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(UUID, ForeignKey("products.id"))
    ingredient_id = Column(UUID, ForeignKey("ingredients.id"))
