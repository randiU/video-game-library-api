# Testing

This project uses **Jest** + **Supertest** for automated API tests.

## What changed to make this possible

`server.js` used to build the Express app *and* call `app.listen()` /
`connectDB()` in the same file, so there was no way to import the app into a
test without also starting a real server and DB connection at import time.

- **`app.js`** – builds and exports the Express app only (middleware +
  routes). No `listen()`, no `connectDB()`.
- **`server.js`** – requires `app.js`, connects to Mongo, then calls
  `app.listen()`. This is still the file you run to start the real server
  (`npm start` / `npm run dev` are unchanged).

Tests `require('../app')` directly, so they exercise real routes/middleware
without a listening port.

## Setup

1. Make sure your local `.env` has `MONGODB_URI` set (same as normal dev
   setup — see the main README/setup instructions from Randi).
2. Install dependencies (adds `jest`, `supertest`, `cross-env` as dev
   dependencies):
   ```
   npm install
   ```

## Running the tests

```
npm test
```

This runs `cross-env NODE_ENV=test jest --runInBand`. `--runInBand` runs
test files one at a time instead of in parallel, which keeps things simple
since every test file shares one MongoDB connection setup
(`tests/setup/jestSetup.js` opens the connection before a file's tests run
and closes it after).

## What's covered

All tests live in `/tests`, one file per resource:

| File | Covers |
|---|---|
| `home.test.js` | `GET /` → 200 |
| `games.test.js` | `GET /games` → 200, `GET /games/bad-id` → 400, `POST /games` with missing required fields → 400 |
| `genres.test.js` | `GET /genres` → 200 |
| `platforms.test.js` | `GET /platforms` → 200 |
| `reviews.test.js` | `GET /reviews` → 200, `POST /reviews` while logged out → 401 |
| `library.test.js` | `POST /library` while logged out → 401 |
| `auth.test.js` | `GET /auth/status` → 200 |

## Important: these tests hit the real shared MongoDB Atlas database

There's no separate test database configured yet. That's safe **for the
tests currently in this suite** because every one of them is either a
read-only `GET`, or a write that's rejected before anything is saved (401
from the auth check, or 400 from validation before the document is created)
— so nothing gets written to the shared collections.

**If you add more tests later that successfully create/update/delete real
documents (e.g. a 201 test for `POST /games`), either:**
- point `MONGODB_URI` at a separate test database/cluster for test runs, or
- clean up (delete) any document your test creates in an `afterEach`/`afterAll`.

## Note on this PR

I could not run `npm test` against the shared Atlas cluster from my sandbox
(its network is locked down to package registries only, no database hosts),
so I verified the logic by code review instead of a live run. Please run
`npm test` locally before merging to confirm it's green — if `MONGODB_URI`
or route behavior differs from what I saw in the code, a couple of
assertions may need small tweaks.
