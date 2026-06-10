
```md
# Booking Service Picker

Take-home project for a two-step booking flow built with Next.js, React, TypeScript, Tailwind, Storybook, and TanStack Query.

## Run locally

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Run Storybook

```bash
npm run storybook
```

## Verification

```bash
npm run lint
npm run build
npm run build-storybook
```

## What is implemented

- Step 1: service picker flow with:
  - category filters
  - service selection
  - add-on selection
  - live summary
- Step 2: payment step shell with:
  - payment method selection
  - tip selection
  - order summary
  - back navigation to the service picker
- CTA navigation from step 1 to step 2
- URL-driven booking selection state via `searchParams`:
  - `category`
  - `serviceId`
  - `addOnId`
- TanStack Query cache boundary for mock-backed data reads:
  - `services`
  - `addOns`
- Polished UX state matrix:
  - loading
  - empty
  - invalid params fallback
  - no selected service
  - explicit `no extra`
  - safe CTA disabled behavior
- Reusable `SelectableOptionCard` with Storybook coverage

## Core technical decisions

- State ownership is explicit:
  - URL state owns booking selection
  - TanStack Query owns server-like data reads
  - screens derive computed values such as selected entities, duration, and totals
- `ServicePickerScreen` owns booking-step orchestration
- `PaymentStepScreen` keeps only small local UI state for transient controls such as:
  - selected payment method
  - selected tip option
  - payment method panel toggle
- Shared UI boundary stays intentionally small:
  - `SelectableOptionCard` is the only reusable selection primitive
  - flow-specific UI remains screen-local until there is a second real reuse case
- Query layer is intentionally thin for the mock phase using `Promise.resolve(...)`

## Project docs

Additional submission materials are included in:

- `docs/DESIGN_SYSTEM.md`
- `docs/STRUCTURE.md`
- `docs/SUBMISSION.md`

## Assumptions

- `category` uses stable key semantics. In current mock data the key equals the category string.
- `addOnId=none` is a screen-local sentinel for explicit `no extra` UX, not a domain entity.
- Invalid URL params are handled through safe runtime fallbacks instead of aggressive URL normalization.
- The payment step is a demo shell, not a full checkout implementation.

## What I would improve with more time

- Add integration tests for the URL/query UX matrix across both steps.
- Add canonical URL normalization rules after invalid params.
- Add SSR prefetch/dehydrate for query data if a real backend is introduced.
- Expand the payment step from a demo shell into a fuller production flow if the task scope required it.

## AI disclosure

I used coding agents in a constrained, review-driven workflow to speed up implementation and documentation.

Agent-assisted tasks included:

- repetitive refactor steps
- query/provider wiring
- first-pass documentation drafting
- small UI iteration passes

I manually reviewed and validated:

- state ownership boundaries
- shared vs screen-local component decisions
- UX behavior across both steps
- final code and docs consistency
- lint/build verification
```
