---
name: Design System
description: Design tokens, typography, and component conventions used in this project
type: reference
---

# Design System

## Typography
- **Font Family**: Inter (Google Fonts), with system-ui fallback
- **Page Headings**: `text-2xl font-bold text-gray-900`
- **Card Headings**: `text-lg font-semibold text-gray-900`
- **Body/Input Text**: `text-sm text-gray-900`
- **Secondary/Label Text**: `text-sm font-medium text-gray-700`
- **Caption/Secondary**: `text-xs text-gray-400`
- **Numbers/Amounts**: `tabular-nums` class for monospace-width numbers

## Colors
- **Primary action**: Blue-600 background, white text, Blue-700 hover
- **Income**: Green-500/Green-600 (badges, amounts)
- **Expense**: Red-500/Red-600 (badges, amounts)
- **Background**: Gray-50 page background
- **Cards**: White background with `border border-gray-100` and `shadow-sm`
- **Input borders**: Gray-300, focus state uses `focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`
- **Empty states**: Gray-100 circle icon container, Gray-400 text

## Spacing Scale
- **Card padding**: `p-6`
- **Card heading margin**: `mb-4`
- **Form field spacing**: `space-y-4`
- **Label to input gap**: `mb-1.5`
- **Input padding**: `px-3.5 py-2.5`

## Interactive States
- **Hover transitions**: `transition-colors duration-150` on all interactive elements
- **Button active**: `active:bg-blue-800` for primary buttons
- **Submit buttons**: `font-semibold` weight with `shadow-sm`
- **Inactive toggles**: white background with `border border-gray-200`, hover to `bg-gray-50`
