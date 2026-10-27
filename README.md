# Bounce Duel

Two cubes bounce around a square room in the middle of a black screen, like the old DVD logo. Spikes orbit each cube, and every hit on the other cube does 1 damage. Both cubes start with 100 HP; the first to 0 loses.

The app has five tabs: **Play**, **Events**, **Shop**, **Groups** and **Profile**.

## Play

- **Single player**: play against a CPU cube (Easy, Normal or Hard). The CPU picks a random skin, spike and power each match.
- **Two players**: two people on the same device. Player 2 can sign in to their own account on the setup screen.
- **Three players**: online matchmaking puts three random players together. Cubes at 0 HP are knocked out and watch the rest; the last cube left wins. Score: 1st gains the HP they have left, 2nd gains a tenth of the HP they had when 3rd went out, and 3rd loses the average HP the other two had at that moment.
- **Play with a friend**: tap the small button on the Play tab, then make a room and send the 4-letter code (or the invite link). Up to 3 people can join; the host sees who's in and starts the game (2 or 3 players). After the match, everyone can go back to the room.
- **Event match**: single player with this week's special rules and 50% more coins.
- **Gambler event** (26 October to 2 November 2026): boss fights against the Gambler, a giant slot machine 3 times your size with no spike. It pulls its lever every few seconds; three numbers in a row hurts you (Shield blocks it, Freeze stops the lever). **Normal**: 500 HP, every 15 s, 25% chance, 5–10 damage, 40 coins. **Extreme**: 1000 HP, every 7 s, 35% chance, 10–15 damage, 80 coins. Each counts once a day. 7 normal wins unlock the Gambler cube; 7 days with both wins unlock the Awakened Gambler.
- **The Tower**: a 2D climb up a tower with 15 stages and 100 HP, each a new color and harder than the last (moving, crumbling, blinking, icy and spiked platforms, bounce pads, elevators and conveyor belts). No powers and no checkpoints. Move with ◀ ▶ (arrow keys or A/D on a computer) and tap to jump (Space, ↑ or W).

Each player taps where their cube starts, then drags or taps to pick the bounce direction. After a 3-2-1 countdown the cubes go, and they speed up over time.

## Spikes

| Spike | What it does |
|---|---|
| Classic | One sharp spike. Balanced. |
| Twin | Two smaller spikes on opposite sides, spinning slower. |
| Saw | A spinning saw blade. Big hitbox, slower orbit. |
| Lance | A long, thin blade that spins fast. |
| Comet | A fireball whose orbit swings in and out. |

## Powers

Press your power button (or a key: Player 1 = `A` / `Space`, Player 2 = `L`) when it's charged.

| Power | Effect | Recharge |
|---|---|---|
| Dash | Move twice as fast for 2.5 s | 5 s |
| Shield | Take no damage for 1.5 s | 10 s |
| Freeze | Freeze the other cube and its spike for 2.5 s | 10 s |
| Rage | Your spike grows and spins faster for 3 s | 9 s |
| Heal | Get back 4 HP | 18 s |
| Blink | Teleport right next to the other cube | 6 s |

## Coins

Coins are the game's currency. You earn them by:

- **Playing**: beating the CPU pays 10 / 20 / 35 coins (Easy / Normal / Hard), a loss pays 3. In two-player games the winner gets 15 and the loser 5.
- **Daily reward**: claim once a day. Keep a streak going for more: 20 coins on day 1, up to 80 on day 7 and after.
- **Daily challenges**: three new challenges every day (for example "Deal 300 damage" or "Win a game with the Lance spike"), worth 30–60 coins each.

Spend coins in the **Shop** on skins: Neon, Ice, Candy, Lava, Void, Gold, Galaxy and Rainbow (100–1000 coins). Classic and Checker are free.

## Events

A new event starts every Monday and runs all week:

| Event | Rules |
|---|---|
| Speed Frenzy | Cubes start 60% faster |
| Power Chaos | Powers recharge 3 times faster |
| Giant Spikes | Every spike is 60% bigger |
| Tiny Room | The room is 30% smaller |
| Sudden Death | Both cubes start with only 30 HP |
| Coin Rush | Every match pays double coins |

Each event also puts one skin on sale at half price.

### Tower tournament

A new tower is built every Monday (00:00 UTC), the same one for everyone. A climb of 5:00 or less pays 500 coins, once a week. Only a faster time replaces your best. You have 100 HP; every spike takes 10 and it never heals, so at 0 HP the climb is over. The fastest climb when the week ends wins 10,000 coins, collected the next time the winner opens the game. The server times each climb from its start, so a saved time can't be faster than the real one.

## AFK Room

The AFK Room (on the Play tab) pays you for leaving the game open: 10 coins for every 10 minutes, up to 300, and after 5 hours the Sleepy cube (or 500 bonus coins if you already have it). Then a new round starts. The game checks in with the server every minute, and if it is closed for more than 5 minutes the time starts over, so only real time in the room counts. "Collect and leave" pays what you've earned.

