# 06 — Implement a Component: From Figma Design to Working Code

This guide walks you through the complete process of implementing a new design system component — from reading the Figma design to having a working, documented component in Storybook.

We'll use a **Badge** component as the example throughout this guide, since Button already exists in the codebase and Badge is a natural next component to build.

**Prerequisites:**
- Storybook running (`npm run storybook`)
- Claude Code installed and Figma MCP connected ([03 — Claude Code Setup](03-claude-code-setup.md))
- Figma file open in the desktop app

---

## Part A: Understand the Design in Figma

Before writing any code, spend 5–10 minutes in Figma fully understanding the component.

### 1. Open the Figma File

Open `figma.com/design/A8iOt3oQHHT20N1mSpxnQ1/Components--Copy-` in the Figma desktop app (not just the browser — you need the desktop app for the Claude MCP plugin).

### 2. Find the Badge Component

Press `Cmd+F` to open Figma's search. Type "Badge" and look for the Badge component set in the results. Click it to navigate to it.

### 3. Enable Dev Mode

Click the Dev Mode toggle (`</>`) in the top-right toolbar, or press `Shift+D`. The interface shifts to developer mode.

### 4. Take Note of All Variants

Click on the Badge component set (the outer container holding all variants). In the right panel, look at the variant properties. You'll see something like:

```
Properties:
  Style: Default, Success, Warning, Danger
  Size: SM, MD
```

Write these down — they become your TypeScript types.

### 5. Inspect Each Variant

Click on each variant (e.g., the "Success" badge) and note:

**Colors (from the right panel — Inspect tab in Dev Mode):**
- Background fill: look for the CSS variable name (e.g., `ds-success-light`)
- Text color: look for the CSS variable name (e.g., `ds-success`)

**If Figma shows hex values instead of token names:** Look at the `src/styles/tokens.css` file in the codebase to find which CSS variable matches that hex value.

**Spacing:**
- Padding (horizontal and vertical)
- Border radius

**Typography:**
- Font size
- Font weight
- Line height

### 6. Check States (Hover, Disabled, etc.)

Look for state variants. A Badge might only have "Default" and no interactive states (unlike a Button). Note this — it affects how many CSS classes you need.

### 7. Copy the Figma Node URL — Critical Step

You need the URL of the Badge component set (the parent container of all variants, not an individual variant).

Click on the outermost frame for the Badge component set. Right-click → **Copy link to selection**.

Your clipboard now has something like:
```
https://www.figma.com/design/A8iOt3oQHHT20N1mSpxnQ1/Components--Copy-?node-id=2022-2580
```

Keep this handy.

---

## Part B: Use Claude Code to Implement the Component

With the design understood and the node URL copied, let Claude do the initial implementation.

### 1. Open Claude Code in the Project

In your terminal:
```bash
cd ~/path/to/mdt-design-system
claude
```

Claude will load `CLAUDE.md` automatically — it already knows the project rules.

### 2. Give Claude the Figma URL and Your Task

Type or paste this in the Claude prompt:
```
Implement this Figma component: https://www.figma.com/design/A8iOt3oQHHT20N1mSpxnQ1/Components--Copy-?node-id=2022-2580

Create:
- src/components/Badge/Badge.tsx
- src/components/Badge/Badge.module.css
- src/components/Badge/index.ts
- src/components/Badge/Badge.stories.tsx

Then add the export to src/index.ts.
```

### 3. Claude Reads the Design

Claude calls the Figma MCP tools (`get_design_context`, `get_screenshot`) to read the design. It will:
- List the variants it found
- Identify the CSS variables being used
- Generate all four files

Watch the output. Claude will show you each file before writing it.

### 4. Review Claude's Output

Before accepting, review each file Claude generated:
- Does it use CSS variables? (Look for `var(--ds-*)` — never hardcoded hex)
- Does it use `forwardRef`? (Every component must)
- Does it have a `displayName`?
- Does `index.ts` export both the component and its types?
- Do the stories cover all variants?

### 5. Answer Clarifying Questions

Claude might ask: "I noticed the Figma design shows a dot indicator in some variants — should I include that as a prop?" Answer based on what you want. "Should the badge be inline or block by default?" Answer `inline-flex` — that's standard for badge-like components.

If Claude gets something wrong (wrong color variable, wrong sizing), you can say: "The background for the success variant should use `var(--ds-success-light)`, not `var(--ds-success)`" and Claude will update the file.

---

## Part C: The File Structure

