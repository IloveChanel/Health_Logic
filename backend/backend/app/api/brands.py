from fastapi import APIRouter

router = APIRouter()

@router.get("/safe")
def safe_brands():
    return {"brands": []}
