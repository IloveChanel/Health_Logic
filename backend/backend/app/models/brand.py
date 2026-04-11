from sqlalchemy import Column, String, Float
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
import uuid

class Brand(Base):
    __tablename__ = "brands"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True)
    average_risk_score = Column(Float, default=0)
