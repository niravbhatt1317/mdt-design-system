# Synapse — Contributor Guide

## Goal
A design system that produces **consistent UI output across any AI tool** — Figma Make, Claude Code, Cursor, v0, or any other. One source of truth for components, tokens, and guidelines everywhere.

---

## How Everything Connects

```
You edit code locally
        │
        ▼
git push origin main
        │
        ├─► GitHub Actions → builds Storybook → GitHub Pages (automatic)
        │
        └─► npm publish (manual) → @niravbhatt/mdt-design-system

Figma file ──► Code Connect ──────────► Figma Make uses <Button> from npm
CLAUDE.md ───────────────────────────► Claude Code follows conventions
llms.txt ────────────────────────────► Any AI reads the component API
ZeroHeight ──────────────────────────► Designers/devs read guidelines
```

---

## Key URLs

| Resource | URL |
|----------|-----|
| GitHub | `github.com/niravbhatt1317/mdt-design-system` |
| Storybook | `synapse.heynirav.com` |
| npm | `npmjs.com/package/@niravbhatt/mdt-design-system` |
| ZeroHeight | `motadata.zeroheight.com` |
| Figma | `figma.com/design/A8iOt3oQHHT20N1mSpxnQ1/Components--Copy-` |

---

## Project Structure

```
src/
  components/
    Button/
      Button.tsx          ← component logic + props
      Button.module.css   ← scoped CSS styles
      index.ts            ← re-export
      Button.stories.tsx  ← Storybook stories
  tokens/
    colors.ts             ← colour primitives + semantic aliases
    spacing.ts            ← spacing scale, radii, font sizes
    index.ts              ← re-exports all tokens
  styles/
    tokens.css            ← CSS custom properties (bundled in npm package)
    global.css            ← tokens + Inter font (Storybook only, not bundled)
  index.ts                ← public library entry point
.storybook/
  main.ts                 ← addons, framework config
  preview.ts              ← global decorators, parameters
  manager.ts              ← ZeroHeight toolbar button
.github/workflows/
  deploy-storybook.yml    ← auto-deploy on push to main
CLAUDE.md                 ← AI agent rules for Claude Code
llms.txt                  ← machine-readable API for AI tools
```

---

## Key Commands

```bash
npm run storybook          # local dev at localhost:6006
npm run build:lib          # build npm package → dist/
git push origin main       # auto-deploys Storybook
npm version patch          # 0.1.1 → 0.1.2 (bug fix)
npm version minor          # 0.1.1 → 0.2.0 (new feature)
npm publish --access public --ignore-scripts --otp=XXXXXX
```

---

## A. Update an Existing Component

1. **Edit source files:**
   - `src/components/Button/Button.tsx` — logic/props
   - `src/components/Button/Button.module.css` — styles
   - `src/components/Button/Button.stories.tsx` — stories

2. **Preview locally:**
   ```bash
   npm run storybook
   ```

3. **Commit and push** (Storybook auto-deploys):
   ```bash
   git add src/components/Button/
   git commit -m "fix: describe the change"
   git push origin main
   ```

4. **Publish to npm:**
   ```bash
   npm version patch
   npm publish --access public --ignore-scripts --otp=XXXXXX
   git push origin main
   ```

5. **Update ZeroHeight CDN CSS version:**
   Settings → Code → CSS → change `@0.1.1` to the new version number.

---

## B. Add a New Component

### Step 1 — Create the folder structure
```
src/components/ComponentName/
  ComponentName.tsx
  ComponentName.module.css
  index.ts
  ComponentName.stories.tsx
```

### Step 2 — ComponentName.tsx
```tsx
import { HTMLAttributes, forwardRef } from 'react'
import styles from './ComponentName.module.css'

export type ComponentNameVariant = 'default' | 'primary'

export interface ComponentNameProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ComponentNameVariant
}

export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ variant = 'default', children, className, ...props }, ref) => {
    const classes = [styles.root, styles[variant], className ?? ''].filter(Boolean).join(' ')
    return <div ref={ref} className={classes} {...props}>{children}</div>
  }
)
ComponentName.displayName = 'ComponentName'
```

### Step 3 — ComponentName.module.css
```css
/* Use CSS variables from tokens — never hardcode colours or spacing */
.root {
  font-family: var(--btn-font-family);
}
.default { background: var(--ds-neutral-20); color: var(--ds-text-para); }
.primary { background: var(--ds-core-black); color: #ffffff; }
```

### Step 4 — index.ts
```ts
export { ComponentName } from './ComponentName'
export type { ComponentNameProps, ComponentNameVariant } from './ComponentName'
```

### Step 5 — Export from library entry
Add to `src/index.ts`:
```ts
export * from './components/ComponentName'
```

### Step 6 — Add Storybook stories
Follow the Button.stories.tsx pattern:
- `title: 'Components/ComponentName'`
- At minimum: Playground story + All Variants story
- Add `autodocs` tag to Meta

### Step 7 — Commit, push, publish
```bash
git add src/components/ComponentName/ src/index.ts
git commit -m "feat: add ComponentName component"
git push origin main
# Storybook deploys automatically

npm version minor
npm publish --access public --ignore-scripts --otp=XXXXXX
git push origin main
```

### Step 8 — Update ZeroHeight
- Add a new page under Components section
- Guidelines tab: add usage text
- Specs tab: embed Storybook story iframe
  ```
  https://synapse.heynirav.com/iframe.html?id=components-componentname--playground&viewMode=story
  ```
- Code tab: add npm install snippet + usage example
- Update Settings → Code → CSS version number

### Step 9 — Update llms.txt
Add a new section with:
- Props table (name, type, default, description)
- Usage examples

### Step 10 — Figma Code Connect (optional)
In Claude Code, paste the Figma URL with the component's `node-id` and say:
> "connect this component to code"

---

## Rules — Always Follow

| Rule | Reason |
|------|--------|
| Use `var(--color-*)` / `var(--ds-*)` — never hardcode hex | Theming breaks if hardcoded |
| Use CSS Modules (`.module.css`) — never Tailwind or inline styles | Project convention |
| Never install icon packages | Pass icons as `ReactNode` via props instead |
| Never import `global.css` in components | It's Storybook-only (contains fonts) |
| Always export new components from `src/index.ts` | Required for npm package to expose them |
| Always bump version before `npm publish` | npm rejects duplicate versions |
| `--ignore-scripts` when publishing | Skips rebuild, uses already-built dist/ |

---

## What's in the npm Package

```
dist/
  index.mjs              ← ES module
  index.cjs              ← CommonJS
  index.d.ts             ← TypeScript types
  mdt-design-system.css  ← all tokens + component styles (6.85 kB)
  components/Button/     ← Button type declarations
  tokens/                ← Token type declarations
```

CDN URL (update version as you publish):
```
https://cdn.jsdelivr.net/npm/@niravbhatt/mdt-design-system@0.1.1/dist/mdt-design-system.css
```
