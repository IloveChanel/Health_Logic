from app.models.source import Source

def test_source_model():
    s = Source(name="FDA", url="https://fda.gov", evidence_strength="strong")
    assert s.name == "FDA"
    assert s.evidence_strength in ("strong", "moderate", "limited", "emerging")
