import type { Preview } from '@storybook/react'
import { withThemeByDataAttribute } from '@storybook/addon-themes'
import '../src/styles/global.css'

const preview: Preview = {
  // ── Global decorators ──────────────────────────────────────────────────────
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],

  // ── Global parameters ──────────────────────────────────────────────────────
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
    backgrounds: { disable: true }, // we use the theme switcher instead
    docs: {
      source: {
        type: 'dynamic',
        language: 'tsx',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
        ],
      },
    },
    zeroheight: {
      url: 'https://motadata.zeroheight.com',
    },
  },

  // ── Global types (toolbar items) ───────────────────────────────────────────
  globalTypes: {
    locale: {
      description: 'Locale for i18n',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'ar', title: 'Arabic (RTL)', right: '🇸🇦' },
        ],
        showName: true,
      },
    },
  },
}

export default preview
