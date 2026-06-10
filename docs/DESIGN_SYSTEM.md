# Design system boundary — Service Picker

## Shared component

**`SelectableOptionCard`** (`src/components/ui/SelectableOptionCard.tsx`)

Єдиний reusable UI primitive для екрана "Choose your service".

### Responsibility

- Рендерить одну selectable option (title, optional description, optional meta).
- Керує visual/interaction states: default, selected, loading, disabled.
- Не знає про domain types, API, totals, layout.

### Props API

| Prop | Required | Description |
|------|----------|-------------|
| `title` | yes | Назва опції |
| `isSelected` | yes | Controlled selected state |
| `onSelect` | yes | Callback при виборі |
| `description` | no | Опис опції |
| `metaPrimary` | no | Напр. formatted price |
| `metaSecondary` | no | Напр. duration |
| `isLoading` | no | Skeleton, без interaction |
| `isDisabled` | no | Disabled state |
| `id` | no | DOM id |
| `className` | no | Додаткові класи |

### Screen-local (не shared)

- Category chips
- Add-ons list container (rows reuse `SelectableOptionCard`)
- Summary sidebar
- Page layout
- Business logic totals
