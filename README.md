# Bounce Duel

Two cubes bounce around a square room in the middle of a black screen, like the old DVD logo. Spikes orbit each cube, and every hit on the other cube does 1 damage. Both cubes start with 100 HP; the first to 0 loses.

## Modes

- **Single player**: play against a CPU cube (Easy, Normal or Hard). The CPU picks a random skin, spike and power each match.
- **Two players**: two people on the same device.

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

## Skins

Classic and Checker are free. The rest unlock with single-player wins: Neon (1), Ice (2), Lava (3), Gold (5), Galaxy (8), Rainbow (12).

## Accounts and score

Create an account with an email and password on the Account page. In two-player games each player can be signed in (Player 2 signs in on the setup screen).

- Every account starts with a score of **100**.
- When a two-player match ends, the winner **gains** points equal to the HP they have left, and the loser **loses** the same amount. Lose to someone on 35 HP and you lose 35; lose without damaging them at all (they're on 100 HP) and you lose 100.
- The score can't go below 0.

Accounts are saved on the device (passwords are stored as salted SHA-256 hashes, never as plain text). They don't sync between devices, since the game has no server.

## Play

Open `index.html` in a browser (mouse, keyboard or touch).

## On your phone

The `mobile/` folder is an Expo app that wraps the game. See [`mobile/README.md`](mobile/README.md) for how to open it in Expo Go.
