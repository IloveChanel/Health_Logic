from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
import uuid

class Ingredient(Base):
    __tablename__ = "ingredients"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, nullable=False)
