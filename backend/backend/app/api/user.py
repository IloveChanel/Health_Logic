from fastapi import APIRouter

router = APIRouter()

@router.post("/profile")
def profile(payload: dict):
    return {"status": "saved"}
