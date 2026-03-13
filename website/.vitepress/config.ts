import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Synapse',
  description:
    'Synapse — React component library with Figma-matched tokens — documentation for contributors and AI tools.',
  srcDir: '../docs',
  outDir: '../dist-docs',
  cleanUrls: true,
  ignoreDeadLinks: [/CONTRIBUTING/],

  head: [
    ['meta', { name: 'theme-color', content: '#0066cc' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    siteTitle: 'Synapse',

    nav: [
      { text: 'Storybook', link: 'https://synapse.heynirav.com' },
      { text: 'npm', link: 'https://www.npmjs.com/package/@niravbhatt/synapse-design-system' },
      { text: 'ZeroHeight', link: 'https://motadata.zeroheight.com' },
      { text: 'Figma', link: 'https://www.figma.com/design/A8iOt3oQHHT20N1mSpxnQ1/Components--Copy-' },
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Start Here', link: '/README' },
        ],
      },
      {
        text: 'Setup Guides',
        collapsed: false,
        items: [
          { text: '01 — Tools Explained', link: '/01-tools-explained' },
          { text: '02 — Machine Setup', link: '/02-machine-setup' },
          { text: '03 — Claude Code Setup', link: '/03-claude-code-setup' },
          { text: '04 — Figma Workflow', link: '/04-figma-workflow' },
          { text: '05 — Clone & Run', link: '/05-clone-and-run' },
        ],
      },
      {
        text: 'Contributing',
        collapsed: false,
        items: [
          { text: '06 — Implement a Component', link: '/06-implement-component' },
          { text: '07 — Publish & Deploy', link: '/07-publish-and-deploy' },
          { text: '08 — ZeroHeight', link: '/08-zeroheight' },
          { text: '09 — AI Tools Usage', link: '/09-ai-tools-usage' },
          { text: '10 — Quick Reference', link: '/10-quick-reference' },
        ],
      },
    ],

    editLink: {
      pattern:
        'https://github.com/niravbhatt1317/synapse-design-system/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/niravbhatt1317/synapse-design-system',
      },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Synapse — one source of truth for components, tokens, and guidelines.',
      copyright: 'Built with VitePress',
    },
  },
})
