# MDT Design System — Figma MCP Integration Rules

This project is the **source repository** for `@niravbhatt/mdt-design-system`. When implementing Figma designs here, always use and extend the components defined in this repo. When consuming the design system in another project, install the npm package.

---

## Project Overview

- **Package:** `@niravbhatt/mdt-design-system@0.1.0`
- **Framework:** React 18 + TypeScript
- **Styling:** CSS Modules (no Tailwind, no styled-components)
- **Build:** Vite (library mode) + vite-plugin-dts
- **Docs:** Storybook 8.6 at `niravbhatt1317.github.io/mdt-design-system/`
- **Figma:** `https://www.figma.com/design/A8iOt3oQHHT20N1mSpxnQ1/Components--Copy-`

---

## Figma MCP Required Flow

Follow this order for every Figma-driven implementation task — do not skip steps:

1. Run `get_design_context` on the target node to get the structured design representation
2. If response is too large, run `get_metadata` first to get the node map, then re-fetch specific nodes
3. Run `get_screenshot` for visual reference of the exact variant
4. Check `src/components/` for an existing component that matches before creating anything new
5. Translate the MCP output into this project's CSS Modules + TypeScript conventions
6. Validate final UI against the Figma screenshot for 1:1 parity

---

## Component Library

### Location
```
src/components/
  Button/
    Button.tsx          ← component implementation
    Button.module.css   ← scoped styles
    index.ts            ← re-export
    Button.stories.tsx  ← Storybook stories
```

### Rules
- IMPORTANT: Always check `src/components/` for an existing component before creating a new one
- New components must follow the same folder structure: `ComponentName/ComponentName.tsx`, `ComponentName.module.css`, `index.ts`
- Export all new components from `src/index.ts`
- Use `forwardRef` for all interactive elements
- Extend native HTML element props via `extends HTMLAttributes<HTMLElement>` or the specific element type

### Button component API
```tsx
import { Button } from './components/Button'

<Button
  variant="primary"      // 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'link'
  size="md"              // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading={false}        // shows spinner, sets aria-busy
  skeleton={false}       // renders shimmer placeholder
  fullWidth={false}      // 100% width
  iconOnly={false}       // square icon-only layout
  leadingIcon={<Icon />} // ReactNode before label
  trailingIcon={<Icon />}// ReactNode after label
  disabled={false}
>
  Label
</Button>
```

---

## Design Tokens

### JS Token Exports
```
src/tokens/
  colors.ts    ← primitive + semantic color tokens
  spacing.ts   ← spacing scale, radii, fontSize
  index.ts     ← re-exports all tokens
```

```tsx
import { colors, semantic, spacing, radii, fontSize } from './tokens'

colors.brand[600]   // '#2563eb'
spacing[4]          // '16px'
radii.md            // '8px'
```

### CSS Custom Properties
All tokens are available as CSS variables via `src/styles/global.css`. Import once at app root:
```tsx
import './styles/global.css'
```

#### Color tokens
```css
/* Semantic */
--color-bg-default      /* #ffffff light / #171717 dark */
--color-bg-subtle
--color-fg-default
--color-fg-muted
--color-border-default
--color-accent          /* brand blue */
--color-accent-hover
--color-accent-fg
--color-danger
--color-success

/* Button-specific */
--ds-core-black: #07101f
--ds-neutral-20: #ecf1f9
--ds-neutral-40: #cad3e2
--ds-text-heading: #111c2c
--ds-text-subdued: #516381
```

#### Button typography tokens
```css
--btn-font-family: 'Inter', sans-serif
--btn-font-weight: 500
--btn-xs-font-size: 12px  / --btn-xs-line-height: 16px
--btn-sm-font-size: 13px  / --btn-sm-line-height: 16px
--btn-md-font-size: 14px  / --btn-md-line-height: 16px
--btn-lg-font-size: 14px  / --btn-lg-line-height: 20px
--btn-xl-font-size: 14px  / --btn-xl-line-height: 20px
```

#### Spacing scale (base-4)
```css
spacing[1]=4px  spacing[2]=8px  spacing[3]=12px
spacing[4]=16px spacing[6]=24px spacing[8]=32px
```

---

## Styling Rules

- IMPORTANT: Use CSS Modules (`.module.css`) for all component styles — never inline styles or global class names
- IMPORTANT: Never hardcode hex colors — always use `var(--color-*)` or `var(--ds-*)` CSS variables
- IMPORTANT: Never hardcode spacing px values — use the spacing scale tokens
- Font: Inter loaded via `@fontsource/inter` at weights 400, 500, 600 — never load from Google Fonts
- Dark mode: set `data-theme="dark"` on an ancestor element — no separate CSS imports needed
- CSS class composition pattern:
```tsx
const classes = [styles.base, styles[variant], styles[size], className ?? '']
  .filter(Boolean).join(' ')
```

---

## Asset & Icon Rules

- IMPORTANT: Do not install any icon libraries (heroicons, lucide, etc.)
- Icons are passed as `ReactNode` via `leadingIcon` / `trailingIcon` props on Button
- If the Figma MCP returns a localhost source for an SVG or image, use that source directly
- SVG icons should be inline React components with `aria-hidden="true"`
- Store any static assets in `public/`

---

## Theming

```html
<!-- Light (default) -->
<div data-theme="light">...</div>

<!-- Dark -->
<div data-theme="dark">...</div>
```

Storybook uses `withThemeByDataAttribute` from `@storybook/addon-themes` — the toolbar switcher sets `data-theme` automatically.

---

## How to Use This Design System in Figma Make

When using **Figma Make** to generate code from this design system's Figma file:

1. Figma Make will see the Code Connect mapping for the `Button` component
2. It should automatically reference `@niravbhatt/mdt-design-system` as the import source
3. Always install the package first in the target project:
   ```bash
   npm install @niravbhatt/mdt-design-system
   ```
4. Import the stylesheet once:
   ```tsx
   import '@niravbhatt/mdt-design-system/styles'
   ```
5. Use components:
   ```tsx
   import { Button } from '@niravbhatt/mdt-design-system'
   ```

### Prompt template for Figma Make
When starting a Figma Make session, paste this context:

> Use the `@niravbhatt/mdt-design-system` npm package for all UI components. Import styles with `import '@niravbhatt/mdt-design-system/styles'`. Available components: `Button` (variant: primary/secondary/tertiary/neutral/link, size: xs/sm/md/lg/xl). Never hardcode colors — use CSS variables from the stylesheet. Full API: https://niravbhatt1317.github.io/mdt-design-system/

---

## Accessibility Standards

- All interactive elements must be keyboard accessible (native `<button>` / `<a>` preferred)
- Icon-only buttons require `aria-label` or visually-hidden children
- Loading state sets `aria-busy="true"` automatically
- Color contrast must meet WCAG 2.1 AA on both light and dark themes

---

## Project Structure

```
src/
  components/       ← React components (one folder per component)
  tokens/           ← JS design tokens (colors, spacing, radii, fontSize)
  styles/
    global.css      ← CSS custom properties + @fontsource/inter imports
  index.ts          ← public API — only export from here
.storybook/         ← Storybook config
dist/               ← built output (gitignored)
llms.txt            ← AI-readable design system API reference
```
