---
name: Card Pattern
description: Standard card component pattern used across all sections
type: reference
---

# Card Pattern

All content wrapper cards follow this unified styling:

```
bg-white rounded-xl p-6 shadow-sm border border-gray-100
```

## Card Heading
```
<h2 className="text-lg font-semibold text-gray-900 mb-4">
```

## Empty State Pattern
Empty states are centered vertically with:
1. A circular icon container: `w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3`
2. An inline SVG icon at `h-6 w-6 text-gray-400`
3. Text: `text-gray-400 text-sm`

## Hover States
Cards have `transition-shadow duration-200` on hover (where applicable).
Summary cards use `hover:shadow-md`.
