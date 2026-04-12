
from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime
import os
from dotenv import load_dotenv
from google.cloud import vision
import base64
import json
import stripe

# Load environment variables
load_dotenv()

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class IngredientScan(Base):
    __tablename__ = "ingredient_scans"
    
    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String, index=True)
    ingredients_text = Column(Text)
    analysis_result = Column(Text)
    safety_status = Column(String)  # "safe", "caution", "avoid"
    created_at = Column(DateTime, default=datetime.utcnow)


class Ingredient(Base):
    __tablename__ = "ingredients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(Text)
    health_benefits = Column(Text)
    risks = Column(Text)
    tags = Column(Text)  # comma-separated tags
    source = Column(String)  # 'manual' or 'ai'
    created_at = Column(DateTime, default=datetime.utcnow)


class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, unique=True, index=True)
    conditions = Column(Text)  # JSON array
    avoid_ingredients = Column(Text)  # JSON array
    preferred_ingredients = Column(Text)  # JSON array
    created_at = Column(DateTime, default=datetime.utcnow)


class SearchLog(Base):
    __tablename__ = "search_logs"

    id = Column(Integer, primary_key=True, index=True)
    query = Column(String, index=True)
    user_id = Column(String, nullable=True)
    result_source = Column(String)  # 'db' or 'ai'
    created_at = Column(DateTime, default=datetime.utcnow)

