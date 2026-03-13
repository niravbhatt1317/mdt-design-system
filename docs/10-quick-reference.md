# 10 — Quick Reference: Everything in One Place

This document is a single-page reference for the most common URLs, commands, rules, and file locations. Bookmark it.

---

## All URLs

| Resource | URL |
|----------|-----|
| GitHub repository | `github.com/niravbhatt1317/mdt-design-system` |
| GitHub Actions (CI/CD) | `github.com/niravbhatt1317/mdt-design-system/actions` |
| Storybook (live docs) | `synapse.heynirav.com` |
| npm package | `npmjs.com/package/@niravbhatt/mdt-design-system` |
| ZeroHeight guidelines | `motadata.zeroheight.com` |
| Figma design file | `figma.com/design/A8iOt3oQHHT20N1mSpxnQ1/Components--Copy-` |
| Storybook local | `http://localhost:6006` |

---

## All Commands

### Development

```bash
# Run Storybook locally (main development workflow)
npm run storybook

# Run Storybook on a different port if 6006 is busy
npm run storybook -- --port 6007

# Build the npm package (creates dist/ folder)
npm run build:lib

# Build Storybook static site (creates storybook-static/)
npm run build-storybook
```

### Git (Version Control)

```bash
# See what files have changed
git status

# See the actual changes in changed files
git diff

# Stage specific files for commit
git add src/components/Badge/
git add src/index.ts

# Stage all changed files
git add .

# Commit staged changes with a message
git commit -m "feat: add Badge component"

# Push to GitHub (triggers Storybook auto-deploy)
git push origin main

# Pull the latest changes from GitHub
git pull origin main

# See recent commit history
git log --oneline -10

# See all changes since last commit
git diff HEAD
```

### npm Version Bumping

```bash
# Bump patch version (bug fix): 0.1.1 -> 0.1.2
npm version patch

# Bump minor version (new feature): 0.1.1 -> 0.2.0
npm version minor

# Bump major version (breaking change): 0.1.1 -> 1.0.0
npm version major

# Check current version
npm version
# or:
cat package.json | grep '"version"'
```

### npm Publishing

```bash
# Full publish flow (run in this order):
npm run build:lib
git commit -m "feat: your feature description"
npm version patch  # or minor or major
npm publish --access public --ignore-scripts
git push origin main && git push origin --tags

# Publish with OTP (if 2FA is required):
npm publish --access public --ignore-scripts --otp=123456

# Verify you're logged in to npm:
npm whoami

# Check what's currently published:
npm info @niravbhatt/mdt-design-system
```

### Claude Code

```bash
# Start Claude Code in current directory
claude

# Start Claude in the project folder
cd ~/path/to/mdt-design-system && claude

# Add Figma MCP server
claude mcp add figma --url http://127.0.0.1:3845/sse

# List configured MCP servers
claude mcp list

# Remove an MCP server
claude mcp remove figma

# Install or update Claude Code
npm install -g @anthropic/claude-code
```

---

## Version Bump + Publish Flow (5 Lines)

The complete sequence to release a new version:

```bash
npm run build:lib
git commit -m "feat: add Badge component"
npm version minor
npm publish --access public --ignore-scripts
git push origin main && git push origin --tags
```

---

## Rules Cheat Sheet

These are the non-negotiable rules for this project. Violating them breaks things.

### CSS Rules

| Rule | Wrong | Right |
|------|-------|-------|
| Use CSS variables for colors | `color: #0052CC` | `color: var(--ds-brand-primary)` |
| Use CSS Modules | `<div className="badge">` | `<div className={styles.badge}>` |
| No Tailwind | `className="p-2 bg-blue-500"` | Use `.module.css` |
| No inline styles | `style=` with object literal | Use `.module.css` |
| No global.css in components | `import '../styles/global.css'` | Never import this in components |

### Component Rules

