# ChainVerse Frontend v2

A Next.js application for the ChainVerse learning platform, built with React 19 and the Stellar blockchain.

## Prerequisites

- Node.js 20 or later (`node --version` should print `v20.x.x`)
- npm 10 or later
- A [Freighter](https://freighter.app/) or [xBull](https://xbull.app/) wallet browser extension for Stellar
- Copy `.env.example` to `.env.local` and fill in the required values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Yes | Base URL for the backend API (e.g. `http://localhost:3001`) |
| `NEXTAUTH_SECRET` | Yes | Random secret for NextAuth session signing — run `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Yes | Canonical URL of the app (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_STELLAR_NETWORK` | Yes | Stellar network to connect to — `testnet` or `mainnet` |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Stellar Setup

ChainVerse uses [Stellar](https://stellar.org/) / [Soroban](https://soroban.stellar.org/) smart contracts for payments and NFT certificates.

### 1. Install a wallet

Install the [Freighter](https://freighter.app/) browser extension and create or import an account. Switch Freighter to **Testnet** before connecting.

### 2. Fund your testnet account

Visit [Stellar Laboratory Friendbot](https://laboratory.stellar.org/#account-creator?network=test) and paste your public key to receive free testnet XLM.

### 3. Contract addresses

Testnet contract addresses are kept in `.env.local`. Ask a maintainer for the current addresses or check the `#dev-contracts` channel. Do **not** commit real mainnet addresses to source control.

## Running Tests

Unit tests (Vitest):

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

End-to-end tests (Playwright — requires the dev server to be running):

```bash
npm run dev &
npm run test:e2e
```

## Building for Production

```bash
npm run build
npm start
```

Analyze bundle size:

```bash
ANALYZE=true npm run build
```

## Deploying to Vercel

1. Push your branch to GitHub and import the repository at [vercel.com/new](https://vercel.com/new).
2. Set the **Root Directory** to `frontend-v2` in the Vercel project settings.
3. Add all required environment variables (see the table above) in *Project → Settings → Environment Variables*.
4. Vercel will run `npm run build` automatically on every push to `main`.

For preview deployments on pull requests, no additional configuration is needed — Vercel picks them up automatically once the project is connected.

## Project Structure

```
frontend-v2/
├── app/              # Next.js App Router pages and layouts
├── src/
│   ├── components/   # Reusable UI components
│   ├── features/     # Feature-scoped modules
│   ├── store/        # Global state (Zustand)
│   ├── hooks/        # Custom React hooks
│   └── shared/       # Shared utilities and types
├── services/         # API service layer
├── utils/            # Helper functions and validators
└── e2e/              # Playwright end-to-end tests
```
