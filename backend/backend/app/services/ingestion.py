from app.models.product import Product
from app.models.scan_event import ScanEvent
from app.models.product_status import ProductStatus
from app.services.normalization import IngredientNormalizer
from sqlalchemy.orm import Session
from datetime import datetime

class IngestionService:
    def __init__(self, db: Session):
        self.db = db
        self.normalizer = IngredientNormalizer()

    def ingest_scan(self, barcode: str, ingredients: list, region: str = "unknown"):
        # Step 1: Check Local DB
        product = self.db.query(Product).filter_by(barcode=barcode).first()
        if product:
            return product
        # Step 2: Normalize & Validate
        normalized = [self.normalizer.normalize(i) for i in ingredients]
        unknowns = [i for i in normalized if not self._is_known_ingredient(i)]
        # Step 3: Store as Unverified
        scan_event = ScanEvent(barcode=barcode, region=region, timestamp=datetime.utcnow(), unknown_ingredients=",".join(unknowns))
        self.db.add(scan_event)
        self.db.commit()
        # Add product as unverified
        new_product = Product(barcode=barcode, name="", brand="")
        self.db.add(new_product)
        self.db.commit()
        status = ProductStatus(product_id=new_product.id, status="unverified")
        self.db.add(status)
        self.db.commit()
        return new_product

    def _is_known_ingredient(self, name: str) -> bool:
        # Implement lookup in canonical ingredient table
        from app.models.ingredient import Ingredient
        return self.db.query(Ingredient).filter_by(name=name).first() is not None