| Rule | Wrong | Right |
|------|-------|-------|
| Use forwardRef | `function Badge(props) {...}` | `forwardRef<HTMLSpanElement, BadgeProps>(...)` |
| Set displayName | (missing) | `Badge.displayName = 'Badge'` |
| No icon packages | `import { CheckIcon } from '@heroicons/react'` | Accept `icon?: ReactNode` as a prop |
| Export from index.ts | (component works locally but not in package) | Add `export * from './components/Badge'` to `src/index.ts` |

### File Naming Rules

| Item | Convention | Example |
|------|-----------|---------|
| Component folder | PascalCase | `Badge/` |
| Component file | PascalCase | `Badge.tsx` |
| CSS module | PascalCase + `.module.css` | `Badge.module.css` |
| Stories file | PascalCase + `.stories.tsx` | `Badge.stories.tsx` |
| Re-export file | lowercase | `index.ts` |
| CSS class names | camelCase | `styles.iconLeft`, `styles.primary` |
| TypeScript props interface | PascalCase + Props | `BadgeProps` |
| TypeScript type aliases | PascalCase | `BadgeVariant`, `BadgeSize` |

---

## File Locations Cheat Sheet

| What | Where |
|------|-------|
| All CSS custom properties (tokens) | `src/styles/tokens.css` |
| Global styles + font imports (Storybook only) | `src/styles/global.css` |
| Color tokens as JS constants | `src/tokens/colors.ts` |
| Spacing tokens as JS constants | `src/tokens/spacing.ts` |
| Main package export (list of all components) | `src/index.ts` |
| Button component | `src/components/Button/Button.tsx` |
| Storybook configuration | `.storybook/main.ts` |
| Storybook global preview (applies global.css) | `.storybook/preview.ts` |
| Storybook toolbar (ZeroHeight button) | `.storybook/manager.ts` |
| GitHub Actions deployment workflow | `.github/workflows/deploy-storybook.yml` |
| Claude Code project rules | `CLAUDE.md` |
| AI tools API reference | `llms.txt` |
| Contribution guidelines | `CONTRIBUTING.md` |
| Vite build configuration | `vite.config.ts` |
| TypeScript configuration | `tsconfig.json` |
| Built package output | `dist/` |
| Built Storybook output | `storybook-static/` |

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Storybook won't start | Port 6006 is already in use | `npm run storybook -- --port 6007` |
| Storybook won't start | Node version too old | `nvm use 20` |
| Storybook won't start | Broken node_modules | `rm -rf node_modules && npm install` |
| Build fails with TypeScript errors | Type mismatch or missing export | Check VS Code Problems panel (`Cmd+Shift+M`), fix each error |
| Build fails with "cannot find module" | Missing or misspelled import | Check the import path and filename casing |
| npm publish rejected: 402 | Scoped package needs `--access public` | `npm publish --access public --ignore-scripts` |
| npm publish rejected: 403 | Not authenticated with npm | Run `npm whoami` — if blank, run `npm login` |
| npm publish rejected: OTP required | 2FA is enabled | Add `--otp=XXXXXX` with your authenticator code |
| git push fails: "rejected" | Remote has changes you don't have locally | Run `git pull origin main` first, then push |
| git push fails: "authentication failed" | GitHub credentials not set up | Run `gh auth login` and `gh auth setup-git` |
| Claude can't read Figma | Figma desktop app not open | Open the Figma desktop app |
| Claude can't read Figma | Claude Code plugin not running | In Figma: Plugins → Claude Code → open the panel |
| Claude can't read Figma | MCP URL mismatch | Check plugin for exact URL, run `claude mcp list` to verify |
| Claude can't read Figma | MCP not configured | `claude mcp add figma --url http://127.0.0.1:3845/sse` |
| Storybook deploy failed | Check GitHub Actions logs | Visit `github.com/niravbhatt1317/mdt-design-system/actions` |
| Storybook deploy failed | TypeScript error that passes locally | Linux is case-sensitive — check all import path casings |
| Storybook deploy failed | Missing export in src/index.ts | Add `export * from './components/YourComponent'` |
| Component styles not showing | global.css not imported in Storybook | Check `.storybook/preview.ts` imports global.css |
| Component styles not showing | CSS module not imported in component | Check component file imports `styles from './Component.module.css'` |
| Component styles not showing | CSS variable undefined | Check `src/styles/tokens.css` for the variable name |
| Dark mode not working | Theme not toggling CSS variables | Check if `.storybook/preview.ts` has the dark mode decorator |
| Dark mode not working | Missing dark mode overrides | Add `[data-theme="dark"] .root { ... }` overrides to your CSS module |
| npm package styles missing in consumer app | Consumer didn't import the CSS | Tell them: `import '@niravbhatt/mdt-design-system/styles'` |
| ZeroHeight code examples look wrong | Outdated CDN version | Update version in ZeroHeight Settings → Code → CSS URL |

