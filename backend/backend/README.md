# Ingredient Checker Backend

## Setup

1. Create and activate a virtual environment:
   ```
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```
2. Install dependencies:
   ```
   pip install -r requirements.txt
   pip install -r requirements-dev.txt
   ```
3. Copy `.env.example` to `.env` and update as needed.
4. Run the server:
   ```
   uvicorn app.main:app --reload
   ```
5. Run tests:
   ```
   $env:PYTHONPATH="."  # On Windows PowerShell
   pytest --maxfail=1 --disable-warnings -q
   ```

## API Docs
Visit [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) for interactive API documentation.

New endpoints (added):

- `GET /ingredient/{name}` — lookup ingredient details; if missing, uses AI fallback and saves result.
- `POST /product/score` — accepts `{ product_name, ingredients: [..] }` and returns a health `score` with a `breakdown`.
- `POST /user/profile` — create/update user profile (conditions, avoid/preferred ingredients).
- `POST /scan-image` — (existing) OCR endpoint that extracts ingredient text from an uploaded image.

AI fallback: the current `ai_lookup_ingredient` is a stub; replace with a real AI/LLM provider (OpenAI, etc.) and add credentials via environment variables before production use.