## Ads and the robot check

Players can watch a video ad for 25 coins, up to 5 times a day (the rules count them per day), and the menus show a small banner, never during a match. In the app the ads come from AdMob; on the website from AdSense. All ads are family-safe and non-personalised. New accounts on the website pass a Cloudflare Turnstile robot check (the app doesn't need it).

Until the real IDs are filled in, the app shows Google's test ads and the website shows no ads; the robot check already uses the real Cloudflare key. To go live:

- **AdMob (app):** make an Android (and iOS) app in AdMob, then put its app ID in `mobile/app.json` (the `react-native-google-mobile-ads` plugin) and the banner and rewarded ad unit IDs in `mobile/ads.ts`. In AdMob, set the app as directed at children / mixed audience.
- **AdSense (website):** put the publisher ID (`ca-pub-...`) and a banner slot ID in `ADSENSE` in `index.html`. Video ads for coins on the website need AdSense's H5 games ads to be approved for bounceduel.se.
- **Turnstile:** done; the site key for `bounceduel.se` is `TURNSTILE_SITEKEY` in `index.html`.

## Cases

The Cases tab sells four cases. Each one gives coins or a cube, and a cube you already own pays coins instead.

| Case | Price | Best prizes |
|---|---|---|
| Starter Case | 100 | Ruby 8%, Gold 2% |
| Legendary Case | 1,000 | Plasma 12%, Dragon 5% |
| Ultra Case | 10,000 | Dragon 15%, Phoenix 3% |
| Limited Case | 15,000 | Frostfire 20%, Phoenix 10%, Diamond 3% |

Ruby, Plasma, Dragon and Phoenix only come from cases, and Frostfire and Diamond only from the Limited Case, which is sold until 10 November 2026. Case cubes only show up in the shop for players who own them. The full chances are under "What's inside" on each case.

The server picks the prize: buying a case stamps the server's clock on the account, and the last three digits of that time in milliseconds choose the prize. `firestore.rules` checks that the prize collected is the one the time chose, so the case tables in `index.html` (`CASES`) and `firestore.rules` must stay the same.

## Groups

Make a group and share its 6-character code. Friends join from the Groups tab, and the group shows a leaderboard of everyone's score. There's also a **Top players** list across everyone.

## Codes

Players can type codes on the Profile tab. You make codes in the Firebase console: in Firestore, add a document to the `codes` collection whose ID is the code in capital letters, with any of these fields:

| Field | Type | Meaning |
|---|---|---|
| `skin` | string | a skin to unlock, e.g. `sigma`, `moai`, `rainbow` |
| `coins` | number | coins to give |
| `left` | number | how many more players can use it |

Each account can use a code once, and it stops working when `left` reaches 0.

## Accounts and score

Create an account with just an email and password on the **Profile** tab, then log in with the same details on any phone or computer. Forgot your password? Use "Forgot your password?" to get a reset email. You can delete your account any time from the Profile tab.

- Every account starts with a score of **100** and **50 coins**.
- When a two-player match ends, the winner **gains** points equal to the HP they have left and the loser **loses** the same amount. Lose to someone on 35 HP and you lose 35; lose without damaging them at all and you lose 100. The score can't go below 0.
- Your score gives you a rank: Bronze (0), Silver (150), Gold (300), Platinum (500), Diamond (800) and Legend (1200), shown next to names on every leaderboard.
- Leaving an online match on purpose (✕, Esc, back or Leave) costs **50** points, or what losing right then would cost if you're behind (the other player's HP). If the other player drops out, nobody loses points.
- Beating the CPU adds score too: **+3** on Easy, **+6** on Normal and **+10** on Hard, so one Hard win counts for more than three Easy wins. Losing to the CPU takes no score away.

Accounts are stored in the `bounce-duel` Firebase project (see [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for how it's set up). The security rules in `firestore.rules` stop players from changing other people's accounts, giving themselves large amounts of coins or score, or taking skins without paying.

## Play it

- **Android app**: download **BounceDuel.apk** from the [latest release](https://github.com/Allo20206real/good-fun-game/releases/latest) on your Android phone and install it. GitHub builds a new APK automatically whenever the game changes.
- **iPhone (and any phone)**: open **https://bounceduel.se**  and tap Share → **Add to Home Screen**. It installs with its own icon and opens full-screen like an app.

- **On the web**: **https://bounceduel.se** (published with GitHub Pages from this repo; the `CNAME` file holds the domain, so keep it).
- **On your phone**: the `mobile/` folder is an Expo app that wraps the game. See [`mobile/README.md`](mobile/README.md).
- **On the App Store**: the Expo app is set up for release. See [APP_STORE.md](APP_STORE.md) for how to build and submit it.
- **On Google Play**: see [GOOGLE_PLAY.md](GOOGLE_PLAY.md). Store images (icon, feature graphic, screenshots) are in [`store/`](store/).
