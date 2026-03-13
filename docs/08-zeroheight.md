# 08 — ZeroHeight: The Human-Friendly Documentation Hub

ZeroHeight is where the design system comes alive for everyone — not just developers. This guide explains what ZeroHeight is, how our site is structured, and how to add documentation for new components.

**Where to find it:** `motadata.zeroheight.com`

---

## What ZeroHeight Is

ZeroHeight is a documentation platform built specifically for design systems. It sits between Figma and code, providing a place for:
- Written guidelines: when to use a component, when not to, best practices
- Live embedded Storybook examples that update automatically
- Embedded Figma frames showing design specs
- Code snippets for developers to copy

### Why ZeroHeight Instead of Just Storybook or README?

| Feature | Storybook | README | ZeroHeight |
|---------|-----------|--------|------------|
| Live interactive components | Yes | No | Yes (embedded) |
| Written guidelines | Limited | Yes | Yes |
| Embedded Figma frames | No | No | Yes |
| Friendly for non-developers | No | No | Yes |
| Figma integration | No | No | Yes |
| Organized navigation | Yes | No | Yes |

Storybook is a great tool for developers experimenting with components. But a product manager, designer, or QA engineer who wants to understand "when should I use a Primary button vs a Ghost button?" doesn't want to dig through code. ZeroHeight gives them that answer in plain language.

---

## Structure of the MDT ZeroHeight Site

The site is organized into two main sections:

### Foundations

Pages covering the fundamental design decisions:
- **Colors** — the full color palette, semantic color tokens, usage guidance
- **Typography** — type scale, font weights, line heights, heading vs. body
- **Spacing** — the spacing scale, how to use spacing tokens
- **Iconography** — icon library and usage rules

### Components

One page per component, each with multiple tabs:

**Guidelines tab:** Written documentation
- Overview of what the component does
- When to use it
- When NOT to use it (important — avoids misuse)
- Best practices
- Accessibility considerations

**Specs tab:** Design specifications
- Embedded Figma frame showing all variants and measurements
- Embedded Storybook story for interactive exploration

**Code tab:** Implementation reference
- npm install snippet
- Import example
- Props table
- Usage examples

---

## Adding a New Component Page

Here's the step-by-step process for adding documentation for a new component (using Badge as the example).

### Step 1: Log In to ZeroHeight

