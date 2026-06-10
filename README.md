# Booking Service Picker

Take-home project for a booking flow screen built with Next.js, React, TypeScript, Tailwind, and Storybook.

## Run locally

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Run Storybook

```bash
npm run storybook
```

## What is implemented

- Service picker screen with category filters, service selection, add-on selection, and summary.
- URL-driven selection state via `searchParams`:
	- `category`
	- `serviceId`
	- `addOnId`
- TanStack Query cache boundary for data reads:
	- `services`
	- `addOns`
- Polished UX state matrix:
	- loading
	- empty
	- invalid params fallback
	- no selected service
	- explicit `no extra`
	- safe CTA disabled behavior
- Reusable `SelectableOptionCard` + Storybook story.

## Core technical decisions

- State ownership is explicit:
	- URL state owns user selection.
	- Query cache owns server-like data (`services`, `addOns`).
	- Screen derives computed values (`selectedService`, totals) without duplicating source state.
- `ServicePickerScreen` keeps orchestration local; no global state manager introduced.
- Shared UI boundary stays small and intentional (`SelectableOptionCard`), while flow-specific UI remains screen-local.
- Query layer is intentionally thin for mock phase (`Promise.resolve(...)`), without fake network complexity.

## Assumptions

- `category` uses stable key semantics. In current mock data this key equals category string.
- `addOnId=none` is a screen-local sentinel for explicit `no extra` UX, not a domain entity.
- Invalid URL params are handled via safe fallbacks in runtime behavior instead of hard URL normalization.

## What I would improve with more time

- Add integration tests for URL/query UX matrix (missing/invalid/empty/no-extra/CTA).
- Add URL normalization pass for canonical links after invalid params.
- Add SSR prefetch/dehydrate for query data if backend/API stage is introduced.

## AI disclosure

- I used coding agents (Codex / Claude Code style workflow) as implementation accelerators.
- Agent-assisted tasks:
	- repetitive refactor steps
	- first-pass docs drafting
	- wiring query/provider boilerplate
- Manually validated by me:
	- architecture boundaries
	- UX behavior and state ownership decisions
	- final code and docs consistency
	- lint/build checks
