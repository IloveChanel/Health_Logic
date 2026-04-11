# Ingredient Checker Mobile App

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Run tests:
   ```
   npm test
   ```
3. Start the Expo app:
   ```
   npx expo start
   ```

Backend: set `BACKEND_URL` in your environment when running the app (defaults to `http://localhost:8000`).

New screens:
- `Onboarding` — collect local-only conditions
- `Scan` — choose barcode or photo
- `BarcodeScanner` — scan barcode and lookup via OpenFoodFacts
- `CameraCapture` — take a photo of ingredient list and send to backend OCR
- `Results` — shows product health score from backend `/product/score`
 - `Trust` — a modern, trustworthy landing page that explains the app, privacy, and quick CTAs

## Folder Structure
- `components/` - UI components
- `screens/` - App screens
- `theme/` - Colors and typography
- `i18n/` - Translations
- `services/` - API and utility services
- `tests/` - Unit and integration tests
