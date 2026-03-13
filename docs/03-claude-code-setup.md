# 03 — Claude Code Setup: Installing Claude and Connecting to Figma

This guide walks you through installing Claude Code (Anthropic's AI coding assistant) and connecting it to your Figma file so Claude can read designs directly. By the end, you'll be able to paste a Figma URL and have Claude implement the component for you.

**Prerequisites:** Complete [02 — Machine Setup](02-machine-setup.md) first. You need Node.js and npm installed.

---

## What Is Claude Code?

Claude Code is an AI coding assistant that runs inside your terminal. Unlike browser-based AI tools (ChatGPT, Claude.ai), Claude Code:

- Runs in your project folder and can read all your files
- Can edit files, create new files, and run commands on your behalf
- Understands your codebase structure, conventions, and existing patterns
- Can connect to external tools like Figma via MCP (more on that below)

When you run `claude` in the MDT Design System folder, it automatically reads `CLAUDE.md` — a file that tells Claude everything about this project's rules, conventions, and structure. This means Claude already knows not to use Tailwind, to use `forwardRef`, to export from `src/index.ts`, and so on.

---

## Part 1: Installing Claude Code

### Step 1: Install Claude Code Globally

Claude Code is a Node.js package. Install it globally so you can run it from any folder:

```bash
npm install -g @anthropic/claude-code
```

This installs a command called `claude` on your machine.

Verify the installation:
```bash
claude --version
# Expected: something like: 1.x.x
```

### Step 2: Create an Anthropic Account

1. Go to `claude.ai`
2. Click "Sign up"
3. Create an account (you can use Google, GitHub, or email)
4. A free tier is available. For heavy usage, Claude Pro ($20/month) gives more capacity.

### Step 3: First Run — Browser Authentication

The first time you run Claude Code, it needs to connect your terminal to your Anthropic account. Navigate to any folder first (your home folder is fine for this step):

```bash
claude
```

Claude Code will open your browser and ask you to log in with your Anthropic account. After you log in, return to the terminal. You'll see the Claude Code interface appear — a prompt where you can type messages.

To exit Claude Code: type `/exit` or press `Ctrl+C`.

### Step 4: Open Claude Code in the Project

Now navigate to the design system project and open Claude Code there:

```bash
cd ~/path/to/mdt-design-system
claude
```

Replace `~/path/to/mdt-design-system` with the actual path to the project folder (once you've cloned it — see [05 — Clone & Run](05-clone-and-run.md)).

When Claude starts in this folder, it automatically reads `CLAUDE.md`. You'll see a message like:
```
Loaded CLAUDE.md (project context)
```

This is how Claude knows the project's rules before you've told it anything.

---

## What CLAUDE.md Does

`CLAUDE.md` is a special file that Claude Code reads automatically every time you start it in that folder. Think of it as a briefing document for Claude.

Our `CLAUDE.md` contains:
- The project structure
- Required patterns (forwardRef, CSS Modules, CSS variables)
- Rules about what NOT to do (no Tailwind, no hardcoded hex, no global.css imports)
- How to export components
- Links to documentation

Because of this file, you don't have to explain the project every time you open Claude. You can just say "implement this Figma component" and Claude already knows the rules.

---

## Part 2: Figma MCP Plugin Setup

MCP stands for Model Context Protocol. It's an open standard that lets Claude connect to external tools. The Figma MCP lets Claude read your Figma files directly — so when you paste a Figma URL, Claude can see the actual design, not just the URL text.

### Step 5: Download and Install the Figma Desktop App

The MCP plugin requires the Figma desktop app (not just the browser version).

1. Go to `figma.com/downloads`
2. Click "Desktop App" for Mac
3. Open the downloaded `.dmg` file
4. Drag Figma to your Applications folder
5. Open Figma and log in with your Figma account

### Step 6: Find and Install the Claude Code Plugin in Figma

1. Open the Figma desktop app
2. From any file or from the home screen, click on the Figma logo (or the "Resources" icon — looks like four squares) in the top toolbar
3. Click "Plugins"
4. Click "Find more plugins" or go to the "Community" tab
5. Search for: **Claude Code**
6. Find the official Anthropic plugin (it will say "by Anthropic")
7. Click "Install"

Alternatively, you can find the plugin at `figma.com/community` — search for "Claude Code."

### Step 7: Open the Plugin and Get the MCP Server URL

1. In Figma desktop, open any file (it doesn't matter which one)
2. From the menu bar: **Plugins** → **Claude Code**
   (Or right-click on the canvas → Plugins → Claude Code)
3. The plugin panel will open. It shows an MCP server URL like:

```
http://127.0.0.1:3845/sse
```

**Important:** This server URL is active only while the plugin is open and Figma is running. You need to keep Figma open and the plugin running whenever you want Claude to read Figma designs.

Write down or remember this URL — you need it in the next step.

### Step 8: Add the MCP Server to Claude Code

You need to tell Claude Code about the Figma MCP server. There are two ways to do this.

**Method A: Command line (recommended)**

In your terminal, run:
```bash
claude mcp add figma --url http://127.0.0.1:3845/sse
```

Claude Code saves this to your settings file automatically.

**Method B: Edit settings file manually**

Claude Code's settings are in `~/.claude/settings.json`. Open it with VS Code:
```bash
code ~/.claude/settings.json
```

Add or update the `mcpServers` section:
```json
{
  "mcpServers": {
    "figma": {
      "url": "http://127.0.0.1:3845/sse"
    }
  }
}
```

Save the file.

### Step 9: Restart Claude Code

After adding the MCP server, you must restart Claude Code for the change to take effect.

If Claude Code is currently running, type `/exit` to quit it. Then start it again:
```bash
claude
```

When Claude starts, it will attempt to connect to all configured MCP servers. If the Figma plugin is running, you'll see a message indicating the connection was established.

### Step 10: Verify the Connection

Test that Claude can read Figma by doing the following:

1. Make sure the Figma desktop app is open
2. Make sure the Claude Code plugin is running in Figma
3. Open any Figma file (the MDT design system file works great)
4. Copy the URL from the browser address bar or right-click an element and select "Copy link to selection"
5. In Claude Code, type something like:

```
What components are in this Figma file?
https://www.figma.com/design/A8iOt3oQHHT20N1mSpxnQ1/Components--Copy-
```

If the MCP connection is working, Claude will respond with a description of the Figma file contents. If it's not working, Claude will say it can't access the URL.

---

## Troubleshooting

### "Claude cannot access the Figma URL"

Check each of these in order:

1. **Is the Figma desktop app open?** The MCP server only runs when the desktop app is open. The browser version of Figma does not run the plugin server.

2. **Is the Claude Code plugin running in Figma?** Open the plugin panel via Plugins → Claude Code. The plugin must be actively running (the panel must be open).

3. **Does the URL match?** The URL in your settings must match exactly what the plugin shows. The default is `http://127.0.0.1:3845/sse` but in rare cases the port number can differ.

4. **Did you restart Claude Code after adding the MCP?** Claude Code reads MCP settings at startup. If you added the MCP while Claude was running, you need to restart it.

5. **Is there a firewall blocking localhost?** Some corporate network security tools block localhost connections. Check with your IT team if you're on a managed Mac.

### "claude: command not found" after installing

npm might not have added its global bin directory to your PATH. Try:
```bash
npx @anthropic/claude-code
```

Or find where npm puts global packages:
```bash
npm config get prefix
# Usually: /Users/yourusername/.nvm/versions/node/v20.x.x
```

Then add that directory's `bin` folder to your `~/.zshrc`:
```bash
export PATH="$(npm config get prefix)/bin:$PATH"
```

Restart Terminal and try `claude` again.

### "MCP server connection failed"

If Claude says the MCP server can't be reached even though the plugin is running:

1. Check the plugin panel in Figma for the exact server URL
2. Run `claude mcp list` to see what URLs Claude knows about
3. If the URL is wrong, remove the old one and add the correct one:
   ```bash
   claude mcp remove figma
   claude mcp add figma --url http://127.0.0.1:3845/sse
   ```

### "I don't see the Claude Code plugin in Figma Community"

Search for "Claude" in the Figma Community. Make sure you're in the Figma desktop app (the community plugin search works differently in the browser). If it still doesn't appear, try searching at `figma.com/community` in your browser, then install from there.

---

## Daily Workflow with Claude Code

Once everything is set up, your daily workflow looks like this:

1. **Open Figma desktop** — the MCP plugin server starts automatically if you've set it to open with Figma, or manually open the plugin panel
2. **Open your terminal** in the project folder
3. **Start Claude:** `claude`
4. **Paste a Figma URL** and describe what you want:
   ```
   Implement this component following the project patterns:
   https://www.figma.com/design/A8iOt3oQHHT20N1mSpxnQ1/...?node-id=2022-2455
   ```
5. **Review Claude's work** — check the files it created, run Storybook to verify
6. **Accept or refine** — tell Claude to adjust anything that doesn't look right

---

## What Claude Can and Cannot Do

**Claude CAN:**
- Read Figma designs and extract measurements, colors, typography
- Write TypeScript components following your project patterns
- Write CSS Modules files using CSS variables
- Write Storybook stories
- Edit existing files
- Run commands like `npm run storybook` and report the output
- Read any file in your project

**Claude CANNOT:**
- Publish to npm (requires your npm credentials and authentication)
- Push to GitHub (requires your git credentials)
- Access private Figma files that you haven't granted access to
- Make permanent changes without you reviewing and accepting them (Claude shows you what it wants to do before doing it)

---

Next: [04 — Figma Workflow](04-figma-workflow.md) — Learn how designers work in Figma and how to navigate the MDT design file.
