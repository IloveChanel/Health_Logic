import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.database import Base
from app.services.ingestion import IngestionService

@pytest.fixture(scope="function")
def db_session():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    yield session
    session.close()


def test_ingest_scan_new_product(db_session):
    service = IngestionService(db_session)
    barcode = "0000000000000"
    ingredients = ["Water", "Unknownium"]
    product = service.ingest_scan(barcode, ingredients, region="US")
    assert product.barcode == barcode
