# Putting Bounce Duel on Google Play

Everything the app needs is ready: icon, app ID (`com.allo20206real.bounceduel`), Android build settings, account deletion, privacy policy, and the store images in [`store/`](store/). Publishing has to be done from **your** Google Play developer account.

**What it costs and how long it takes:** a one-time **$25** fee. A new personal account also has to run a **closed test with at least 12 testers for 14 days** before Google lets the app go public, so plan on about 2–3 weeks from start to the app being in the store.

---

## Step 1: Make a Google Play developer account

1. Go to <https://play.google.com/console/signup> and sign in with a Google account.
2. Choose **Yourself** (a personal account), pay the $25 and fill in your details.
3. Google verifies your identity (a photo ID) and sometimes your phone number. This can take a few days.

You must be 18 or older to own the account. If you're younger, a parent or guardian has to create it.

## Step 2: Turn on the website

Google needs your privacy policy online, plus a web page where people can delete their account without the app. Both come from the website:

1. On GitHub, open the repo's **Settings → Pages**, and set **Source** to **GitHub Actions**.
2. Merge the `claude/awesome-volta-53053w` branch into `main`.

After a minute these links work:
- Game: `https://bounceduel.se/`
- Privacy policy: `https://bounceduel.se/privacy.html`
- Account deletion: `https://bounceduel.se/privacy.html#delete`

## Step 3: Build the Android app

On any computer with Node 20 or newer (no Android Studio needed; Expo builds it in the cloud):

```bash
git clone https://github.com/allo20206real/good-fun-game.git
cd good-fun-game && git checkout claude/awesome-volta-53053w
cd mobile
npm install
npx eas-cli@latest login      # make a free account at expo.dev first
npx eas-cli@latest init       # once, links the project to your Expo account
npm run build:android
```

When it asks to generate a new Android keystore, say **yes** (Expo stores it safely for you). The build takes about 10–20 minutes. When it's done you get a link to download a file ending in **`.aab`**. That's what you upload to Google Play.

Want to try the real Android app on your own phone first? `npm run build:android-test` makes an `.apk` you can install directly.

## Step 4: Create the app in Play Console

In [Play Console](https://play.google.com/console), click **Create app**:

| Field | Enter |
|---|---|
| App name | Bounce Duel |
| Default language | English (United States) |
| App or game | Game |
| Free or paid | Free |

Tick the declarations and click **Create app**.

## Step 5: Fill in "Set up your app"

The **Dashboard** shows a checklist. Go through each item:

- **Privacy policy:** `https://bounceduel.se/privacy.html`
- **App access:** choose **All or some functionality is restricted**, then add login details for a test account (create one in the game first). Note: "The game can be played as a guest; logging in saves coins and score."
- **Ads:** No, my app does not contain ads.
- **Content rating:** start the questionnaire, pick category **Game**, and answer **No** to violence, sexuality, language, drugs and gambling. For "Can users interact or exchange content?", answer **Yes**: players see each other's display names on leaderboards. It should come out as Everyone / PEGI 3.
- **Target audience:** choose **13–15, 16–17 and 18+**. Picking ages under 13 brings in Google's extra Families rules.
- **News app:** No.
- **Data safety:**
  - Does your app collect or share user data? **Yes**
  - Is all data encrypted in transit? **Yes**
  - Can users request deletion? **Yes**, and the deletion link is `https://bounceduel.se/privacy.html#delete`
  - Data collected (all **Collected**, not shared, used for **App functionality** and **Account management**):
    - Personal info → **Email address**
    - Personal info → **User IDs**
    - Personal info → **Other info** (display name)
    - App activity → **Other user-generated content** (group names)
    - App activity → **In-app actions** (game stats, coins)
- **Government apps / Financial features / Health:** No.

## Step 6: Store listing

Under **Grow users → Store presence → Main store listing**:

**Short description** (80 characters max):
> Bouncing cube battles! Pick your spike and power, beat the CPU or a friend.

**Full description:**
> Two cubes bounce around a square room like the old DVD logo, each with a spike flying around it. Every spike hit does 1 damage. First cube to 0 HP loses!
>
> • Play against the CPU on Easy, Normal or Hard, or challenge a friend on the same phone
> • Pick your spike: Classic, Twin, Saw, Lance or Comet
> • Pick your power: Dash, Shield, Freeze, Rage, Heal or Blink, and use it at the right moment
> • Earn coins from matches, daily rewards and daily challenges
> • Unlock skins like Neon, Lava, Gold, Galaxy and Rainbow in the shop
> • A new event every week with special rules, like Giant Spikes and Sudden Death
> • Make a group with your friends and climb the leaderboard
>
> Log in with your email on any device to keep your coins, skins and score.

**Graphics** (all in the [`store/`](store/) folder):
- **App icon:** `store/play-icon-512.png`
- **Feature graphic:** `store/feature-graphic-1024x500.png`
- **Phone screenshots:** the four `store/play-1080x1920-*.png` files

Category: **Arcade**. Contact email: required by Google. Use an address you're happy to show publicly.

## Step 7: Closed test (12 testers, 14 days)

New personal accounts must do this before going public:

1. Go to **Test and release → Testing → Closed testing** and click **Create track** (or use the default "Alpha" track).
2. Under **Testers**, make an email list with **at least 12 people** (friends and family with Android phones and Google accounts).
3. Click **Create new release**, upload the `.aab` file from Step 3, and name the release `1.0.0`. Click **Next**, then **Save and publish**.
4. Send your testers the **opt-in link** shown on the Testers tab. They open it, tap **Become a tester**, then install Bounce Duel from Google Play.
5. Testers need to **keep it installed for 14 days** in a row. Ask them to actually play it, because Google checks that the testing was real.

## Step 8: Go public

After 14 days, the Dashboard shows **Apply for production**. Answer Google's short questions about your test (who tested, what feedback you got, what you changed). Once approved:

1. Go to **Test and release → Production → Create new release**.
2. Click **Add from library** and pick the build you tested (or upload a new `.aab`).
3. Click **Next**, then **Save and publish**, then **Send for review**.

Google's review usually takes a few days. Then Bounce Duel is live on Google Play!

## Updating the app later

Change the game in `index.html`, run `npm run build:android` again from `mobile/` (the version number goes up automatically), and upload the new `.aab` as a new release.