---

## New Component Checklist

Quick reference when adding a component. Full details in [06 — Implement a Component](06-implement-component.md).

```
Files to create:
  [ ] src/components/Badge/Badge.tsx
  [ ] src/components/Badge/Badge.module.css
  [ ] src/components/Badge/index.ts
  [ ] src/components/Badge/Badge.stories.tsx

Files to update:
  [ ] src/index.ts — add export * from './components/Badge'

Badge.tsx must have:
  [ ] forwardRef wrapping the component
  [ ] ComponentName.displayName = 'ComponentName'
  [ ] Props interface extending HTMLAttributes<HTMLElement>
  [ ] All prop types defined and exported

Badge.module.css must have:
  [ ] Only var(--ds-*) for colors — no hex values
  [ ] .root base class
  [ ] One class per variant
  [ ] One class per size

Badge.stories.tsx must have:
  [ ] Meta object with title and argTypes
  [ ] Playground story
  [ ] AllVariants story

Verification:
  [ ] npm run storybook — component appears in sidebar
  [ ] All variants render without errors
  [ ] Dark mode toggle doesn't break component
  [ ] npm run build:lib — completes without TypeScript errors
```

---

## CSS Variable Quick Reference

Common CSS variables available in `src/styles/tokens.css`:

```css
/* Brand colors */
var(--ds-brand-primary)
var(--ds-brand-secondary)

/* Semantic colors */
var(--ds-success)
var(--ds-success-light)
var(--ds-warning)
var(--ds-warning-light)
var(--ds-danger)
var(--ds-danger-light)

/* Neutral / text */
var(--ds-text-para)
var(--ds-text-secondary)
var(--ds-neutral-20)
var(--ds-core-black)

/* Spacing */
var(--ds-space-1)    /* 4px */
var(--ds-space-2)    /* 8px */
var(--ds-space-3)    /* 12px */
var(--ds-space-4)    /* 16px */
var(--ds-space-5)    /* 20px */
var(--ds-space-6)    /* 24px */

/* Border radius */
var(--ds-radius-sm)
var(--ds-radius-md)
var(--ds-radius-lg)
var(--ds-radius-full)  /* pill/circle shape */

/* Typography (shared with Button) */
var(--btn-font-family)
```

To see all available variables, open `src/styles/tokens.css`.

---

## Related Documentation

| Doc | What it covers |
|-----|----------------|
| [01 — Tools Explained](01-tools-explained.md) | What every tool is and why we use it |
| [02 — Machine Setup](02-machine-setup.md) | Set up a new Mac from scratch |
| [03 — Claude Code Setup](03-claude-code-setup.md) | Install Claude Code, connect to Figma |
| [04 — Figma Workflow](04-figma-workflow.md) | Navigate Figma, copy node URLs, use Dev Mode |
| [05 — Clone & Run](05-clone-and-run.md) | Download the project, run Storybook |
| [06 — Implement a Component](06-implement-component.md) | Full walkthrough: Figma to code |
| [07 — Publish & Deploy](07-publish-and-deploy.md) | npm publish, Storybook auto-deploy |
| [08 — ZeroHeight](08-zeroheight.md) | Add documentation for new components |
| [09 — AI Tools Usage](09-ai-tools-usage.md) | Claude Code, Figma Make, AI context blocks |
| [10 — Quick Reference](10-quick-reference.md) | This document |