After Claude finishes (or if you're writing it manually), you'll have:

```
src/components/Badge/
  Badge.tsx          React component with props interface
  Badge.module.css   Scoped CSS using CSS variables
  index.ts           Re-exports everything
  Badge.stories.tsx  Storybook documentation and examples
```

Plus, `src/index.ts` will have a new line: `export * from './components/Badge'`

---

## Part D: Badge.tsx — The Component File

Here is the complete `Badge.tsx` with explanations for every decision.

```tsx
import { HTMLAttributes, forwardRef } from 'react'
import styles from './Badge.module.css'

// Define the allowed values for the variant prop.
// Using a type alias (not just string) gives consumers autocomplete
// and prevents typos like variant="sucess" from compiling.
export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger'

// Same for size — restrict to known values only.
export type BadgeSize = 'sm' | 'md'

// The props interface extends HTMLAttributes<HTMLSpanElement>.
// This means Badge automatically accepts all standard HTML attributes
// for a <span> element: className, style, id, aria-label, onClick, etc.
// You don't have to manually list every HTML attribute.
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant  // Optional — has a default below
  size?: BadgeSize        // Optional — has a default below
}

// forwardRef lets parent components pass a ref to the underlying <span>.
// This is required for all design system components. Why? Because consumers
// might need to measure the element, focus it programmatically, or
// attach animation libraries to it. If you don't use forwardRef, they can't.
//
// The syntax: forwardRef<HTMLElement, PropsType>((props, ref) => JSX)
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', children, className, ...props }, ref) => {
    // Build the className string by combining:
    // 1. styles.root — always applied (base styles)
    // 2. styles[variant] — the variant-specific styles (e.g., styles.success)
    // 3. styles[size] — the size-specific styles (e.g., styles.sm)
    // 4. className — any external className passed by the consumer
    //
    // .filter(Boolean) removes empty strings (when className is undefined).
    // .join(' ') combines them into a space-separated class string.
    const classes = [
      styles.root,
      styles[variant],
      styles[size],
      className ?? '',
    ].filter(Boolean).join(' ')

    return (
      // ref goes on the actual DOM element (the <span>), not the function
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    )
  }
)

// displayName is required for React DevTools and Storybook.
// Without it, the component shows up as "ForwardRef" in the component tree,
// which is confusing when debugging.
Badge.displayName = 'Badge'
```

### Why forwardRef?

The `forwardRef` pattern is mandatory for all design system components. Here's the reason in plain English:

Without `forwardRef`, if someone writes:
```tsx
const myRef = useRef(null)
<Badge ref={myRef}>Hello</Badge>  // This would throw a warning and not work
```

With `forwardRef`, the `ref` is passed through to the underlying `<span>`, so `myRef.current` gives direct access to the DOM node. This lets consumers:
- Measure the element's position with `getBoundingClientRect()`
- Focus the element with `.focus()`
- Attach animation libraries (GSAP, Framer Motion) that need DOM references
- Use intersection observers

---

## Part E: Badge.module.css — The Styles File

```css
/* Badge.module.css */

/* ─── Base styles (always applied) ───────────────────────── */
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* Border radius: use var() for tokens — never hardcode values */
  border-radius: var(--ds-radius-full, 9999px);

  /* Typography */
  font-family: var(--btn-font-family, 'Inter', sans-serif);
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
}

/* ─── Sizes ──────────────────────────────────────────────── */
/* Match exactly the values from Figma Dev Mode */
.sm {
  padding: 2px 8px;
  font-size: 11px;
}

.md {
  padding: 4px 10px;
  font-size: 12px;
}

/* ─── Variants ───────────────────────────────────────────── */
/*
  Every color uses a CSS variable.
  RULE: Never hardcode hex values like #22c55e or #ff0000.
  Use var(--ds-*) variables from src/styles/tokens.css.

  Why? When the design team updates a color token in Figma,
  they update tokens.css once and all components update automatically.
  Hardcoded hex values would require finding and updating every file.
*/

.default {
  background-color: var(--ds-neutral-20);
  color: var(--ds-text-para);
}

.success {
  background-color: var(--ds-success-light);
  color: var(--ds-success);
}

.warning {
  background-color: var(--ds-warning-light);
  color: var(--ds-warning);
}

.danger {
  background-color: var(--ds-danger-light);
  color: var(--ds-danger);
}
```

### CSS Variables Fallback Values

Notice this pattern: `var(--ds-radius-full, 9999px)`. The second argument is a fallback value used if the CSS variable is not defined. This makes components more robust — if the token file isn't loaded, the component still looks reasonable.

---

## Part F: index.ts — The Re-Export File

Every component folder has an `index.ts` that re-exports everything. This enables clean imports:

```ts
// With index.ts: clean import
import { Badge } from '@niravbhatt/mdt-design-system'

// Without index.ts: messy deep import
import { Badge } from '@niravbhatt/mdt-design-system/src/components/Badge/Badge'
```

The complete `index.ts`:

```ts
// Export the component itself
export { Badge } from './Badge'

// Export all types so consumers can use them in their TypeScript code
// Example: const myVariant: BadgeVariant = 'success'
export type { BadgeProps, BadgeVariant, BadgeSize } from './Badge'
```

---

## Part G: Badge.stories.tsx — The Storybook Documentation

Storybook stories serve two purposes:
1. Interactive documentation for designers and developers
2. Visual test cases to verify the component looks correct

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

// The Meta object configures Storybook for this component.
const meta: Meta<typeof Badge> = {
  // Where it appears in the sidebar: Components > Badge
  title: 'Components/Badge',

  // The component to document
  component: Badge,

  // argTypes tells Storybook how to render each prop in the Controls panel.
  // 'select' creates a dropdown, 'text' creates a text input.
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger'],
      description: 'The visual style of the badge',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'The size of the badge',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    children: {
      control: 'text',
      description: 'The text content of the badge',
    },
  },

  // Default args applied to all stories unless overridden
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Badge>

// ─── Playground story ────────────────────────────────────────
// This is the interactive story with all controls.
// Users can tweak every prop and see the component update live.
export const Playground: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md',
  },
}

