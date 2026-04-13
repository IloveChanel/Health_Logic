Maestro smoke tests

Quick start (Maestro CLI required)

1. Install Maestro CLI (macOS / Linux / WSL / PowerShell):

```bash
curl -fsSL "https://get.maestro.mobile.dev" | bash
```

2. Start an Android emulator and ensure it's visible to ADB.

3. From this folder run the test:

```bash
# from ingredient_checker_app/mobile
maestro test e2e/maestro/smoke-test.yaml
```

Notes:
- The test uses the Android `appId` defined in `app.json` (`com.michellemink.healthlogicmobile`).
- Maestro will open the app, tap the Home buttons, and assert screen titles.
- If some buttons use non-standard UI elements (no visible label), the test may need `accessibilityLabel`/`testID` added to components. Maestro can also tap coordinates if necessary.

Next steps:
- I can convert this into a full suite that covers every screen and edge case.
- Or I can add Detox e2e tests if you prefer a code-based approach.
