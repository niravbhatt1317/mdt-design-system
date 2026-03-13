# 01 — Tools Explained: What Every Tool Does and Why

This guide explains every tool in the Synapse project. You don't need to understand all of them deeply to get started — but knowing what each one is for helps you understand why things are built the way they are.

---

## 1. Figma

**What it is:** Figma is a browser-based (and desktop) design tool where designers create the visual designs for every component: buttons, inputs, badges, tables, modals, and everything else.

**Why we use it:** Figma is the single source of truth for what components should look like. Before a single line of code is written, the design exists in Figma. Developers reference it to get exact colors, spacing, font sizes, border radii, and states (hover, focused, disabled).

**When you use it:**
- Before implementing a component: open Figma to understand the design
- To copy a Figma node URL (a link to a specific component or frame) that you give to Claude
- To check design tokens (what color variable maps to what visual)
- To see variant names that map to code props

**Where to find it:** `figma.com/design/A8iOt3oQHHT20N1mSpxnQ1/Components--Copy-`

You can use Figma in the browser or download the desktop app from `figma.com/downloads`.

---

## 2. GitHub

**What it is:** GitHub is a website that stores your code in the cloud. Think of it like Google Drive, but designed specifically for code. Every change is tracked, every version is saved, and multiple people can work on the same project without overwriting each other's work.

**Why we use it:** GitHub is where the Synapse source code lives. It's also where automatic deployments are triggered — every time code is pushed to GitHub, a process automatically builds and publishes the Storybook documentation site.

**When you use it:**
- To view the codebase in your browser
- To see pull requests (proposed changes) from teammates
- To check deployment status in the "Actions" tab
- To file issues (bug reports, feature requests)

**Where to find it:** `github.com/niravbhatt1317/synapse-design-system`

---

## 3. Git

**What it is:** Git is a command-line program you run on your own computer. It tracks every change you make to files and lets you sync those changes up to GitHub.

**Why we use it:** Git is how your local code changes travel to GitHub. You make changes on your computer, tell Git to record them (commit), then tell Git to send them to GitHub (push). Git also lets you undo mistakes, work on separate features in parallel (branches), and merge changes from teammates.

**When you use it:**
- After making any changes: `git add`, `git commit`, `git push`
- To download the project for the first time: `git clone`
- To get latest changes from teammates: `git pull`

**Analogy:** Git is the postal service. GitHub is the post office where packages are stored. You use the postal service (Git) to send packages to and receive packages from the post office (GitHub).

---

## 4. Node.js and npm

**What they are:** Node.js is a program that lets your computer run JavaScript outside of a browser. npm (Node Package Manager) is a tool that comes with Node.js and lets you install open-source JavaScript libraries (packages) from the internet.

**Why we use them:**
- Node.js runs all the build tools: Vite, Storybook, TypeScript compiler
- npm installs all the project's dependencies (React, Storybook, Vite, etc.) in one command
- npm also publishes the design system as a package others can install

**When you use them:**
- When setting up the project: `npm install`
- When running Storybook: `npm run storybook`
- When building the library: `npm run build:lib`
- When publishing a new version: `npm publish`

**Where to find them:** `nodejs.org` — but we recommend installing via nvm (see [02 — Machine Setup](02-machine-setup.md))

---

## 5. React

**What it is:** React is a JavaScript library (created by Meta/Facebook) for building user interfaces. Instead of writing raw HTML, you write components — reusable building blocks like `<Button>` or `<Badge>` — that React renders into actual HTML in the browser.

**Why we use it:** React is the most widely used UI framework in the industry. Companies building products in React can install our design system package and use its components directly. React's component model is a perfect fit for a design system.

**When you use it:** Every component file (e.g., `Button.tsx`, `Badge.tsx`) is a React component.

**Key concept:** A React component is just a function that returns JSX (HTML-like syntax). Example:

```tsx
function Badge({ label }) {
  return <span className="badge">{label}</span>
}
```

---

## 6. TypeScript

**What it is:** TypeScript is JavaScript with types added. A "type" describes what kind of data a variable holds — is it a string? A number? One of a specific set of values like `'primary' | 'secondary'`?

**Why we use it:** TypeScript catches mistakes before your code runs. If you try to pass `size="huge"` to a Button that only accepts `'sm' | 'md' | 'lg' | 'xl'`, TypeScript will show an error in your editor immediately — no need to open the browser and discover the bug at runtime.

TypeScript also powers autocomplete in VS Code: when you type `<Button `, your editor suggests all valid props and their types.

**When you use it:** All source files use `.tsx` (TypeScript + JSX) or `.ts`. You write TypeScript without even thinking about it — VS Code handles the feedback loop.

**File extensions:**
- `.ts` — TypeScript without JSX (e.g., `tokens/colors.ts`)
- `.tsx` — TypeScript with JSX (e.g., `Button.tsx`, `Button.stories.tsx`)

