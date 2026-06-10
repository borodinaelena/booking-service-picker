# Project structure

```
src/
├── app/                      # App Router pages and layouts
├── components/
│   ├── ui/                   # Reusable presentational UI blocks
│   └── booking/              # Booking-flow domain components
├── features/
│   └── service-picker/       # Screen-level orchestration
├── lib/
│   ├── formatters/           # Display formatters
│   ├── utils/                # Shared utilities
│   └── query-client.ts       # TanStack Query client factory
├── mocks/                    # SDK-shaped mock responses
└── types/                    # Local domain types and adapters

docs/
├── DESIGN_SYSTEM.md          # shared UI boundary and props contract
├── STRUCTURE.md              # опис структури та aliases
└── SUBMISSION.md             # Take-home submission writeup
```

## Import aliases

| Alias | Path |
|-------|------|
| `@/*` | `src/*` |
| `@/components/*` | `src/components/*` |
| `@/features/*` | `src/features/*` |
| `@/lib/*` | `src/lib/*` |
| `@/mocks/*` | `src/mocks/*` |
| `@/types/*` | `src/types/*` |
