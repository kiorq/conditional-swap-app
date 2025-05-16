# **Conditional Swap**

by Kirk Douglas

## Setup
```
npm i
npm run dev
```

## **Repo Structure Plan**

I’m building this using a TurboRepo monorepo, with two apps written entirely in TypeScript:

* apps/web: Next.js frontend
* apps/api: Node.js backend (TBD: Fastify or Express)

The goal is for anyone to spin this up easily:

```
npm install   # install all dependencies

npm run dev   # run both frontend and backend

npm run test  # run tests
```

## Backend Structure

* Local SQLite database via a lightweight Node ORM (likely Prisma or Drizzle)
* Basic CRUD API endpoints to manage swap requests
* Background job (cron or interval-based) that:
* Pulls current prices
* Checks all active swaps
* Updates status to executed or expired based on time and threshold

## Frontend Functionality

Start with a barebones UI that can:

* Create swap requests
* List active and historical swaps
* View details of individual swaps

Design and polish will come later after the system is fully functional and tested.

## Swap Logic and Execution

This is the core engine. A background job will:

* Run every minute
* Query current market prices
* Evaluate each pending swap
* Fulfill or expire based on the swap’s threshold and time window

This part will be fully tested and is where most of the logic lives.

## **Data Entities**

Still finalizing and will update once the schema stabilizes.

## Additional Enhancements (time permitting)

* *Performance optimization*: Crypto markets are volatile. Ideally, I would use Redis to cache {from, to, min_threshold} so the job can pre-filter which token pairs need database lookups. For now, I’ll rely on SQL filters using time and threshold ranges.
* *Authentication*: Would like to use Clerk or another OAuth flow to support multi-user swap histories.
* *Wallet validation*: Mocking wallet validation on the frontend or stubbing an API.
* *Logging*: Audit log changes to swap request

## AI Usage

* Cursor (for code autocomplete and inline refactoring)
* Spell checking
* Used to create ui components (e.g: modals, forms)