---

## 7. Vite

**What it is:** Vite is a build tool. It takes your TypeScript and CSS source files and bundles them into optimized output files that can be published as an npm package.

**Why we use it:** Vite is extremely fast. It uses modern browser features during development (instant hot reload) and produces highly optimized bundles for production. It supports "library mode," which is exactly what a design system needs — output ESM (modern JavaScript modules), CJS (older CommonJS format), and TypeScript type definitions all at once.

**When you use it:** Mostly behind the scenes when you run `npm run build:lib`. You also benefit from it when running Storybook — Vite powers Storybook's dev server.

**What it outputs:** After running `npm run build:lib`, the `dist/` folder contains:
- `dist/mdt-design-system.es.js` — ESM format (for modern bundlers like Webpack/Vite/Rollup)
- `dist/mdt-design-system.umd.js` — UMD/CJS format (for older tools)
- `dist/mdt-design-system.css` — all component styles
- `dist/index.d.ts` — TypeScript type definitions

---

## 8. CSS Modules

**What it is:** CSS Modules is a technique where each component's CSS file is scoped to that component only. The class names are automatically transformed to be unique (e.g., `.root` becomes `.Button_root__x8fAk`), so there's no risk of one component's styles accidentally affecting another.

**Why we use it:** In a large design system with dozens of components, name collisions are a real problem. If both Button and Badge both have a class called `.root`, one would overwrite the other. CSS Modules eliminates this problem entirely without needing a complex naming convention like BEM.

**How it works:**

```css
/* Button.module.css */
.root { padding: 8px 16px; }
.primary { background: var(--color-primary); }
```

```tsx
// Button.tsx
import styles from './Button.module.css'
// styles.root = "Button_root__x8fAk" (auto-generated unique name)
// styles.primary = "Button_primary__3jKqP"

<button className={`${styles.root} ${styles.primary}`}>Click</button>
```

**Rule for this project:** Always use `.module.css` files. Never use Tailwind, inline styles, or global class names in components.

---

## 9. Storybook

**What it is:** Storybook is a development tool that runs a local website showing all your components in isolation. Each component has one or more "stories" — examples showing different configurations (variants, states, sizes).

**Why we use it:**
- Develop components in isolation without building a whole app
- Document components automatically
- Test all visual states (loading, disabled, hover) without writing test code
- Share a live preview with designers and stakeholders (via GitHub Pages)

**When you use it:**
- During development: `npm run storybook` opens it at `http://localhost:6006`
- The deployed version (auto-updated on every push) is at `synapse.heynirav.com`

**Key files:**
- `src/components/Button/Button.stories.tsx` — stories for the Button component
- `.storybook/main.ts` — Storybook configuration
- `.storybook/preview.ts` — global decorators (applies global styles, theme)
- `.storybook/manager.ts` — toolbar customization (the ZeroHeight button)

---

## 10. ZeroHeight

**What it is:** ZeroHeight is a documentation platform designed specifically for design systems. It's where designers and developers write guidelines for how and when to use each component — not just code docs, but human-readable principles.

**Why we use it:** README files and Storybook are great for developers, but designers, product managers, and other stakeholders need friendlier documentation. ZeroHeight lets you embed live Storybook stories, Figma frames, and write rich text guidelines all in one place.

**When you use it:**
- When adding a new component: create a ZeroHeight page for it with guidelines
- When reviewing design guidelines: visit `motadata.zeroheight.com`
- After publishing a new npm version: update the CDN URL in ZeroHeight settings

**Where to find it:** `motadata.zeroheight.com`

---

## 11. Claude Code

**What it is:** Claude Code is Anthropic's AI coding assistant that runs directly in your terminal. Unlike browser-based AI chat tools, Claude Code understands your entire codebase — it can read your files, make edits, run commands, and implement features end-to-end.

**Why we use it:** Implementing a component from Figma involves several steps: reading the design, writing TypeScript, writing CSS, writing Storybook stories, and wiring up exports. Claude Code can do all of this from a single Figma URL — especially when connected to Figma via MCP (see below).

**When you use it:**
- To implement a new component from a Figma design
- To write or update Storybook stories
- To refactor code following project conventions
- To set up Figma Code Connect for a component

**How to run it:** `claude` in your terminal from the project folder.

---

## 12. Figma MCP (Model Context Protocol)

**What it is:** MCP (Model Context Protocol) is an open standard that lets AI tools like Claude connect to external services. The Figma MCP is a bridge that lets Claude read your Figma files directly — designs, layouts, colors, spacing, component names, everything.

**Why we use it:** Without MCP, you'd have to manually describe your Figma design to Claude in words. With MCP, you paste a Figma URL and Claude can see the design itself — the actual pixels, measurements, colors, and structure.

**How it works:**
1. You install the Claude Code plugin in Figma desktop
2. The plugin runs a tiny local server on your computer (`http://127.0.0.1:3845/sse`)
3. Claude Code connects to that server
4. When you paste a Figma URL, Claude calls tools like `get_design_context` and `get_screenshot` to read the design

