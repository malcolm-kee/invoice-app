# Contributing

## Setting Up

This repo is a monorepo using pnpm workspaces. The package manager used to install and link dependencies must be [pnpm](https://pnpm.io/).

Once you [install pnpm](https://pnpm.io/installation), run the following commands at the root of this project.

```bash
pnpm install
```

The API server requires PostgreSQL as database. [Install it here](https://www.postgresql.org/download/) or [use the PostgreSQL docker image](https://hub.docker.com/_/postgres).

Once the installation is done, add an `.env` file at the `apps/invoice-api` folder. You can copy the `env.example` file if your PostgreSQL installation use the default settings.

Finally, sync the database schema by running the following command:

```bash
pnpm --filter="invoice-api" run db:push
```

## Seeding Data

To seed data, run the following command:

```bash
pnpm --filter="invoice-api" run db:seed
```

> Note that this will remove all the existing data.

## Starting Development UI and API Server

Run the following command:

```bash
pnpm run dev:app
```

- The UI dev server will be available at `http://localhost:3000`
- The API dev server will be available at `http://localhost:4888`

## Viewing Components

To view the components in a standalone documentation site, run the following command:

```bash
pnpm --filter="ui" run showroom:dev
```

## Running Tests

To run the tests for the components, run the following command:

```bash
pnpm --filter="ui" run test:ci
```
