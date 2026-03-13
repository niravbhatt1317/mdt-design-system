# 02 — Machine Setup: Setting Up Your Mac From Scratch

This guide walks you through every step needed to set up a brand-new Mac for working on the MDT Design System. If you've already set up some of these tools, you can skip those steps — just use the verification commands to check what you have.

**Time estimate:** 30–60 minutes for a fresh Mac.

**Prerequisites:** A Mac running macOS 12 or later. An internet connection.

---

## Step 1: Check What's Already Installed

Before installing anything, check what you already have. Open the Terminal app (press `Cmd + Space`, type "Terminal", press Enter).

Run these commands one at a time and note the output:

```bash
xcode-select --version
```
If Xcode Command Line Tools are installed, you'll see: `xcode-select version 2395.` (or similar number)
If not: `xcode-select: error: ...`

```bash
git --version
```
If installed: `git version 2.39.3` (or similar)
If not: You'll be prompted to install it, or see an error.

```bash
node --version
```
If installed: `v20.11.0` (or similar)
If not: `zsh: command not found: node`

```bash
npm --version
```
If installed: `10.2.4` (or similar)
If not: `zsh: command not found: npm`

```bash
brew --version
```
If Homebrew is installed: `Homebrew 4.2.3`
If not: `zsh: command not found: brew`

Write down what's missing. Then proceed through the steps below for only the tools you need.

---

## Step 2: Install Xcode Command Line Tools

The Xcode Command Line Tools are a collection of developer utilities (compilers, Git, etc.) that many other tools depend on. They are required.

Run:
```bash
xcode-select --install
```

A popup dialog will appear asking "The xcode-select command requires the command line developer tools. Would you like to install the tools now?" Click **Install**.

Wait for the download and installation to complete (it can take 5–15 minutes depending on your internet speed).

When it's done, verify:
```bash
xcode-select --version
# Expected: xcode-select version 2395.
```

**If this fails:** Try `sudo xcode-select --reset` and then retry. If you already have a full Xcode app installed, this step may be unnecessary.

---

## Step 3: Install Homebrew

Homebrew is the standard package manager for macOS. It lets you install software from the command line with a simple `brew install <name>` command. Think of it as the App Store for developer tools.

Run the following single command (copy the whole thing):
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

The installer will ask for your Mac password (normal — Homebrew installs to `/opt/homebrew` on Apple Silicon Macs or `/usr/local` on Intel Macs). Type your password and press Enter (the cursor won't move — that's normal for password prompts in Terminal).

Installation takes 2–10 minutes.

**Important for Apple Silicon Macs (M1/M2/M3/M4):** After installation, Homebrew will tell you to run two commands to add it to your PATH. Run them. They look like this:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

Verify Homebrew is working:
```bash
brew --version
# Expected: Homebrew 4.x.x
```

**What to do if something goes wrong:**
- "Permission denied": Make sure you're running as an admin user on your Mac (check System Settings → Users & Groups)
- Homebrew install hangs for more than 20 minutes: Press Ctrl+C, check your internet connection, and retry
- "curl: command not found": This is very unusual on macOS — restart Terminal and try again

---

## Step 4: Install Git via Homebrew

macOS ships with an older version of Git. Installing via Homebrew gives you the latest version.

```bash
brew install git
```

Expected output: several lines showing Homebrew downloading and installing Git.

Verify:
```bash
git --version
# Expected: git version 2.44.0 (or newer)
```

Now configure your identity. Git attaches your name and email to every commit you make, so teammates know who made which change:

```bash
git config --global user.name "Your Full Name"
git config --global user.email "your@email.com"
```

Replace `Your Full Name` with your actual name and `your@email.com` with the email address associated with your GitHub account.

Verify the config was saved:
```bash
git config --global --list
# Expected output includes:
# user.name=Your Full Name
# user.email=your@email.com
```

---

## Step 5: Install Node.js via nvm

We use nvm (Node Version Manager) to install Node.js. The reason: nvm lets you install multiple versions of Node.js and switch between them. Different projects sometimes need different Node versions. nvm makes this painless.

**Do not install Node.js directly from nodejs.org** — it's harder to manage and update.

### 5a. Install nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

After the install script finishes, it will tell you to restart your terminal or run a command to load nvm. The easiest approach is to close your Terminal window and open a new one.

Verify nvm is loaded:
```bash
nvm --version
# Expected: 0.39.7
```

If you see `zsh: command not found: nvm`, try:
```bash
source ~/.zshrc
```

Or close and reopen Terminal.

### 5b. Install Node.js 20

```bash
nvm install 20
nvm use 20
```

The first command downloads Node 20. The second sets it as the active version.

