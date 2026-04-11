from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
import uuid

class ProductStatus(Base):
    __tablename__ = "product_statuses"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product_id = Column(UUID, ForeignKey("products.id"))
    status = Column(String, default="unverified")  # verified, community_verified, external_only, unverified
