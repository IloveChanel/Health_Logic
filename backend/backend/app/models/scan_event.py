from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
import uuid
from datetime import datetime

class ScanEvent(Base):
    __tablename__ = "scan_events"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    barcode = Column(String, nullable=False)
    region = Column(String, default="unknown")
    timestamp = Column(DateTime, default=datetime.utcnow)
    unknown_ingredients = Column(String)  # comma-separated list
