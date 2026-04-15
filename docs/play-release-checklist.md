# Play Release Checklist

## Code / Build
- [ ] target SDK = 35
- [ ] compile SDK = 35
- [ ] release no longer uses debug signing
- [ ] android/play-signing.properties filled locally
- [ ] `.\tools\release\build-release-aab.ps1` succeeds
- [ ] AAB generated successfully

## Policy / Console
- [ ] privacy policy URL added to Play Console
- [ ] Data safety form completed
- [ ] app content declarations completed
- [ ] sensitive permissions reviewed and justified
- [ ] screenshots prepared
- [ ] store listing text prepared

## Runtime
- [ ] navigation smoke true
- [ ] profile save smoke true
- [ ] scan smoke true
- [ ] 5-profile runtime persistence verified
- [ ] unsubscribe/subscribe scan flow verified
