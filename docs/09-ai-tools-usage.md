# 09 — AI Tools Usage: How to Use AI Tools With This Design System

This guide covers how to use AI tools effectively with the Synapse: Claude Code for implementing components, Figma Make for generating screens, and how to give any AI tool the context it needs to work with the package.

---

## Section 1: Claude Code

### How CLAUDE.md Works

Every time you start Claude Code in the project folder, it reads `CLAUDE.md` automatically. This file is the project's "AI briefing" — it tells Claude:

- The project's folder structure
- Required patterns (forwardRef, CSS Modules, CSS variable usage)
- What NOT to do (no Tailwind, no hardcoded hex, no icon packages)
- How to export components
- How to write Storybook stories
- Links to related documentation

Because of this, you don't have to explain the project conventions every time. You can start a fresh Claude session and immediately ask it to implement a component, and it will already know all the rules.

If you ever need to update the project rules (e.g., you add a new naming convention), edit `CLAUDE.md` and Claude will follow the new rules from the next session onward.

### How to Ask Claude to Implement a Figma Component

**Setup (do this before asking Claude):**
1. Open the Figma desktop app
2. Open the MDT Figma file
3. Make sure the Claude Code plugin is running in Figma (Plugins → Claude Code)
4. Have Storybook running in another terminal: `npm run storybook`

**The workflow:**

1. In Figma, navigate to the component you want to implement
2. Select the component set (the outer container, not an individual variant)
3. Right-click → Copy link to selection
4. In your terminal, start Claude: `claude`
5. Paste your request with the URL:

```
Implement this Figma component: https://www.figma.com/design/A8iOt3oQHHT20N1mSpxnQ1/Components--Copy-?node-id=2022-2580

Create all four files:
- src/components/Badge/Badge.tsx
- src/components/Badge/Badge.module.css
- src/components/Badge/index.ts
- src/components/Badge/Badge.stories.tsx

Then add the export to src/index.ts.
```

**What Claude does with this:**
1. Calls `get_design_context` to read the Figma component structure and variants
2. Calls `get_screenshot` to see the visual design
3. Reads your existing components (e.g., `Button.tsx`) to match the code style
4. Reads `src/styles/tokens.css` to find available CSS variable names
5. Generates all four files following the project conventions

**Reviewing Claude's output:**

Before Claude writes any files, it shows you what it's going to do. Review each file:
- Are CSS variables used? (Look for `var(--ds-*)` — no hardcoded hex should appear)
- Does the component use `forwardRef`?
- Does it have `displayName`?
- Do the variant names match what's in Figma?
- Are all sizes represented?

If anything looks wrong, tell Claude before it writes the files:
```
"The success variant background should be var(--ds-success-light), not var(--ds-success).
Also, the component should accept leftIcon and rightIcon props as ReactNode."
```

### How Figma MCP Works Internally

When you paste a Figma URL, Claude uses these Figma MCP tools:

**`get_design_context`:** Returns the component tree, variant properties, spacing, colors, and typography as structured data. This is how Claude knows "this component has variants: Default, Success, Warning, Danger" and "the padding is 4px 10px."

**`get_screenshot`:** Returns a visual rendering of the component. Claude can see the actual design, not just numbers. This helps with things that are hard to express numerically, like visual weight, alignment, and overall aesthetic.

**`get_variable_defs`:** Returns the design token variables defined in the Figma file. This is how Claude maps Figma token names to CSS variable names.

### Useful Prompts for Claude Code

**Implement a new component:**
```
Implement this Figma component following the project patterns:
[Figma node URL]

Create Badge.tsx, Badge.module.css, index.ts, and Badge.stories.tsx
in src/components/Badge/.
```

**Set up Figma Code Connect:**
```
Set up Figma Code Connect for the Badge component.
Figma component URL: [Figma node URL]
Code component: src/components/Badge/Badge.tsx
```

**Add a story for a specific state:**
```
Add a Loading story to Button.stories.tsx that shows the button
in its loading state with the spinner visible.
```

**Add dark mode support:**
```
Review the Badge component against this Figma dark mode design:
[Figma node URL]
Add dark mode CSS custom property overrides to Badge.module.css.
```

**Review an implementation against the design:**
```
Review my Badge component implementation against this Figma design:
[Figma node URL]
Check that colors, spacing, and typography match exactly.
```

**Update a component to add a new prop:**
```
Add an 'icon' prop to the Badge component (type: ReactNode, optional).
When provided, render the icon before the children with 4px gap.
Update the stories to show the icon usage.
```

**Fix a TypeScript error:**
```
I'm getting this TypeScript error in Badge.tsx. What's wrong and how do I fix it?
[paste the error message]
```