**When you use it:** Automatically when you paste a Figma URL to Claude and the MCP is configured.

---

## 13. Figma Code Connect

**What it is:** Figma Code Connect is a feature that links Figma components to their code counterparts. You write a short configuration file that says "the Button component in Figma corresponds to `<Button variant="primary" size="md">` in code."

**Why we use it:** Code Connect powers two important things:
1. In Figma Dev Mode: developers see real code snippets using your actual components (not generic HTML)
2. In Figma Make (AI code generation): when Figma's AI generates a screen, it uses YOUR Button component from the npm package instead of generating a generic button from scratch

**When you use it:** After implementing a new component in code, you set up Code Connect so the Figma and code sides are linked.

---

## 14. npm Package (@niravbhatt/synapse-design-system)

**What it is:** The npm package is the published, installable version of the design system. Any React project can install it with `npm install @niravbhatt/synapse-design-system` and immediately use all the components.

**Why we use it:** Publishing to npm is how the design system is distributed. Rather than copying component files into every project, teams install the package once and get updates by bumping the version number.

**What it contains:**
- All components (Button, and more to come)
- CSS file with all component styles and CSS custom properties
- TypeScript type definitions for full autocomplete support

**Where to find it:** `npmjs.com/package/@niravbhatt/synapse-design-system`

---

## 15. GitHub Actions

**What it is:** GitHub Actions is an automation platform built into GitHub. You write workflow files (in `.github/workflows/`) that describe what to do when certain events happen — like pushing code to the main branch.

**Why we use it:** Every time you push code to the `main` branch, GitHub Actions automatically:
1. Checks out the code
2. Installs dependencies
3. Builds the Storybook static site
4. Deploys it to GitHub Pages

This means the live Storybook documentation at `synapse.heynirav.com` is always up to date with the latest code, with no manual steps required.

**When you use it:** It runs automatically. You can monitor it at `github.com/niravbhatt1317/synapse-design-system/actions`.

---

## How They All Connect

Here is the data flow across all the tools in this project:

```
DESIGN SIDE
-----------
Figma (source of truth for visuals)
  |
  | [Figma MCP reads design via local plugin]
  v
Claude Code (AI assistant in your terminal)
  |
  | [generates code following project rules]
  v
Your Local Machine
  |
  +-- src/components/Badge/
  |     Badge.tsx          (React + TypeScript)
  |     Badge.module.css   (CSS Modules + CSS variables)
  |     Badge.stories.tsx  (Storybook stories)
  |     index.ts           (re-exports)
  |
  | [npm run storybook]
  v
Storybook (local dev server at localhost:6006)
  |
  | [you verify it looks right]
  v
Git (tracks your changes on your machine)
  |
  | [git push origin main]
  v
GitHub (cloud code storage)
  |
  | [triggers GitHub Actions workflow]
  v
GitHub Actions (automated pipeline)
  |
  +-- [builds Storybook] --> GitHub Pages
  |     synapse.heynirav.com
  |
  | [you run: npm run build:lib + npm publish]
  v
npm Registry
  |
  npmjs.com/package/@niravbhatt/synapse-design-system
  |
  | [teams install: npm install @niravbhatt/synapse-design-system]
  v
Consumer Projects (any React app that uses the design system)

DOCUMENTATION SIDE
------------------
Storybook (live component sandbox)   --> ZeroHeight (embeds stories + Figma frames)
Figma (design specs)                 --> ZeroHeight (embedded Figma frames)
Code Connect (links Figma to code)   --> Figma Dev Mode (shows real code snippets)
```

---

## Summary Table

| Tool | Category | Used by | Runs where |
|------|----------|---------|------------|
| Figma | Design | Designers + Developers | Browser / Desktop app |
| GitHub | Code storage | Everyone | github.com |
| Git | Version control | Developers | Your terminal |
| Node.js / npm | Runtime + package manager | Developers | Your machine |
| React | UI framework | Developers | Browser (runtime) |
| TypeScript | Type-safe JavaScript | Developers | Editor + build step |
| Vite | Build tool | Developers | Your machine |
| CSS Modules | Scoped styling | Developers | Build step |
| Storybook | Component docs | Everyone | Browser (local + Pages) |
| ZeroHeight | Design guidelines | Everyone | motadata.zeroheight.com |
| Claude Code | AI coding assistant | Developers | Your terminal |
| Figma MCP | AI-to-Figma bridge | Developers | Local plugin server |
| Figma Code Connect | Design-to-code link | Developers | Figma Dev Mode |
| npm package | Published library | Consumer teams | npm registry |
| GitHub Actions | CI/CD automation | Automated | GitHub servers |

---

Next: [02 — Machine Setup](02-machine-setup.md) — Get your Mac ready to work on this project.
