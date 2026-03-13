# MDT Design System — Documentation

> A React component library that gives any AI tool a consistent set of UI components, design tokens, and rules — so you get the same visual output whether you're building in Figma Make, Claude Code, Cursor, v0, or anywhere else.

---

## How Everything Connects

```
┌─────────────────────────────────────────────────────────────────┐
│                        FIGMA FILE                               │
│   Design source of truth — components, variants, tokens         │
└──────────────┬──────────────────────────────┬───────────────────┘
               │ Code Connect                  │ MCP (live bridge)
               ▼                              ▼
┌─────────────────────────┐      ┌─────────────────────────────┐
│     SOURCE CODE          │      │       CLAUDE CODE           │
│  github.com/niravbhatt  │◄─────│  reads Figma in real time   │
│  /mdt-design-system     │      │  follows CLAUDE.md rules     │
└──────┬──────────────────┘      └─────────────────────────────┘
       │
       ├──► git push → GitHub Actions → Storybook (auto-deploy)
       │                                    │
       │         niravbhatt1317.github.io   │
       │         /mdt-design-system/ ◄──────┘
       │
       └──► npm publish → @niravbhatt/mdt-design-system
                               │
                ┌──────────────┼──────────────┐
                ▼              ▼              ▼
          Figma Make        Cursor           v0
          uses Button       uses Button     uses Button
          from package      from package    from package
                │
                ▼
         ZeroHeight (motadata.zeroheight.com)
         Guidelines + live sandbox + Figma embeds
```

---

## Start Here — Pick Your Role

### I'm a new developer joining the project
1. → [02 — Machine Setup](02-machine-setup.md) — set up your Mac
2. → [03 — Claude Code Setup](03-claude-code-setup.md) — connect AI tools
3. → [05 — Clone & Run](05-clone-and-run.md) — get the project running
4. → [06 — Implement a Component](06-implement-component.md) — add your first component

### I'm a designer who wants to understand the workflow
1. → [01 — Tools Explained](01-tools-explained.md) — understand every tool
2. → [04 — Figma Workflow](04-figma-workflow.md) — how Figma connects to code
3. → [08 — ZeroHeight](08-zeroheight.md) — manage documentation

### I just want to use the package in my project
```bash
npm install @niravbhatt/mdt-design-system
```
```tsx
import '@niravbhatt/mdt-design-system/styles'
import { Button } from '@niravbhatt/mdt-design-system'
```
→ [09 — AI Tools Usage](09-ai-tools-usage.md) — how to use it with any AI tool

### I want to add or update a component
→ [06 — Implement a Component](06-implement-component.md)
→ [07 — Publish & Deploy](07-publish-and-deploy.md)

---

## Table of Contents

| # | File | What's in it |
|---|------|-------------|
| — | [CONTRIBUTING.md](../CONTRIBUTING.md) | Quick-reference runbook (commands, rules, checklists) |
| 01 | [Tools Explained](01-tools-explained.md) | What every tool is, why it exists, when you use it |
| 02 | [Machine Setup](02-machine-setup.md) | Fresh Mac setup: Git, Node, VS Code, GitHub |
| 03 | [Claude Code Setup](03-claude-code-setup.md) | Install Claude Code, connect to Figma MCP |
| 04 | [Figma Workflow](04-figma-workflow.md) | Working in Figma, copying URLs, Dev Mode |
| 05 | [Clone & Run](05-clone-and-run.md) | Clone repo, install deps, run Storybook |
| 06 | [Implement a Component](06-implement-component.md) | Figma → code → stories → verify |
| 07 | [Publish & Deploy](07-publish-and-deploy.md) | npm publish, git push, versioning |
| 08 | [ZeroHeight](08-zeroheight.md) | Add pages, embed stories, update sandbox |
| 09 | [AI Tools Usage](09-ai-tools-usage.md) | Claude Code, Figma Make, Cursor prompts |
| 10 | [Quick Reference](10-quick-reference.md) | All commands and URLs in one place |

---

## Key URLs

| What | Where |
|------|-------|
| GitHub repo | `github.com/niravbhatt1317/mdt-design-system` |
| Storybook | `niravbhatt1317.github.io/mdt-design-system/` |
| npm package | `npmjs.com/package/@niravbhatt/mdt-design-system` |
| ZeroHeight | `motadata.zeroheight.com` |
| Figma file | `figma.com/design/A8iOt3oQHHT20N1mSpxnQ1/Components--Copy-` |
