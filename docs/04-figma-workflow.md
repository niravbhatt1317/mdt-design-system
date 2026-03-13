# 04 — Figma Workflow: How Designers Work in Figma

This guide explains how Figma is used in the MDT Design System, how to navigate the design file, and — most importantly — how to get the information you need to implement a component in code.

You don't need to be a designer to follow this guide. Developers use Figma constantly: to understand what a component should look like, to find the right CSS values, and to get Figma node URLs for Claude.

---

## Figma Basics

Before diving into the MDT file, a quick vocabulary lesson.

### Frames

A frame is a container — like a div in HTML, or an artboard in older design tools. Components, sections, and entire screens live inside frames. You'll recognize frames in the sidebar because they have a small hashtag-like icon next to their name.

### Components

A component in Figma is a reusable design element — the equivalent of a React component. When a designer creates a Button component in Figma, it's a master template. Every button you see on other pages is an "instance" of that component. Change the master, and all instances update.

Components appear in the sidebar with a purple diamond icon.

### Variants

Variants are like different props on a React component. A Button component might have variants for:
- **Style:** Primary, Secondary, Tertiary, Danger, Ghost
- **Size:** SM, MD, LG, XL
- **State:** Enabled, Hover, Focused, Disabled
- **Type:** Text only, Text + Icon, Icon only

In Figma, all these variants live together in a "component set" — a grid showing every combination.

### Auto Layout

Auto Layout is Figma's version of CSS Flexbox. When a frame has Auto Layout, its children are laid out automatically based on direction, spacing, and alignment settings. This is how Figma can show you the exact padding and gap values that should go in your CSS.

---

## Opening the MDT Design System Figma File

The design file is at:
```
figma.com/design/A8iOt3oQHHT20N1mSpxnQ1/Components--Copy-
```

Open it in your browser or Figma desktop app. You'll need to be logged in with a Figma account that has been granted access to the file.

**To bookmark it:** Click the star icon next to the file name in Figma to add it to your Figma home screen.

---

## How the File Is Structured

### Pages

The file uses multiple pages (listed in the left panel at the very top). Common pages include:

- **Components** — the main page with all UI components
- **Tokens** or **Variables** — color palettes, spacing scales, typography styles
- **Playground** — scratch area for exploring designs
- **Archive** — older designs kept for reference

Click on a page name in the left panel to navigate to it.

### The Layers Sidebar

On the left side of the Figma screen, you'll see the Layers panel. This shows the hierarchy of every element on the current page. It's organized like a tree:

```
Page
  Frame: Button Component Set
    Variant: Style=Primary, Size=MD, State=Enabled
    Variant: Style=Primary, Size=MD, State=Hover
    Variant: Style=Secondary, Size=MD, State=Enabled
    ...
```

You can expand items by clicking the triangle next to them.

### Finding the Button Component

1. Open the Components page
2. In the search bar at the top of the layers panel, type "Button"
3. Click on the Button component set in the results
4. The canvas will zoom to show the Button variants

Alternatively, press `Cmd+F` (or `Ctrl+F`) to open a global search and type "Button."

---

## How Variants Are Named in Figma

In Figma, variants are named using a `Property=Value` format. For example:

```
Style=Primary, Type=Text+Icon, Size=MD, State=Enabled
```

This tells you exactly what a variant represents. The names map directly to code props:

| Figma Variant Name | Code Prop |
|-------------------|-----------|
| `Style=Primary` | `variant="primary"` |
| `Style=Secondary` | `variant="secondary"` |
| `Style=Tertiary` | `variant="tertiary"` |
| `Style=Danger` | `variant="danger"` |
| `Style=Ghost` | `variant="ghost"` |
| `Size=SM` | `size="sm"` |
| `Size=MD` | `size="md"` |
| `Size=LG` | `size="lg"` |
| `Size=XL` | `size="xl"` |
| `State=Disabled` | `disabled={true}` |
| `State=Loading` | `loading={true}` |

