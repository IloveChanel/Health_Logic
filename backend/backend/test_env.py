import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

print("🔍 Testing environment configuration...")
print(f"✅ DATABASE_URL: {'✓' if os.getenv('DATABASE_URL') else '✗'}")
print(f"✅ SECRET_KEY: {'✓' if os.getenv('SECRET_KEY') else '✗'}")
print(f"✅ GOOGLE_VISION_API_KEY: {'✓' if os.getenv('GOOGLE_VISION_API_KEY') else '✗'}")
print(f"✅ ENVIRONMENT: {os.getenv('ENVIRONMENT', 'Not set')}")

# Test database connection
try:
    import psycopg2
    db_url = os.getenv('DATABASE_URL')
    if db_url:
        # Parse connection string and test
        print("🔗 Testing database connection...")
        # Add your database test here
        print("✅ Database connection: Ready to test")
except ImportError:
    print("⚠️  psycopg2 not installed - install with: pip install psycopg2-binary")