from fastapi import FastAPI
from app.api import scan, brands, user

app = FastAPI(title="Ingredient Checker API")

app.include_router(scan.router, prefix="/scan")
app.include_router(brands.router, prefix="/brands")
app.include_router(user.router, prefix="/user")
