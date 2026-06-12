# Kanban Frontend

Local-only app: in-memory state, no API, no persistence. Run entirely from this repository.

## Setup

```bash
npm install
```

If `node_modules` is already present, use local packages only:

```bash
npm install --prefer-offline
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tests

```bash
npm test
npm run test:e2e
```

E2E tests run on port 3099 so they do not conflict with the dev server on port 3000.
