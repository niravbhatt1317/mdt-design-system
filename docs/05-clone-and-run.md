# 05 — Clone & Run: Getting the Project Running on Your Machine

This guide walks you through downloading the MDT Design System codebase and running it locally. By the end, you'll have Storybook running in your browser showing all the components.

**Prerequisites:** Complete [02 — Machine Setup](02-machine-setup.md) before this guide. You need Git, Node.js 20, and npm installed.

---

## Step 1: Prerequisites Check

Before cloning, run these quick checks to make sure everything is ready:

```bash
node --version
# Must show: v20.x.x or newer. If it shows v16 or v18, run: nvm use 20

npm --version
# Must show: 10.x.x or newer

git --version
# Must show: git version 2.x.x

gh auth status
# Must show: Logged in to github.com as [your-username]
# If not: run gh auth login first
```

All four must pass before continuing.

---

## Step 2: Clone the Repository

"Cloning" means downloading the entire project from GitHub to your computer. Run:

```bash
git clone https://github.com/niravbhatt1317/mdt-design-system.git
```

Expected output:
```
Cloning into 'mdt-design-system'...
remote: Enumerating objects: 247, done.
remote: Counting objects: 100% (247/247), done.
remote: Compressing objects: 100% (142/142), done.
Receiving objects: 100% (247/247), 1.23 MiB | 3.45 MiB/s, done.
Resolving deltas: 100% (89/89), done.
```

This creates a new folder called `mdt-design-system` in your current directory. Navigate into it:

```bash
cd mdt-design-system
```

To open the project in VS Code:
```bash
code .
```

(The dot means "open the current folder.")

---

## Step 3: Install Dependencies

The project depends on many packages (React, Storybook, Vite, TypeScript, etc.). These are listed in `package.json` but not included in the repository — you download them yourself.

Run:
```bash
npm install
```

Expected output (takes 1–3 minutes on first run):
```
npm warn deprecated ...  (various deprecation warnings — these are normal, ignore them)
added 1247 packages, and audited 1248 packages in 52s
found 0 vulnerabilities
```

This creates a `node_modules/` folder in the project. This folder is large (often 200–600 MB) and is never committed to Git — it's listed in `.gitignore`.

**What npm install actually does:**
1. Reads `package.json` to find all required packages
2. Reads `package-lock.json` to find the exact versions to install
3. Downloads each package from the npm registry
4. Places them in `node_modules/`

---

## Step 4: Run Storybook Locally

Storybook is your development environment. It shows all components in an interactive browser-based sandbox.

```bash
npm run storybook
```

Expected output:
```
@storybook/cli v8.x.x

info => Starting manager..
info => Starting preview..
info Using tsconfig: /path/to/mdt-design-system/tsconfig.json
info Addon-docs: using MDX 3
info => Loading presets
✓ Storybook 8.x.x for vite-react started
  Local:            http://localhost:6006/
  On your network:  http://192.168.1.x:6006/
```

Your default browser will open automatically at `http://localhost:6006`. If it doesn't open automatically, open your browser and go to that URL manually.

---

## Step 5: Tour of the Storybook UI

Here's what you'll see when Storybook opens:

### Left Sidebar — Component Tree

The left panel shows all your components organized in a tree:

```
Components
  Button
    Playground
    All Variants
    All Sizes
    ...
```

Click "Button" to expand it, then click "Playground" to open that story. The component renders in the center of the screen.

### Canvas Area (Center)

The large area in the middle is the canvas. It shows the live-rendered component. What you see here is exactly how the component will look in a real application.

### Controls Panel (Bottom)

The bottom panel has several tabs:

**Controls tab:** This shows all the props of the component as interactive form fields. Change the dropdown for `variant` to "secondary" — the component in the canvas updates instantly. Change `size` to "xl" — the button grows. This is how you test all combinations without writing code.

**Actions tab:** Shows events that have fired. If the button has an `onClick` prop, every time you click the button in the canvas, a new entry appears here showing what was passed to the handler.

**Docs tab:** Auto-generated documentation for the component. Shows the props table with types and descriptions, plus all the stories rendered together on one page.

### Viewport Toggle (Toolbar)

In the top toolbar, there's a phone/tablet/desktop icon. Click it to switch between viewport sizes and test how the component looks at different screen widths.

### Theme Switcher

