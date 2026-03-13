import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [] } },
      },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@storybook/addon-storysource',
    '@zeroheight/storybook-addon',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}

export default config