Go to `motadata.zeroheight.com` and click "Log in." Use the team account credentials (ask a team admin if you don't have them).

### Step 2: Create a New Page

1. In the left navigation sidebar, find the "Components" section
2. Hover over it — a "+" icon appears
3. Click "+" to add a new page
4. Name it **Badge** (use PascalCase to match the component name)
5. Press Enter

### Step 3: Write the Guidelines Tab

The Guidelines tab is the first thing people see. Write it for a non-technical audience.

**Suggested structure:**

```
## Overview
A brief 1-2 sentence description. Example:
"Badges are small labels used to highlight a status, category, or count.
They draw attention to important information without taking up much space."

## When to use
- To show status (Active, Pending, Failed)
- To indicate categories (New, Beta, Deprecated)
- To display counts in a compact space

## When not to use
- Don't use badges as buttons — if it's clickable, use a Button or Chip
- Don't use badges for long text — keep it to 1-3 words
- Don't stack more than 2-3 badges next to each other

## Best practices
- Keep text short and scannable
- Use semantic colors consistently: danger for errors, success for confirmations
- Pair with a label when the context isn't obvious: "Status: Active" not just "Active"

## Accessibility
- Badges are non-interactive by default (span element)
- If a badge conveys status, add aria-label for screen readers:
  <Badge aria-label="Status: Active">Active</Badge>
```

### Step 4: Add the Specs Tab — Figma Embed

The Specs tab shows the design visuals.

**Embed a Figma frame:**
1. In ZeroHeight, switch to the "Specs" tab
2. Click "+" to add a block → choose "Figma" widget
3. In Figma: open the Badge component → right-click → Copy link to selection
4. Paste the Figma URL into the ZeroHeight widget
5. The Figma frame renders live — when designers update the design, it updates here automatically

**Embed a Storybook story (see next section for the URL format):**
1. Add another block → choose "iFrame" or "Embed"
2. Paste the Storybook iframe URL

### Step 5: Add the Specs Tab — Storybook Embed

To embed a Storybook story in ZeroHeight, you need the iframe URL format:

```
https://synapse.heynirav.com/iframe.html?id=STORY-ID&viewMode=story
```

**How to find the story ID:**

1. Open the deployed Storybook at `synapse.heynirav.com`
2. Navigate to your component (e.g., Components > Badge > Playground)
3. Look at the URL in your browser — it contains something like:
   ```
   ?path=/story/components-badge--playground
   ```
4. The story ID is: `components-badge--playground`
5. The iframe URL is:
   ```
   https://synapse.heynirav.com/iframe.html?id=components-badge--playground&viewMode=story
   ```

**Naming convention for story IDs:**
```
[section]-[component-lowercase]--[story-name-lowercase-with-dashes]

Examples:
components-button--playground
components-button--all-variants
components-badge--all-sizes
```

**Useful iframe URL parameters:**
- `&viewMode=story` — shows just the story (no sidebar)
- `&viewMode=docs` — shows the full docs page
- `&args=variant:success` — pre-sets a control value

Example with pre-set args:
```
https://synapse.heynirav.com/iframe.html?id=components-badge--playground&viewMode=story&args=variant:success
```

### Step 6: Add the Code Tab

The Code tab is for developers. Include:

**npm installation:**
```
npm install @niravbhatt/mdt-design-system
```

**Import:**
```tsx
import { Badge } from '@niravbhatt/mdt-design-system'
import '@niravbhatt/mdt-design-system/styles'
```

**Basic usage examples:**
```tsx
<Badge>Default</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="danger" size="sm">Error</Badge>
```

**Props table** (add a table block):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Visual style |
| `size` | `'sm' \| 'md'` | `'md'` | Size of the badge |
| `children` | `ReactNode` | — | Text content of the badge |
| `className` | `string` | — | Additional CSS class |

---

## The Live Code Sandbox and CDN URL

ZeroHeight supports live code examples where visitors can edit code and see the component render. For this to work, it needs to load the design system's CSS.

### How the CDN Works

The CSS file is hosted on jsDelivr, a free CDN for npm packages:

```
https://cdn.jsdelivr.net/npm/@niravbhatt/mdt-design-system@VERSION/dist/mdt-design-system.css
```

The `VERSION` part must match the published npm version. When you publish `0.2.0`, the CDN URL becomes:
```
https://cdn.jsdelivr.net/npm/@niravbhatt/mdt-design-system@0.2.0/dist/mdt-design-system.css
```

jsDelivr caches files permanently for each version. This means:
- Old versions always remain accessible
- The live examples will keep working even as you release new versions
- You must update the URL when you want ZeroHeight to use new styles

### Updating the CDN URL After Publishing

After every npm publish with CSS changes:

1. Log in to `motadata.zeroheight.com`
2. Go to **Settings** (gear icon, usually bottom-left)
3. Find the **Code** settings section
4. Find the CSS stylesheet URL
5. Update the version number: change `@0.1.1` to `@0.2.0` (or whatever the new version is)
6. Save

Without this step, your live code examples in ZeroHeight will use the old CSS, and new components or style changes won't appear correctly.

---

## Connecting Figma Embeds

Figma frames embedded in ZeroHeight update live when the design changes — unlike static screenshots that go stale.

### How to Embed a Figma Frame

1. In Figma: select the frame you want to embed
2. Right-click → **Copy link to selection**
   The URL looks like: `https://www.figma.com/design/A8iOt3oQHHT20N1mSpxnQ1/...?node-id=2022-2455`
3. In ZeroHeight: add a Figma block and paste the URL
4. ZeroHeight fetches the frame and renders it

### What Gets Embedded

- The exact frame you linked
- At its designed dimensions
- With a "Open in Figma" link for developers who want to inspect it

### Permissions Requirement

For ZeroHeight to read the Figma frame, the ZeroHeight account must have at least "View" access to the Figma file. If frames show as "unable to load," it's a permissions issue — grant ZeroHeight's connected Figma account access to the file.

---

## The ZeroHeight Toolbar Button in Storybook

There is a button in the Storybook toolbar that links directly to ZeroHeight. It appears in the top-right area of the Storybook UI and is labeled with a small arrow icon.

**What it does:** Clicking it opens `motadata.zeroheight.com` in a new browser tab.

**How it's implemented:** The button is defined in `.storybook/manager.ts`. It uses Storybook's addon API to add a custom toolbar item.

**Why it's useful:** It gives developers a one-click path from looking at a component in Storybook to reading its design guidelines in ZeroHeight. Both tools complement each other — Storybook for exploring code, ZeroHeight for understanding intent.

---

## ZeroHeight Page Template

Here is a reusable template structure for every new component page:

```
[Component Name]

GUIDELINES TAB
  ## Overview
  [1-2 sentence description]

  ## When to use
  - [use case 1]
  - [use case 2]
  - [use case 3]

  ## When not to use
  - [anti-pattern 1]
  - [anti-pattern 2]

  ## Best practices
  - [practice 1]
  - [practice 2]

  ## Accessibility
  - [accessibility note 1]

SPECS TAB
  [Figma embed: component set with all variants]
  [Storybook embed: Playground story]
  [Storybook embed: All Variants story]

CODE TAB
  ## Installation
  npm install @niravbhatt/mdt-design-system

  ## Import
  import { [ComponentName] } from '@niravbhatt/mdt-design-system'
  import '@niravbhatt/mdt-design-system/styles'

  ## Usage
  [code examples]

  ## Props
  [props table]
```

---

Next: [09 — AI Tools Usage](09-ai-tools-usage.md) — How to use Claude Code, Figma Make, and other AI tools effectively with this design system.