# Create tables
Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI(title="Ingredient Checker API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Stripe setup (placeholder; set STRIPE_API_KEY, STRIPE_PRICE_ID, STRIPE_WEBHOOK_SECRET in env)
STRIPE_API_KEY = os.getenv("STRIPE_API_KEY")
STRIPE_PRICE_ID = os.getenv("STRIPE_PRICE_ID")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")
if STRIPE_API_KEY:
    stripe.api_key = STRIPE_API_KEY

@app.get("/")
async def root():
    return {"message": "Ingredient Checker API is running!", "status": "healthy"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "environment": os.getenv("ENVIRONMENT")}

@app.post("/scan-image")
async def scan_image(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Scan ingredient image using Google Vision API"""
    try:
        # Read image file
        image_content = await file.read()
        
        # Initialize Google Vision client
        client = vision.ImageAnnotatorClient()
        image = vision.Image(content=image_content)
        
        # Detect text in image
        response = client.text_detection(image=image)
        texts = response.text_annotations
        
        if texts:
            ingredients_text = texts[0].description
            
            # Simple analysis (you can enhance this)
            analysis = analyze_ingredients(ingredients_text)
            
            # Save to database
            scan = IngredientScan(
                product_name="Scanned Product",
                ingredients_text=ingredients_text,
                analysis_result=analysis["summary"],
                safety_status=analysis["status"]
            )
            db.add(scan)
            db.commit()
            
            return {
                "success": True,
                "ingredients": ingredients_text,
                "analysis": analysis,
                "scan_id": scan.id
            }
        else:
            return {"success": False, "error": "No text found in image"}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/recent-scans")
async def get_recent_scans(db: Session = Depends(get_db)):
    """Get recent ingredient scans"""
    scans = db.query(IngredientScan).order_by(IngredientScan.created_at.desc()).limit(10).all()
    return [
        {
            "id": scan.id,
            "product_name": scan.product_name,
            "status": scan.safety_status,
            "created_at": scan.created_at
        }
        for scan in scans
    ]

def analyze_ingredients(ingredients_text):
    """Simple ingredient analysis - enhance this with your logic"""
    text_lower = ingredients_text.lower()
    
    # Simple keyword-based analysis
    warning_ingredients = ["carrageenan", "artificial flavor", "high fructose corn syrup", "msg"]
    dangerous_ingredients = ["trans fat", "partially hydrogenated", "sodium benzoate"]
    
    found_warnings = [ing for ing in warning_ingredients if ing in text_lower]
    found_dangerous = [ing for ing in dangerous_ingredients if ing in text_lower]
    
    if found_dangerous:
        status = "avoid"
        summary = f"Contains concerning ingredients: {', '.join(found_dangerous)}"
    elif found_warnings:
        status = "caution"
        summary = f"Contains ingredients to monitor: {', '.join(found_warnings)}"
    else:
        status = "safe"
        summary = "No concerning ingredients detected"
    
    return {
        "status": status,
        "summary": summary,
        "warnings": found_warnings,
        "dangerous": found_dangerous
    }


def ai_lookup_ingredient(name: str):
    """Fallback AI lookup for unknown ingredients.

    NOTE: This is a placeholder. Replace with a real AI call (OpenAI, etc.)
    and proper authentication in production.
    """
    # Simple placeholder response — in production call an LLM or knowledge API
    description = f"No local data for '{name}'. AI fallback required to provide description, benefits, and risks."
    return {
        "name": name,
        "description": description,
        "health_benefits": [],
        "risks": [],
        "tags": [],
        "source": "ai"
    }


@app.get("/ingredient/{name}")
async def get_ingredient(name: str, db: Session = Depends(get_db), user_id: str = None):
    """Return ingredient information; if missing, use AI fallback and save."""
    name_norm = name.strip().lower()
    ing = db.query(Ingredient).filter(Ingredient.name == name_norm).first()
    if ing:
        # log
        log = SearchLog(query=name_norm, user_id=user_id, result_source="db")
        db.add(log)
        db.commit()
        return {
            "found": True,
            "source": "db",
            "ingredient": {
                "name": ing.name,
                "description": ing.description,
                "health_benefits": json.loads(ing.health_benefits) if ing.health_benefits else [],
                "risks": json.loads(ing.risks) if ing.risks else [],
                "tags": ing.tags.split(",") if ing.tags else [],
            }
        }

    # Not found in DB — call AI fallback
    ai_info = ai_lookup_ingredient(name_norm)

    # Save AI result to DB for future
    ing_new = Ingredient(
        name=name_norm,
        description=ai_info.get("description"),
        health_benefits=json.dumps(ai_info.get("health_benefits", [])),
        risks=json.dumps(ai_info.get("risks", [])),
        tags=",",
        source=ai_info.get("source", "ai")
    )
    db.add(ing_new)
    db.commit()

    log = SearchLog(query=name_norm, user_id=user_id, result_source="ai")
    db.add(log)
    db.commit()

    return {"found": False, "source": "ai", "ingredient": ai_info}


@app.post("/product/score")
async def score_product(product: dict, db: Session = Depends(get_db)):
    """Calculate a health score for a product.

    Request body example:
    {
      "product_name": "Example Snack",
      "ingredients": ["sugar", "salt", "carrageenan"]
    }
    """
    try:
        name = product.get("product_name", "Unknown Product")
        ingredients = product.get("ingredients", [])

        # Base score starts at 100
        score = 100
        breakdown = []

        for ing_name in ingredients:
            ing_norm = ing_name.strip().lower()
            ing = db.query(Ingredient).filter(Ingredient.name == ing_norm).first()
            if ing:
                # Simple heuristics based on stored risks/benefits
                risks = json.loads(ing.risks) if ing.risks else []
                benefits = json.loads(ing.health_benefits) if ing.health_benefits else []
                if risks:
                    score -= 10 * len(risks)
                    breakdown.append({"ingredient": ing_name, "impact": -10 * len(risks), "reason": "risks found"})
                elif benefits:
                    score += 2 * len(benefits)
                    breakdown.append({"ingredient": ing_name, "impact": 2 * len(benefits), "reason": "benefits found"})
                else:
                    breakdown.append({"ingredient": ing_name, "impact": 0, "reason": "neutral"})
            else:
                # Unknown ingredient: call AI fallback synchronously and save
                ai_info = ai_lookup_ingredient(ing_norm)
                ing_new = Ingredient(
                    name=ing_norm,
                    description=ai_info.get("description"),
                    health_benefits=json.dumps(ai_info.get("health_benefits", [])),
                    risks=json.dumps(ai_info.get("risks", [])),
                    tags=",",
                    source=ai_info.get("source", "ai")
                )
                db.add(ing_new)
                db.commit()
                breakdown.append({"ingredient": ing_name, "impact": 0, "reason": "added via ai fallback"})

        # Clamp score
        score = max(0, min(100, score))

        # Save a scan record
        scan = IngredientScan(product_name=name, ingredients_text=", ".join(ingredients), analysis_result=json.dumps(breakdown), safety_status=("safe" if score>80 else "caution" if score>40 else "avoid"))
        db.add(scan)
        db.commit()

        return {"product": name, "score": score, "breakdown": breakdown, "scan_id": scan.id}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/subscribe")
async def create_subscription(body: dict):
    """Create a Stripe subscription for a given customer email.

    Request body: { "email": "user@example.com" }
    """
    if not STRIPE_API_KEY or not STRIPE_PRICE_ID:
        raise HTTPException(status_code=500, detail="Payment gateway not configured")

    email = body.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="email is required")

    try:
        # Create customer
        customer = stripe.Customer.create(email=email)

        # Create subscription
        subscription = stripe.Subscription.create(
            customer=customer.id,
            items=[{"price": STRIPE_PRICE_ID}],
            expand=["latest_invoice.payment_intent"]
        )

        return {"subscriptionId": subscription.id, "client_secret": subscription.latest_invoice.payment_intent.client_secret}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/stripe-webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    event = None

    if STRIPE_WEBHOOK_SECRET:
        try:
            event = stripe.Webhook.construct_event(payload=payload, sig_header=sig_header, secret=STRIPE_WEBHOOK_SECRET)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Webhook verification failed: {str(e)}")
    else:
        try:
            event = json.loads(payload)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Invalid payload: {str(e)}")

    # Handle the event types you care about
    event_type = event.get("type") if isinstance(event, dict) else getattr(event, "type", None)
    if event_type == "invoice.payment_succeeded":
        # TODO: mark subscription active for user
        pass

    return {"received": True}


@app.post("/user/profile")
async def upsert_user_profile(profile: dict, db: Session = Depends(get_db)):
    """Create or update a user profile containing conditions and ingredient preferences.

    Example body:
    {
      "user_id": "user123",
      "conditions": ["diabetes", "hypertension"],
      "avoid_ingredients": ["sugar", "salt"],
      "preferred_ingredients": ["oats", "almonds"]
    }
    """
    user_id = profile.get("user_id")
    if not user_id:
        raise HTTPException(status_code=400, detail="user_id is required")

    existing = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
    data = {
        "conditions": json.dumps(profile.get("conditions", [])),
        "avoid_ingredients": json.dumps(profile.get("avoid_ingredients", [])),
        "preferred_ingredients": json.dumps(profile.get("preferred_ingredients", []))
    }

    if existing:
        existing.conditions = data["conditions"]
        existing.avoid_ingredients = data["avoid_ingredients"]
        existing.preferred_ingredients = data["preferred_ingredients"]
        db.add(existing)
        db.commit()
        return {"updated": True, "user_id": user_id}

    new_profile = UserProfile(user_id=user_id, **data)
    db.add(new_profile)
    db.commit()
    return {"created": True, "user_id": user_id}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)