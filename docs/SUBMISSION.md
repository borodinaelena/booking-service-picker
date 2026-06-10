# Booking Service Picker — Submission Notes

## Component map

- Service option rows (`SelectableOptionCard`): reuse shared component as-is for primary selectable list.
- Category chips (`CategoryFilterChips`): build new screen-local component for flow-specific filtering UX.
- Add-on row (`AddOnOptionRow`): build new screen-local component optimized for compact add-on list presentation.
- Explicit `no extra`: screen-local row using existing add-on row UI with sentinel URL value.
- Summary panel (title, duration, total, CTA): screen-local orchestration and rendering.
- Page shell/layout styling: screen-local.

## State plan

- URL state (owner: navigation/search params):
	- `category`
	- `serviceId`
	- `addOnId`
- Server cache (owner: TanStack Query):
	- `services` (`servicePickerQueryKeys.services`)
	- `addOns` (`servicePickerQueryKeys.addOns`)
- Local UI state:
	- none for selection; selection is URL-driven.
	- only transient render branching from query/loading states.
- Form state:
	- none (no form library, no controlled form model required for this scope).
- Types:
	- local domain types from `src/types/booking.ts`
	- mock data in `src/mocks` shaped to domain types.

## Agent plan

How I would use Codex / Claude Code on the next screen:

- Prompt pattern:
	- Step 1: ask agent for boundary map (`URL state`, `cache`, `screen-local derived`) before edits.
	- Step 2: ask for minimal patch touching only target feature files.
	- Step 3: require lint/build verification and a short risk report.
- Guardrails:
	- do not introduce global store unless explicitly requested.
	- do not move screen-local UI to shared without a second usage.
	- do not add abstraction layers without immediate payoff.
	- preserve URL contract and accessibility behavior.
- Example diff I would reject:
	- extracting all service-picker logic into a generic "booking engine" module with new adapters/repositories and no current reuse need.

## Trade-offs

- Kept query layer intentionally thin (`Promise.resolve`) instead of simulating a backend.
- Did not normalize invalid URL params back into canonical URL on every render; used safe runtime fallback behavior.
- Kept `no extra` as screen-local sentinel (`addOnId=none`) instead of changing domain model.
- Did not promote category/add-on UI primitives into shared components yet; current reuse signal is still single-screen.

## What I would improve with more time

- Add integration tests covering URL invalid/missing states and explicit `no extra` behavior.
- Add canonical URL normalization strategy with clear rules and tests.
- Add lightweight telemetry hooks for key UX events (category change, service select, add-on select, CTA intent).
