Canonical app: HealthLogic

This repository contains multiple app variants and sample projects. To avoid confusion:

- Primary mobile app used for development and E2E: ingredient_checker_app/mobile
  - Config: ingredient_checker_app/mobile/app.json
  - Display name: "HealthLogic"
  - Android package id: com.healthlogic.app

- Other app folders (IngredientCheckerApp, MyIngredientChecker) are legacy/test projects. Do not edit them unless you know their purpose.

When building or running tests, use the `ingredient_checker_app/mobile` folder as your working directory. Example:

```powershell
Set-Location "d:\Ingredient Checker\ingredient_checker_app\mobile"
npx expo start
# press 'a' to open on Android emulator
```

If you'd like, I can also update the other `app.json` files to match this naming, or commit these changes to git for you.