Make Node 20 the default for new terminal sessions:
```bash
nvm alias default 20
```

Verify:
```bash
node --version
# Expected: v20.x.x (e.g., v20.11.0)

npm --version
# Expected: 10.x.x (e.g., 10.2.4)
```

**If node --version shows an older version:** Run `nvm use 20` again, then `nvm alias default 20`. If that doesn't work, close Terminal, open a new one, and run `nvm use 20`.

---

## Step 6: Install Visual Studio Code

VS Code is the recommended code editor. It has excellent TypeScript support, Git integration, and a rich extension ecosystem.

Download VS Code from `code.visualstudio.com`. Install it by dragging it to your Applications folder.

### Recommended Extensions

After installing VS Code, open it and install these extensions. Press `Cmd+Shift+X` to open the Extensions panel, search for each name, and click Install:

| Extension | Why you need it |
|-----------|----------------|
| **ESLint** | Shows code quality issues inline as you type |
| **Prettier - Code formatter** | Auto-formats code on save |
| **TypeScript Vue Plugin** (optional) | Better TypeScript support |
| **GitLens** | Shows who changed each line of code and when |
| **CSS Modules** | Autocomplete for CSS Modules class names |

### Enable Format on Save

Press `Cmd+Shift+P`, type "Open User Settings (JSON)", and add:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

## Step 7: Create a GitHub Account

If you don't already have a GitHub account:

1. Go to `github.com`
2. Click "Sign up"
3. Enter your email address, create a password, and choose a username
4. Verify your email address

Use the same email address you configured in Step 4 (`git config --global user.email`).

---

## Step 8: Install GitHub CLI

The GitHub CLI (`gh`) lets you interact with GitHub from the terminal — authenticate, create pull requests, view issues, and more.

```bash
brew install gh
```

Verify:
```bash
gh --version
# Expected: gh version 2.x.x
```

---

## Step 9: Authenticate with GitHub

Now connect the `gh` tool to your GitHub account:

```bash
gh auth login
```

The CLI will ask you a series of questions. Choose these options:

```
? Where do you use GitHub?
> GitHub.com

? What is your preferred protocol for Git operations on this host?
> HTTPS

? Authenticate Git with your GitHub credentials?
> Yes

? How would you like to authenticate GitHub CLI?
> Login with a web browser
```

After choosing "Login with a web browser," the CLI will display a one-time code like `ABCD-1234` and open your browser. Paste the code in the browser, click "Authorize," and enter your GitHub password if prompted.

When it's done, your terminal will show:
```
Logged in as yourusername
```

---

## Step 10: Set Up Git to Use gh for Authentication

This step ensures that when Git pushes code to GitHub, it uses the credentials managed by the `gh` tool:

```bash
gh auth setup-git
```

Expected output: `Configured git protocol`

This means you'll never have to enter your GitHub username and password when running `git push` or `git pull`.

---

## Step 11: Final Verification

Run every command in this checklist. All should succeed:

```bash
# Version control
git --version
# Expected: git version 2.44.0 or newer

# Node.js runtime
node --version
# Expected: v20.x.x

# npm package manager
npm --version
# Expected: 10.x.x

# GitHub CLI
gh --version
# Expected: gh version 2.x.x

# GitHub authentication
gh auth status
# Expected: Logged in to github.com as [your-username]

# Homebrew
brew --version
# Expected: Homebrew 4.x.x
```

If all of these pass, your machine is ready.

---

## Common Problems and Fixes

### "command not found: nvm" after installing nvm
nvm modifies your shell profile file (`~/.zshrc`). Close your terminal window and open a new one. If it still doesn't work, run:
```bash
source ~/.zshrc
```

### Git is still showing the old macOS version (2.x vs 2.44.x)
Homebrew installed a newer Git, but your shell is still finding the system Git first. Run:
```bash
which git
```
If it shows `/usr/bin/git` (system), you need to add Homebrew's bin directory to your PATH before the system path. Add this to your `~/.zshrc`:
```bash
export PATH="/opt/homebrew/bin:$PATH"
```
Then restart Terminal.

### "brew: command not found" on Apple Silicon
You forgot to add Homebrew to your PATH. Run:
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### gh auth login opens browser but doesn't complete
Try using SSH instead of HTTPS: go back through `gh auth login` and choose SSH. Or try a different browser.

### npm install fails with "EACCES: permission denied"
This usually means Node was installed globally (not via nvm) and has wrong file permissions. The fix: uninstall Node, install nvm, and reinstall Node via nvm following the steps above.

---

## What's Next?

Your machine is now set up with all the base tools. The next step is to install Claude Code and connect it to Figma.

Next: [03 — Claude Code Setup](03-claude-code-setup.md)