**Write a CONTRIBUTING guide:**
```
Read the existing components and write a CONTRIBUTING.md that explains
how to add a new component following the project patterns.
```

### What Claude Code Cannot Do

These tasks require human action — Claude cannot do them for you:

| Task | Why | How to do it yourself |
|------|-----|-----------------------|
| Publish to npm | Requires your npm credentials | `npm publish --access public --ignore-scripts` |
| Push to GitHub | Requires your git credentials | `git push origin main` |
| Access private Figma files | Requires Figma account with file access | Manually grant Claude's plugin access |
| Create a GitHub PR | Requires git credentials | `gh pr create` |
| Update ZeroHeight | Requires ZeroHeight account login | Log in to motadata.zeroheight.com |

Claude can prepare everything and tell you exactly what commands to run — it just can't run the authenticated ones itself.

---

## Section 2: Figma Make

### What Figma Make Is

Figma Make is Figma's built-in AI feature that generates React code from your designs. You describe what you want or select a Figma frame, and it writes JSX code.

Without Code Connect, Figma Make generates generic React code — custom button elements, hardcoded styles, ad-hoc class names. Not very useful.

With Code Connect, Figma Make knows which Figma components map to which code components. So instead of generating:

```tsx
// What Figma Make generates WITHOUT Code Connect
<button style={{ backgroundColor: '#0052CC', color: 'white', padding: '8px 16px' }}>
  Submit
</button>
```

It generates:

```tsx
// What Figma Make generates WITH Code Connect
import { Button } from '@niravbhatt/synapse-design-system'

<Button variant="primary" size="md">Submit</Button>
```

This is dramatically better. The second version uses your actual design system components, respects the npm package, and will automatically pick up style updates when you publish a new version.

### Setting Up Code Connect

Code Connect must be configured for each component. The configuration lives in the component's directory (e.g., `src/components/Button/Button.figma.tsx`).

Ask Claude to set it up:
```
Set up Figma Code Connect for the Button component.
Figma component URL: https://www.figma.com/design/A8iOt3oQHHT20N1mSpxnQ1/...?node-id=XXXX-YYYY
```

Claude will create the Code Connect configuration file and run the `figma connect publish` command to link the Figma component to the code component.

### Using Figma Make

1. In Figma, select a frame or screen you want to generate code for
2. In the right panel, click the "Make" tab (or look for the AI icon)
3. A code generation panel appears

**Starter prompt — paste this at the beginning of every Figma Make session:**

```
Use the @niravbhatt/synapse-design-system package for all UI components.

Setup:
npm install @niravbhatt/synapse-design-system

Import styles in your entry file (e.g., main.tsx or App.tsx):
import '@niravbhatt/synapse-design-system/styles'

Available components:
- Button: variant (primary/secondary/tertiary/danger/ghost), size (sm/md/lg/xl),
  loading (boolean), disabled (boolean), leftIcon (ReactNode), rightIcon (ReactNode)

Component documentation: https://synapse.heynirav.com

Rules:
- Always import components from @niravbhatt/synapse-design-system
- Use CSS variables (var(--ds-*)) for any custom styling — never hardcode hex values
- Use CSS Modules (.module.css) for custom component styles
- Never use Tailwind
```

**Reviewing Figma Make's output:**

Check that the generated code:
- Imports `Button` from `@niravbhatt/synapse-design-system` (not a local file)
- Uses the correct `variant` prop values (primary, secondary, etc.)
- Doesn't include hardcoded hex colors
- Doesn't generate duplicate button components

If Figma Make doesn't use your design system components, check that Code Connect is set up for those components and published.

---

## Section 3: Using the Package in Any AI Tool

### The Problem

AI tools don't automatically know about your design system. If you open Cursor, v0, Lovable, or ChatGPT and ask it to build a form, it will generate generic code — maybe using Material UI, or Tailwind, or just raw HTML. It won't know your `@niravbhatt/synapse-design-system` package exists.

### The Solution: A Context Block

Paste this block at the start of every session with any AI tool when you want it to use the design system:

```
I'm building a React app using a design system package called @niravbhatt/synapse-design-system.

SETUP:
npm install @niravbhatt/synapse-design-system

In your entry file (main.tsx / App.tsx), add:
import '@niravbhatt/synapse-design-system/styles'

AVAILABLE COMPONENTS:
[paste the contents of llms.txt from the repo here]

RULES:
- Always use components from @niravbhatt/synapse-design-system when one is available
- For custom styles, use CSS Modules (.module.css) — never Tailwind
- Use CSS variables (var(--ds-*)) — never hardcode hex colors
- Import: import { Button, Badge } from '@niravbhatt/synapse-design-system'

DOCUMENTATION: https://synapse.heynirav.com
```