The convention is lowercase in code even when Figma uses uppercase. Spaces and special characters in Figma variant names are removed or replaced in code.

---

## How to Copy a Figma Node URL — Critical Step

A Figma node URL is a link that points directly to a specific element in the Figma file. You'll use these constantly when asking Claude to implement components.

### Method 1: Right-Click on Any Element

1. Click once on a component (or any element) in the canvas
2. Right-click on it
3. In the context menu, click **Copy link to selection**
4. The URL is now in your clipboard

### Method 2: From the Browser Address Bar

When you click on any element in Figma (in the browser), the URL in the address bar updates to include the node ID:

```
https://www.figma.com/design/A8iOt3oQHHT20N1mSpxnQ1/Components--Copy-?node-id=2022-2455
```

The `node-id=2022-2455` part is what identifies the specific element. You can copy the entire URL from the address bar.

### Example Node URL

```
https://www.figma.com/design/A8iOt3oQHHT20N1mSpxnQ1/Components--Copy-?node-id=2022-2455
```

Breaking it down:
- `A8iOt3oQHHT20N1mSpxnQ1` — the file ID (always the same for this file)
- `Components--Copy-` — the file name (cosmetic, doesn't affect the link)
- `node-id=2022-2455` — the specific element within the file

### When to Use Node URLs

- When asking Claude to implement a component: paste the URL of the component set (not an individual variant)
- When asking Claude to set up Code Connect: paste the URL of the master component
- When reporting a design issue to a teammate: paste the URL so they go to the exact element

---

## How to Use Dev Mode in Figma

Dev Mode is a special view designed for developers. It shows exact CSS values, spacing, and design tokens — much more useful than the default designer view.

### Enabling Dev Mode

Click the **Dev Mode** toggle in the top-right toolbar of Figma. It looks like a `</>` icon.

Keyboard shortcut: `Shift+D`

You'll notice the UI changes — the interface shifts to a developer-focused layout.

### What You Can See in Dev Mode

**When you click on a component:**

- **Dimensions:** Width and height in pixels
- **Fill:** The background color — shown as a token name if tokens are configured (e.g., `--ds-core-black`) or as a hex value
- **Typography:** Font family, size, weight, line height, letter spacing
- **Spacing:** Padding and gap values from Auto Layout
- **Radius:** Border radius values
- **Shadows and borders:** Box shadow and border definitions

**The Inspect Panel (right sidebar in Dev Mode):**

Scroll down in the right panel to see a "Code" section that shows CSS-like values:

```css
/* Example from a Button */
display: flex;
align-items: center;
padding: 8px 16px;
gap: 8px;
border-radius: 4px;
background: var(--ds-brand-primary);
font-family: Inter;
font-size: 14px;
font-weight: 500;
```

These values are what you use when writing your CSS Module file.

**Important:** When Figma shows a hex value like `#0052CC`, look for the corresponding CSS variable in the design tokens. You should use the variable (e.g., `var(--ds-brand-primary)`), not the hardcoded hex color. More on this below.

---

## How to Check Design Tokens in Figma

Design tokens are the named values behind colors, spacing, and typography. In the MDT Design System, tokens are CSS custom properties that start with `--ds-` or `--color-`.

### Finding Tokens in Figma

**Variables panel:**
1. In Figma, click the Variables icon in the right sidebar (it looks like two stacked rectangles or a grid)
2. Or: use Edit → Show Variables Panel
3. You'll see collections like "Colors," "Spacing," "Radius"

**When inspecting an element in Dev Mode:**
If tokens are applied in Figma, the inspect panel will show the token name next to color values. For example:

```
Fill: ds-core-black   #000000
```

This tells you to use `var(--ds-core-black)` in your CSS, not `#000000`.

### Token Name to CSS Variable Mapping

The naming convention is direct:

| Figma Token Name | CSS Variable |
|-----------------|--------------|
| `ds-core-black` | `var(--ds-core-black)` |
| `ds-brand-primary` | `var(--ds-brand-primary)` |
| `ds-neutral-20` | `var(--ds-neutral-20)` |
| `ds-success` | `var(--ds-success)` |
| `ds-warning` | `var(--ds-warning)` |
| `ds-danger` | `var(--ds-danger)` |
| `ds-text-para` | `var(--ds-text-para)` |

The CSS variables are defined in `src/styles/tokens.css` in the codebase. When you need to verify a variable name, open that file.

**Rule:** Always use the CSS variable. Never paste hex values into your CSS.

---

## Naming Conventions for New Components

Consistency in naming makes everything easier — Figma to code to Storybook to ZeroHeight.

### Component Names

- **PascalCase** everywhere: `Button`, `InputField`, `DataTable`, `Badge`, `Modal`
- The Figma component name, the file name, the TypeScript export, and the Storybook title should all match

### Prop Names

- **camelCase** for all props: `variant`, `size`, `isLoading`, `onClick`, `leftIcon`
- Booleans: prefer plain names that read naturally (`disabled`, `loading`, not `isDisabled`, `isLoading`)
- Event handlers: always start with `on`: `onClick`, `onChange`, `onBlur`

### CSS Class Names in .module.css Files

- **camelCase** for multi-word names: `.iconLeft`, `.loadingSpinner`, `.primaryVariant`
- Single words: plain lowercase: `.root`, `.primary`, `.disabled`
- State classes: match the prop name: `.loading`, `.disabled`, `.focused`

### Figma Variant Name to CSS Class Name

| Figma | CSS class |
|-------|-----------|
| `Style=Primary` | `.primary` |
| `Size=MD` | `.md` |
| `Type=Text+Icon` | (use conditional rendering, not a class) |
| `State=Disabled` | `.disabled` or handled via `[disabled]` attribute |

---

## How to Add a New Component to Figma (for Designers)

This section is for designers creating new components that will be implemented in code.

### Steps

1. **Create a frame** for your component (press `F` and draw a frame, or press `A` and choose a frame size)

2. **Design the component** inside the frame

3. **Make it a component:** Select the frame → press `Cmd+Alt+K` (Mac) or `Ctrl+Alt+K` (Windows)
   The frame turns purple with a diamond icon — it's now a Figma component

4. **Name it properly:** In the right panel, give it a PascalCase name matching the code component (e.g., `Badge`)

5. **Add variants:** Click the purple "+" icon next to your component to add variants
   Name variants using the `Property=Value` format:
   ```
   Style=Default, Size=MD, State=Enabled
   ```

6. **Apply design tokens:** For all colors, use Figma variables from the token library (not raw hex values). This ensures the CSS variable names appear in Dev Mode for developers.

7. **Publish to the team library:** In the Assets panel, click the library icon → click "Publish changes"
   Publishing makes the component available for Code Connect and for use in other Figma files.

### Tips for Designer-Developer Handoff

- Write clear variant descriptions in the component's annotation notes
- Make sure Auto Layout is applied correctly so spacing values are accurate
- Use the correct token names for all colors and spacing
- Test the component in both light and dark color modes if applicable

---

## Quick Reference

| Task | What to do in Figma |
|------|---------------------|
| Find a component | Cmd+F → type component name |
| Get node URL | Right-click element → Copy link to selection |
| See CSS values | Enable Dev Mode (Shift+D) → click element |
| Find token names | Dev Mode → inspect panel → look for variable names next to color values |
| See component variants | Click component set → see grid of variants in canvas |
| Check spacing | Dev Mode → hover between elements to see spacing values |
| Check dark mode | In the right panel, switch the color mode variable |

---

Next: [05 — Clone & Run](05-clone-and-run.md) — Download the project and run Storybook on your machine.
