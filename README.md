# Bounce Duel

Two cubes bounce around a square room in the middle of a black screen, like the old DVD logo. Spikes orbit each cube, and every hit on the other cube does 1 damage. Both cubes start with 100 HP; the first to 0 loses.

The app has five tabs: **Play**, **Events**, **Shop**, **Groups** and **Profile**.

## Play

- **Single player**: play against a CPU cube (Easy, Normal or Hard). The CPU picks a random skin, spike and power each match.
- **Two players**: two people on the same device. Player 2 can sign in to their own account on the setup screen.
- **Event match**: single player with this week's special rules and 50% more coins.
- **The Tower**: a 2D climb up a tower with 15 stages, each a new color and harder than the last (moving, crumbling, blinking, icy and spiked platforms, bounce pads, elevators and conveyor belts). No powers and no checkpoints. Move with ◀ ▶ (arrow keys or A/D on a computer) and tap to jump (Space, ↑ or W).

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

A new tower is built every Monday (00:00 UTC), the same one for everyone. The first climb each week pays 500 coins. After that, only a faster time counts. The fastest climb when the week ends wins 2000 coins and the Champion skin, collected the next time the winner opens the game. The server times each climb from its start, so a saved time can't be faster than the real one.

## Groups

Make a group and share its 6-character code. Friends join from the Groups tab, and the group shows a leaderboard of everyone's score. There's also a **Top players** list across everyone.

## Accounts and score

Create an account with just an email and password on the **Profile** tab, then log in with the same details on any phone or computer. Forgot your password? Use "Forgot your password?" to get a reset email. You can delete your account any time from the Profile tab.

- Every account starts with a score of **100** and **50 coins**.
- When a two-player match ends, the winner **gains** points equal to the HP they have left and the loser **loses** the same amount. Lose to someone on 35 HP and you lose 35; lose without damaging them at all and you lose 100. The score can't go below 0.

Accounts are stored in the `bounce-duel` Firebase project (see [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for how it's set up). The security rules in `firestore.rules` stop players from changing other people's accounts, giving themselves large amounts of coins or score, or taking skins without paying.

## Play it

- **Android app**: download **BounceDuel.apk** from the [latest release](https://github.com/Allo20206real/good-fun-game/releases/latest) on your Android phone and install it. GitHub builds a new APK automatically whenever the game changes.
- **iPhone (and any phone)**: open **https://bounceduel.se**  and tap Share → **Add to Home Screen**. It installs with its own icon and opens full-screen like an app.

- **On the web**: **https://bounceduel.se** (published with GitHub Pages from this repo; the `CNAME` file holds the domain, so keep it).
- **On your phone**: the `mobile/` folder is an Expo app that wraps the game. See [`mobile/README.md`](mobile/README.md).
- **On the App Store**: the Expo app is set up for release. See [APP_STORE.md](APP_STORE.md) for how to build and submit it.
- **On Google Play**: see [GOOGLE_PLAY.md](GOOGLE_PLAY.md). Store images (icon, feature graphic, screenshots) are in [`store/`](store/).