// ─── All Variants story ──────────────────────────────────────
// Shows every variant at once — great for design review.
// Uses render to show multiple instances in one story.
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
    </div>
  ),
}

// ─── All Sizes story ─────────────────────────────────────────
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
}

// ─── Individual stories for each variant ─────────────────────
// These make it easy to link to a specific state from ZeroHeight.
export const Success: Story = {
  args: { variant: 'success', children: 'Success' },
}

export const Warning: Story = {
  args: { variant: 'warning', children: 'Warning' },
}

export const Danger: Story = {
  args: { variant: 'danger', children: 'Danger' },
}
```

### How to See the Code Tab in Storybook

After running Storybook, open the Badge Playground story. In the bottom panel, click the **Code** tab. It shows the actual JSX for the current story:

```tsx
<Badge variant="success" size="md">Success</Badge>
```

This updates live as you change the controls. It's a great way to copy ready-to-use code.

---

## Part H: Wire Up and Verify

### 1. Add to src/index.ts

Open `src/index.ts` and add the Badge export. It should look like:

```ts
// src/index.ts

// Export all components
export * from './components/Button'
export * from './components/Badge'   // Add this line

// Export tokens
export * from './tokens'
```

**Rule:** Every new component must be exported from `src/index.ts`. If you forget this step, the component won't be available when someone installs the npm package.

### 2. Run Storybook

```bash
npm run storybook
```

Open `http://localhost:6006`. Look at the left sidebar — you should see:

```
Components
  Badge              <- new!
    Playground
    All Variants
    All Sizes
    Success
    Warning
    Danger
  Button
    ...
```

Click each story and verify:
- The component renders without errors (no red error screen)
- The variant styles look correct (success is greenish, danger is reddish, etc.)
- The size difference between SM and MD is visible
- The Controls panel shows the right dropdowns

### 3. Test Dark Mode

In the Storybook toolbar, toggle the theme to dark mode. Check that:
- All badge variants still look good
- Colors are readable (sufficient contrast)
- Background color changes appropriately

If dark mode looks wrong, you may need to add dark mode token overrides. Look at how `Button.module.css` handles dark mode (if it does) and follow the same pattern.

---

## Quick Checklist for Every New Component

Use this checklist before considering a component "done":

- [ ] `Badge.tsx` exists with forwardRef and displayName
- [ ] `Badge.module.css` exists with only CSS variable references (no hardcoded hex)
- [ ] `index.ts` exports the component and all types
- [ ] `Badge.stories.tsx` exists with at minimum: Playground, AllVariants
- [ ] `src/index.ts` has `export * from './components/Badge'`
- [ ] Storybook shows the component in the sidebar
- [ ] All variants render without visual errors
- [ ] Dark mode toggle doesn't break the component
- [ ] TypeScript shows no errors (VS Code bottom bar shows 0 errors)
- [ ] The build succeeds: `npm run build:lib` completes without errors

---

## What to Do if Something Looks Wrong

### Component renders but CSS doesn't apply
Make sure `Badge.module.css` is being imported: `import styles from './Badge.module.css'` in `Badge.tsx`.

### Styles apply but colors are wrong
Open `src/styles/tokens.css` and search for the variable name you used. If it doesn't exist, either use a different variable or check the Figma file for the correct token name.

### TypeScript error: "Property 'variant' does not exist on type..."
You may have forgotten to include `variant` in the `BadgeProps` interface. Add it:
```ts
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
}
```

### "Module not found: Can't resolve './Badge.module.css'"
Check the filename spelling. File names are case-sensitive on Linux (where the CI runs, even if your Mac is case-insensitive). Make sure the file is exactly `Badge.module.css`.

---

Next: [07 — Publish & Deploy](07-publish-and-deploy.md) — Share your changes with the world.
