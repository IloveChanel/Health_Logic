from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
import uuid

class UserProfile(Base):
    __tablename__ = "user_profiles"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True)
    preferred_language = Column(String, default="en")
