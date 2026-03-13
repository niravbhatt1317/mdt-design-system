# 07 — Publish & Deploy: Sharing Your Changes With the World

This guide explains the two ways changes get shared: automatic deployment of the Storybook documentation, and manual publishing of the npm package.

**Prerequisites:**
- Changes implemented and tested locally (see [06 — Implement a Component](06-implement-component.md))
- npm account with access to publish `@niravbhatt/mdt-design-system`

---

## What Deploys Where

There are two separate systems for sharing this project with the world:

| What | How it's triggered | Where it goes | How fast |
|------|--------------------|---------------|----------|
| Storybook documentation | Automatic — any push to `main` | `niravbhatt1317.github.io/mdt-design-system/` | ~1–2 minutes |
| npm package | Manual — you run `npm publish` | `npmjs.com/package/@niravbhatt/mdt-design-system` | Immediate |

These are independent. You can push to GitHub without publishing to npm (the docs update but consumers don't get new components). You can publish to npm without pushing to GitHub first (not recommended — always push first).

---

## Part 1: Storybook Auto-Deploy (GitHub Actions)

Every time you run `git push origin main`, GitHub automatically builds and deploys the Storybook documentation. You don't have to do anything extra.

### How It Works — Step by Step

1. You run `git push origin main`
2. GitHub receives the push
3. GitHub Actions detects the push and starts the workflow defined in `.github/workflows/deploy-storybook.yml`
4. The workflow runs on GitHub's servers (you don't see this happen on your machine):
   - Checks out the code
   - Installs Node.js and dependencies
   - Runs `npm run build-storybook` to create a static Storybook site
   - Deploys the static site to GitHub Pages
5. About 1–2 minutes later, the updated site is live

### How to Monitor the Deployment

While the deployment is running:
1. Go to `github.com/niravbhatt1317/mdt-design-system/actions`
2. You'll see a workflow run in progress, with a yellow spinning indicator
3. Click on it to see the detailed logs for each step
4. When it turns green, the deployment is done

### How to Verify It Worked

After the workflow completes (green checkmark):
1. Open `niravbhatt1317.github.io/mdt-design-system/` in your browser
2. Hard refresh: `Cmd+Shift+R` (forces the browser to fetch the latest version)
3. You should see your new component in the sidebar

If the deployment fails (red X in GitHub Actions), click on the failed run to see the error logs. Common causes:
- TypeScript errors that were hidden in local dev
- A missing export in `src/index.ts`
- An import path that works on macOS (case-insensitive) but fails on Linux (case-sensitive)

### What's in deploy-storybook.yml

The workflow file at `.github/workflows/deploy-storybook.yml` defines the automation. In summary, it:
1. Runs on every push to `main`
2. Sets up Node.js 20
3. Runs `npm ci` (like `npm install` but faster and more reliable for CI)
4. Runs `npm run build-storybook` to build the static Storybook site
5. Deploys the `storybook-static/` output folder to GitHub Pages

---

## Part 2: Semantic Versioning

Before publishing to npm, you need to choose the right version number. This matters because:
- Consumers pin to specific versions
- Breaking changes need a major version bump so consumers don't get surprised
- Version numbers communicate the nature of the change

### The Format: MAJOR.MINOR.PATCH

```
    1    .    2    .    3
    |         |         |
  Major    Minor     Patch
```

### When to Use Each

**PATCH** (e.g., `0.1.1` → `0.1.2`)
- Bug fix: a component was rendering incorrectly and you fixed it
- Style fix: a color was wrong and you corrected it
- Nothing new was added, nothing was removed or renamed
- Consumers can upgrade safely without any code changes

**MINOR** (e.g., `0.1.1` → `0.2.0`)
- New component added (e.g., you added Badge)
- New prop added to an existing component (e.g., you added `loading` to Badge)
- Existing behavior was improved but nothing was removed
- Consumers can upgrade safely — new features are available but old code still works

**MAJOR** (e.g., `0.9.3` → `1.0.0`)
- A prop was renamed (e.g., `type` renamed to `variant`)
- A component was removed or renamed
- Default behavior changed in a way that could break existing code
- Consumers must review their code before upgrading

### Practical Tip

When in doubt, use PATCH for fixes and MINOR for additions. Use MAJOR sparingly — it requires more communication with consumers.

---

## Part 3: Step-by-Step Publish Flow

Here is the complete process for publishing a new version of the package:

### Step 1: Build and Verify Locally

Build the library first and make sure there are no errors:

```bash
npm run build:lib
```

Expected output ends with:
```
✓ built in 1.23s
```

If there are TypeScript errors or build failures, fix them before continuing.

Verify the `dist/` folder has the expected files:
```bash
ls dist/
# Expected: mdt-design-system.css  mdt-design-system.es.js  mdt-design-system.umd.js  index.d.ts  (and possibly more)
```

### Step 2: Commit Your Changes

All your code changes must be committed to Git before bumping the version. This keeps things clean — the version bump commit only contains the version number change, not your feature code.

```bash
# Stage all changed files (be specific when possible)
git add src/components/Badge/
git add src/index.ts

# Commit with a descriptive message
# Convention: feat: for new features, fix: for bug fixes, chore: for housekeeping
git commit -m "feat: add Badge component"
```

If you have multiple components or changes, commit them in logical groups.

### Step 3: Bump the Version Number

