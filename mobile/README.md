# Bounce Duel (Expo app)

The phone version of Bounce Duel. It runs the game from `../index.html` inside a WebView, so it works in Expo Go.

## Play it on your phone

1. Install **Expo Go** on your phone (App Store / Google Play).
2. On your computer (Node 20+):
   ```bash
   git clone https://github.com/allo20206real/good-fun-game.git
   cd good-fun-game
   git checkout claude/awesome-volta-53053w
   cd mobile
   npm install
   npm start
   ```
3. Scan the QR code in the terminal: with the Camera app on iPhone, or from inside Expo Go on Android.
   Your phone and computer need to be on the same Wi-Fi. If that doesn't work, run `npx expo start --tunnel` instead.

## Changing the game

Edit `../index.html`. `npm start` copies it into `gameHtml.ts` automatically (or run `npm run sync-game`).
