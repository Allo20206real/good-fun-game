# Bounce Duel (Expo app)

The phone version of Bounce Duel. It runs the game from `../index.html` inside a WebView and adds things a web page can't do on its own:

- **Vibration**: a light buzz when you get hit, a stronger one when you use your power, ticks on the 3-2-1 countdown, and a win/lose buzz at the end.
- **Screen stays on** during a match.
- **Android back button** steps back through the game (match → menu → Play tab) instead of closing the app.
- Links like the privacy policy open in the phone's browser.

## Open it on your phone with Expo Go

1. Install **Expo Go** on your phone (App Store / Google Play).
2. On your computer (Node 20 or newer):
   ```bash
   git clone https://github.com/allo20206real/good-fun-game.git
   cd good-fun-game
   git checkout claude/awesome-volta-53053w
   cd mobile
   npm install
   npm start
   ```
3. A QR code appears in the terminal. Scan it with the **Camera** app on iPhone, or from inside **Expo Go** on Android.

Your phone and computer need to be on the same Wi-Fi. If the QR code doesn't connect (school or work networks often block it), stop it with Ctrl+C and run `npx expo start --tunnel` instead.

## Changing the game

Edit `../index.html`. `npm start` copies it into `gameHtml.ts` automatically (or run `npm run sync-game`).

## Releasing to the App Store

See [`../APP_STORE.md`](../APP_STORE.md).
