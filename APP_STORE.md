# Putting Bounce Duel on the App Store

The app in `mobile/` is ready for the App Store: it has an app icon, a bundle ID, build settings for Expo's cloud build service (EAS), in-app account deletion, a privacy policy and a name filter. Submitting has to be done from **your** accounts, because Apple ties every app to its developer.

## What you need first

1. **Firebase connected**: done (project `bounce-duel`). Apple's reviewers will create an account and log in.
2. **The website live** (GitHub Pages, also in FIREBASE_SETUP.md), so the privacy policy is online at `https://bounceduel.se/privacy.html`.
3. **An Apple Developer account**: enroll at <https://developer.apple.com/programs/> ($99 per year). Approval can take a day or two.
4. **A free Expo account**: sign up at <https://expo.dev/signup>.

You don't need a Mac. Expo builds the iPhone app in the cloud.

## Build and submit

On any computer with Node 20+:

```bash
git clone https://github.com/allo20206real/good-fun-game.git
cd good-fun-game/mobile
npm install
npx eas-cli@latest login          # your Expo account
npx eas-cli@latest init           # links the project to your Expo account (once)
npm run release:ios               # builds in the cloud and sends it to App Store Connect
```

During the first build, EAS asks to log in to your Apple account. Say **yes** to letting it create the certificates and the app record for you. If it asks for a bundle identifier, use `com.allo20206real.bounceduel` (or change it in `mobile/app.json` first if you'd like a different one; it has to be unique on the App Store).

The build takes about 15–30 minutes. When it finishes, the app shows up in [App Store Connect](https://appstoreconnect.apple.com) under **TestFlight**, where you can install it on your own iPhone to try it before release.

## Fill in the App Store listing

In App Store Connect, open the app and fill in:

| Field | What to enter |
|---|---|
| Name | Bounce Duel |
| Subtitle | Bouncing cube battles |
| Category | Games → Arcade (secondary: Games → Action) |
| Privacy Policy URL | `https://bounceduel.se/privacy.html` |
| Support URL | `https://github.com/allo20206real/good-fun-game/issues` |
| Age rating | Answer "None" to every question → 4+ |
| Price | Free |

**Description** (copy and paste):

> Two cubes bounce around a square room like the old DVD logo, each with a spike flying around it. Every spike hit does 1 damage. First cube to 0 HP loses!
>
> • Play against the CPU on Easy, Normal or Hard, or challenge a friend on the same device
> • Pick your spike: Classic, Twin, Saw, Lance or Comet
> • Pick your power: Dash, Shield, Freeze, Rage, Heal or Blink, and use it at the right moment
> • Earn coins from matches, daily rewards and daily challenges
> • Unlock skins like Neon, Lava, Gold, Galaxy and Rainbow in the shop
> • A new event every week with special rules, like Giant Spikes and Sudden Death
> • Make a group with your friends and climb the leaderboard
>
> Log in with your email on any device to keep your coins, skins and score.

**Keywords:** `bounce,cube,duel,spike,arcade,2 player,battle,dvd,party,friends`

**App Privacy** (the "nutrition label"): choose **Data Collected**, then:
- **Contact Info → Email Address**: used for App Functionality, linked to the user, not used for tracking.
- **Identifiers → User ID**: App Functionality, linked, not used for tracking.
- **User Content → Other User Content** (display names and group names): App Functionality, linked, not used for tracking.
- **Usage Data → Product Interaction** (game stats like wins): App Functionality, linked, not used for tracking.

**Screenshots:** Apple needs at least one set for 6.7" or 6.9" iPhones. Ready-made 1290 × 2796 screenshots are in [`store/`](store/) (the `appstore-1290x2796-*.png` files). You can also take your own on an iPhone from the TestFlight build.

**App Review Information:** create a test account in the app (any email and password) and put it in the **Sign-in information** box so the reviewer can log in. In **Notes**, you can write:

> Bounce Duel works without an account (guest mode). Logging in saves coins, skins and score online. Accounts can be deleted from the Profile tab → Delete account.

Then pick the build under **Build**, and press **Add for Review** → **Submit to App Review**. Reviews usually take 1–3 days.

## Later updates

Change the game in `index.html`, then run `npm run release:ios` again from `mobile/`. EAS raises the build number automatically.