### Where to Find llms.txt

The file `llms.txt` in the project root is a machine-readable API reference for the design system. It lists all components, their props, types, and examples in a format optimized for AI consumption.

Open it with:
```bash
cat llms.txt
```

Or in VS Code:
```bash
code llms.txt
```

Copy the entire contents and paste it into the context block above where it says `[paste the contents of llms.txt here]`.

### Keeping Context Updated

As you add new components to the package:
1. Update `llms.txt` with the new component's API
2. Use the updated `llms.txt` contents in your AI context blocks

Some teams create a shortcut — a note in Notion or a snippet in their code editor — with the full context block ready to paste.

### Tool-Specific Tips

**Cursor:**
Create a `.cursorrules` file in the project root with the context block. Cursor reads this automatically for every session in that project.

**v0 (Vercel):**
Paste the context block in the first message of every session. v0 will use the package if you tell it to, but won't discover it on its own.

**Lovable:**
Paste the context block as a project instruction. Lovable has a "Project instructions" field — add the context there once and it applies to all sessions.

**ChatGPT / Claude.ai (browser):**
These don't have project memory by default. Paste the context block in every new conversation where you need the design system.

---

## Section 4: Common Prompts That Work Well

These prompt templates are tested and produce good results:

**1. Implement a complete component from Figma:**
```
Implement the [ComponentName] component from this Figma design: [URL]
Follow all patterns in CLAUDE.md. Create all four files in src/components/[ComponentName]/.
```

**2. Add dark mode support to a component:**
```
Add dark mode support to [ComponentName].module.css.
The component currently has these variants: [list variants].
Use the dark mode CSS tokens from src/styles/tokens.css.
Wrap dark mode rules in a [data-theme="dark"] or .dark selector.
```

**3. Add a new prop to an existing component:**
```
Add a [propName] prop to [ComponentName].
Type: [type — e.g., ReactNode, boolean, 'sm' | 'md']
Default value: [default]
Update the component, CSS (if needed), and stories to include this prop.
```

**4. Write Storybook stories for all states:**
```
Review the [ComponentName] component and write comprehensive Storybook stories.
Cover: all variants, all sizes, disabled state, loading state (if applicable),
with icon, without icon. Use the exact story structure from Button.stories.tsx.
```

**5. Audit a component against Figma:**
```
Compare my [ComponentName] implementation with this Figma design: [URL]
List any differences in: colors, spacing, typography, border radius.
Suggest specific CSS variable replacements for any discrepancies.
```

**6. Set up Figma Code Connect:**
```
Set up Figma Code Connect for [ComponentName].
Figma URL: [URL]
Map each Figma variant to the corresponding React prop value.
```

**7. Generate a screen using design system components:**
```
Generate a [describe the screen, e.g., "login form"] using only components
from @niravbhatt/synapse-design-system. Use Button, InputField, Badge as appropriate.
Import styles with: import '@niravbhatt/synapse-design-system/styles'
```

**8. Review code for design system compliance:**
```
Review this component for compliance with the design system rules:
[paste your component code]

Check:
- Are CSS Modules used (not Tailwind or inline styles)?
- Are CSS variables used (no hardcoded hex)?
- Is forwardRef used?
- Is displayName set?
- Are all props typed?
```

**9. Fix a broken build:**
```
The build is failing with this error:
[paste error output]

Here's the relevant file:
[paste file content]

What's wrong and how do I fix it?
```

**10. Update documentation after adding a component:**
```
I just added the [ComponentName] component. Help me:
1. Write the ZeroHeight Guidelines tab content (When to use, When not to use, Best practices)
2. Write the props table for the ZeroHeight Code tab
3. Write a usage example for the Code tab
```

---

## Tips for Getting Better Results

**Be specific about constraints:**
Instead of "implement a Badge component," say "implement a Badge component — it should be a `<span>` element, use forwardRef, support variants: default/success/warning/danger, sizes: sm/md, and follow the patterns in Button.tsx."

**Provide reference points:**
"Follow the same pattern as Button.tsx" gives the AI a concrete example to model after.

**Iterate, don't restart:**
If Claude generates something mostly right but with a small mistake, say "change the success background from var(--ds-success) to var(--ds-success-light)" rather than starting over.

**Check the output before accepting:**
Claude shows you the code before writing it. Read the CSS for hardcoded colors. Read the TypeScript for correct prop types. It's much easier to catch issues here than after the files are written.

**Use `/clear` to reset context:**
In Claude Code, type `/clear` to start a fresh conversation while keeping the project context from CLAUDE.md. Useful when a conversation has gone off track.

---

Next: [10 — Quick Reference](10-quick-reference.md) — All URLs, commands, and rules in one place.
