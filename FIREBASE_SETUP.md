# Turning on online accounts (Firebase)

Accounts, coins, groups and leaderboards are stored in Firebase, Google's free app backend. You set it up once (about 5 minutes); after that, players can log in with the same email and password on any phone or computer.

## 1. Create the project

1. Go to <https://console.firebase.google.com> and sign in with a Google account.
2. Click **Create a project**, name it (for example `bounce-duel`) and finish the steps. Google Analytics can be turned off.

## 2. Turn on email/password login

1. In the left menu open **Build → Authentication** and click **Get started**.
2. Under **Sign-in method**, pick **Email/Password**, switch on the first toggle (**Email/Password**) and click **Save**.

## 3. Create the database

1. Open **Build → Firestore Database** and click **Create database**.
2. Pick a location near your players and choose **Start in production mode**.
3. When it's ready, open the **Rules** tab, delete everything there, paste the full contents of [`firestore.rules`](firestore.rules) from this repo, and click **Publish**.

## 3b. Create the Realtime Database (for online matches)

Online two-player matches (matchmaking and live play) use Firebase's Realtime Database, which is much faster for sending moves between phones.

1. Open **Build → Realtime Database** and click **Create Database**.
2. Pick a location (the same region as Firestore is fine) and choose **Start in locked mode**.
3. Open the **Rules** tab, replace everything with the contents of [`database.rules.json`](database.rules.json), and click **Publish**.
4. Copy the database's URL from the top of the **Data** tab (it looks like `https://bounce-duel-default-rtdb.europe-west1.firebasedatabase.app`) and put it in `databaseURL` in `index.html`.

## 4. Get the two keys the game needs

1. Click the gear icon next to **Project Overview → Project settings**.
2. Under **Your apps**, click the **`</>`** (Web) button, give the app any nickname, and click **Register app** (you don't need Firebase Hosting).
3. Firebase shows a `firebaseConfig` block. You only need two values from it: **`apiKey`** and **`projectId`**.

These two values are safe to put in the game: they only identify your project. What protects the data is the security rules from step 3.

## 5. Put them in the game

In `index.html`, find this line near the top of the `<script>`:

```js
const FIREBASE_CONFIG = { apiKey: '', projectId: '' };
```

and fill in your values, for example:

```js
const FIREBASE_CONFIG = { apiKey: 'AIzaSy...', projectId: 'bounce-duel' };
```

Then run `npm run sync-game` in `mobile/` (or just `npm start`) so the phone app picks up the change.

## Playing it on the web

The game is one file, `index.html`. The included GitHub workflow (`.github/workflows/pages.yml`) publishes it as a free website:

1. On GitHub, open the repo's **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Merge the changes into the `main` branch. The workflow then publishes the site at `https://<your-username>.github.io/good-fun-game/`.

Share that link with your friends. It works on phones, tablets and computers, and everyone logs in with their own email and password.

## Testing locally without a real project

`firebase.json` is set up for the Firebase emulators, which run the same login and database (with the same security rules) on your computer:

```bash
npx firebase-tools emulators:start --only auth,firestore --project demo-bounce
```

Then open the game with `window.BD_FIREBASE = { apiKey: 'fake', projectId: 'demo-bounce', authHost: 'http://127.0.0.1:9099', firestoreHost: 'http://127.0.0.1:8080' }` set before the game script runs.