After committing your feature, bump the version. This automatically:
1. Updates `package.json` with the new version number
2. Creates a Git commit like "v0.2.0"
3. Creates a Git tag like `v0.2.0`

```bash
# For a bug fix:
npm version patch

# For a new feature (new component, new prop):
npm version minor

# For a breaking change:
npm version major
```

Expected output for `npm version minor`:
```
v0.2.0
```

Your `package.json` now shows `"version": "0.2.0"`.

### Step 4: Publish to npm

```bash
npm publish --access public --ignore-scripts
```

Flags explained:
- `--access public` — required for scoped packages (packages starting with `@`). Without this, npm defaults to private and refuses to publish unless you have a paid plan.
- `--ignore-scripts` — skips the `prepublishOnly` script (which would try to rebuild). Since we already built in Step 1, we don't need to rebuild. This saves time and avoids any build-during-publish issues.

Expected output:
```
npm notice
npm notice package: @niravbhatt/mdt-design-system@0.2.0
npm notice Tarball Contents
npm notice 1.2 kB  dist/index.d.ts
npm notice 18.4 kB dist/mdt-design-system.es.js
npm notice 12.3 kB dist/mdt-design-system.umd.js
npm notice 5.2 kB  dist/mdt-design-system.css
npm notice package.json
npm notice README.md
npm notice Tarball Details
npm notice total files:  6
npm notice
+ @niravbhatt/mdt-design-system@0.2.0
```

If you have 2FA enabled on your npm account and get prompted for an OTP:
```bash
npm publish --access public --ignore-scripts --otp=123456
```

Replace `123456` with the actual OTP from your authenticator app.

### Step 5: Push the Version Bump to GitHub

The `npm version` command created a commit and a tag on your local machine. Push both to GitHub:

```bash
git push origin main
git push origin --tags
```

The first command pushes the version bump commit. The second pushes the Git tag (e.g., `v0.2.0`), which creates a release marker on GitHub.

---

## Part 4: npm Authentication Setup

You need to be authenticated with npm to publish. Here's how to set it up.

### Create a Granular Access Token

1. Go to `npmjs.com` and log in
2. Click your profile picture → **Access Tokens**
3. Click **Generate New Token** → **Granular Access Token**
4. Give it a name like "MDT Design System publish"
5. Under **Packages and scopes**:
   - Select "Select packages"
   - Choose `@niravbhatt/mdt-design-system`
   - Set permission to **Read and write**
6. Under **Two-factor authentication**:
   - Enable "Bypass two-factor authentication" — this means you won't need to enter an OTP code every time you publish
7. Click **Generate Token**
8. **Copy the token immediately** — you won't be able to see it again

### Add the Token to npm

Option A — Login via CLI (recommended for most people):
```bash
npm login
```
Enter your npm username, password, and the token when prompted.

Option B — Set the token directly in the npm config:
```bash
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN_HERE
```

Option C — Use an `.npmrc` file (useful for automation):
Create `~/.npmrc` (your home directory, not the project):
```
//registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE
```

**Security note:** Never commit your npm token to Git. Keep it in your home directory's `~/.npmrc`, not in the project folder.

### Verify You're Authenticated

```bash
npm whoami
# Expected: niravbhatt (or whatever your npm username is)
```

---

## Part 5: After Publishing — Update ZeroHeight

After publishing a new version, the CDN URL for the CSS file needs to be updated in ZeroHeight so the live code examples use the new styles.

The CDN URL follows this pattern:
```
https://cdn.jsdelivr.net/npm/@niravbhatt/mdt-design-system@VERSION/dist/mdt-design-system.css
```

To update it:
1. Log in to `motadata.zeroheight.com`
2. Go to **Settings** → **Code** (or find the CSS configuration area)
3. Find the CDN URL with the old version number
4. Replace the version number with the new one
5. Save

For example, change:
```
https://cdn.jsdelivr.net/npm/@niravbhatt/mdt-design-system@0.1.1/dist/mdt-design-system.css
```
To:
```
https://cdn.jsdelivr.net/npm/@niravbhatt/mdt-design-system@0.2.0/dist/mdt-design-system.css
```

---

## Pre-Publish Checklist

Run through this before every publish:

- [ ] `npm run build:lib` completes without errors
- [ ] New component appears correctly in Storybook
- [ ] All variants of the component render correctly
- [ ] Dark mode works correctly
- [ ] `src/index.ts` exports the new component
- [ ] TypeScript shows no errors (check VS Code Problems panel)
- [ ] All code changes are committed (`git status` shows nothing uncommitted)
- [ ] Version bump type is correct (patch/minor/major)
- [ ] After publish: `npm info @niravbhatt/mdt-design-system` shows the new version
- [ ] After publish: update ZeroHeight CDN URL if CSS changed

---

## Full Command Sequence (Summary)

For reference, here are the five core commands in order:

```bash
# 1. Build the library
npm run build:lib

# 2. Commit your feature changes (done before this step)
git commit -m "feat: add Badge component"

# 3. Bump version (choose one)
npm version patch   # bug fix
npm version minor   # new feature
npm version major   # breaking change

# 4. Publish to npm
npm publish --access public --ignore-scripts

# 5. Push everything to GitHub
git push origin main && git push origin --tags
```

---

Next: [08 — ZeroHeight](08-zeroheight.md) — Add your new component to the human-friendly documentation hub.