The toolbar has a sun/moon or light/dark toggle (depending on how it's labeled). Switching it changes the background and applies the dark mode CSS variables. Every component should look correct in both modes.

### Background Toggle

There's also a background color selector that lets you test components against different background colors — useful for checking that a component with a white background is actually visible.

### The ZeroHeight Button

In the top right of the toolbar, there's a button labeled "ZeroHeight" with a small arrow icon. Clicking it opens `motadata.zeroheight.com` in a new tab — the human-readable design guidelines site.

---

## Step 6: Understand the Project Structure

Now that Storybook is running, take a moment to understand where things live. Open VS Code (`code .` in the terminal) and look at the folder structure:

```
mdt-design-system/
  src/
    components/
      Button/
        Button.tsx           The component's React code
        Button.module.css    The component's styles (scoped, uses CSS variables)
        index.ts             Re-exports Button for clean imports
        Button.stories.tsx   Storybook stories (all the examples)
    tokens/
      colors.ts              Color token values as JS constants
      spacing.ts             Spacing scale as JS constants
      index.ts               Re-exports all tokens
    styles/
      tokens.css             CSS custom properties (--ds-*, --color-*)
                             This file is included in the npm package
      global.css             Adds Inter font + imports tokens.css
                             Used only in Storybook, NEVER in components
    index.ts                 The library's main export file — lists all exports
  .storybook/
    main.ts                  Storybook build configuration
    preview.ts               Global decorators (applies global.css, adds theme)
    manager.ts               Storybook UI customization (the ZeroHeight button)
  .github/
    workflows/
      deploy-storybook.yml   GitHub Actions workflow for auto-deployment
  dist/                      Built output (don't edit — generated by npm run build:lib)
  CLAUDE.md                  Claude Code's project briefing
  llms.txt                   Machine-readable API reference for AI tools
  CONTRIBUTING.md            Contribution guidelines
  package.json               Project metadata and scripts
  vite.config.ts             Vite configuration (library build settings)
  tsconfig.json              TypeScript configuration
```

### Key Rule About global.css

The file `src/styles/global.css` imports the Inter font from Google Fonts and the CSS tokens. This file is imported in `.storybook/preview.ts` so Storybook has access to all CSS variables and the correct font.

**Critical:** Never import `global.css` inside a component file. Components should only import their own `*.module.css` file. The fonts and global styles are Storybook's responsibility, not the component's responsibility.

---

## Step 7: Build the npm Package

The "library build" bundles all your source files into the distributable `dist/` folder — the files that get published to npm.

```bash
npm run build:lib
```

Expected output:
```
vite v5.x.x building for production...
transforming...
✓ 8 modules transformed.
rendering chunks...
✓ built in 1.23s

dist/mdt-design-system.css         5.23 kB │ gzip:  1.84 kB
dist/mdt-design-system.es.js      18.45 kB │ gzip:  5.12 kB
dist/mdt-design-system.umd.js     12.34 kB │ gzip:  4.21 kB
dist/index.d.ts                   generated
```

After building, the `dist/` folder contains:
- `dist/mdt-design-system.es.js` — ESM format (for Vite, Webpack 5, Rollup)
- `dist/mdt-design-system.umd.js` — UMD/CommonJS format (for older tools)
- `dist/mdt-design-system.css` — all component styles bundled together
- `dist/index.d.ts` — TypeScript type definitions (enables autocomplete in consumer projects)

You only need to run this when you want to publish a new npm version. During normal development, just use Storybook.

---

## Common Errors and Fixes

### Port 6006 is already in use

If something else is running on port 6006:

```
Error: listen EADDRINUSE: address already in use :::6006
```

Run Storybook on a different port:
```bash
npm run storybook -- --port 6007
```

Then open `http://localhost:6007` in your browser.

### Node version is too old

If Storybook fails with cryptic errors about module formats or features, your Node version might be too old:

```bash
node --version  # if this shows v16 or v18...
nvm use 20      # switch to Node 20
npm run storybook  # try again
```

### "Cannot find module" or "Module not found" errors

Your node_modules might be corrupted or incomplete. The nuclear fix:

```bash
rm -rf node_modules
npm install
```

This deletes all installed packages and reinstalls them from scratch. Takes 2–3 minutes.

### TypeScript errors showing in VS Code

Red squiggles in VS Code are TypeScript errors. Look at the bottom status bar — if there's a number next to the error icon, click it to open the Problems panel and see all errors.

TypeScript errors will also appear when you run `npm run build:lib`. Common causes:
- Missing prop types (you added a prop but didn't declare it in the interface)
- Wrong type (passing a `number` where a `string` is expected)
- Missing export (you forgot to add a component to `src/index.ts`)

### Storybook shows a blank white canvas

This usually means the component threw a JavaScript error. Open your browser's developer tools (`Cmd+Option+I`), go to the Console tab, and look for red error messages.

### npm install fails with "ENOTFOUND registry.npmjs.org"

You're not connected to the internet, or your network blocks npm. Check your internet connection.

---

## Verifying Everything Works

After completing all steps, run through this checklist:

- [ ] `http://localhost:6006` opens in browser
- [ ] Button component appears in left sidebar
- [ ] Clicking "Playground" story shows a live button
- [ ] Changing `variant` in Controls changes the button's appearance
- [ ] Toggling dark mode changes the button's colors
- [ ] `npm run build:lib` completes without errors
- [ ] A `dist/` folder now exists with the built files

If all boxes are checked, you're ready to start contributing.

---

## Next Steps

Now that the project is running, you have two options depending on what you're about to do:

- To set up the Figma-to-Claude connection: [03 — Claude Code Setup](03-claude-code-setup.md)
- To start implementing a new component: [06 — Implement a Component](06-implement-component.md)
- To understand how to publish changes: [07 — Publish & Deploy](07-publish-and-deploy.md)
