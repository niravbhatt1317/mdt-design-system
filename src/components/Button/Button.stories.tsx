import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const Icon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    <rect x="1" y="1" width="4" height="4" rx="0.5" />
    <rect x="7" y="1" width="4" height="4" rx="0.5" />
    <rect x="1" y="7" width="4" height="4" rx="0.5" />
    <rect x="7" y="7" width="4" height="4" rx="0.5" />
  </svg>
)

const VARIANTS = ['primary', 'secondary', 'tertiary', 'neutral', 'link'] as const
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
    {children}
  </div>
)

/**
 * Converts boolean leadingIcon/trailingIcon args into actual React elements
 * so the controls panel can toggle them with a checkbox.
 */
const metaDecorator: Meta<typeof Button>['decorators'] = [
  (Story, context) => {
    const args = { ...context.args } as Record<string, unknown>
    if (typeof args.leadingIcon === 'boolean') {
      args.leadingIcon = args.leadingIcon ? <Icon /> : undefined
    }
    if (typeof args.trailingIcon === 'boolean') {
      args.trailingIcon = args.trailingIcon ? <Icon /> : undefined
    }
    // iconOnly requires a leading icon to render — auto-inject one if missing
    if (args.iconOnly && !args.leadingIcon) {
      args.leadingIcon = <Icon />
    }
    if (args.fullWidth) {
      return (
        <div style={{ width: 'min(400px, 90vw)' }}>
          <Story {...context} args={args} />
        </div>
      )
    }
    return <Story {...context} args={args} />
  },
]

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: metaDecorator,
  argTypes: {
    children: {
      name: 'Label',
      control: 'text',
      description: 'Button label text',
      table: { category: 'Content' },
    },
    leadingIcon: {
      name: 'Leading icon',
      control: 'boolean',
      description: 'Show an icon before the label',
      table: { category: 'Content' },
    },
    trailingIcon: {
      name: 'Trailing icon',
      control: 'boolean',
      description: 'Show an icon after the label',
      table: { category: 'Content' },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'neutral', 'link'],
      description: 'Visual style',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the button',
      table: { category: 'Appearance' },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretch to fill its container',
      table: { category: 'Appearance' },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Hide the label and show only the icon',
      table: { category: 'Appearance' },
    },
    loading: {
      control: 'boolean',
      description: 'Show spinner and disable interaction',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: 'Prevent interaction',
      table: { category: 'State' },
    },
    skeleton: {
      control: 'boolean',
      description: 'Show a skeleton placeholder',
      table: { category: 'State' },
    },
    onClick: {
      action: 'clicked',
      table: { category: 'Events' },
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    leadingIcon: false,
    trailingIcon: false,
    loading: false,
    disabled: false,
    skeleton: false,
    iconOnly: false,
    fullWidth: false,
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ─── Playground ───────────────────────────────────────────────────────────────

/** Tweak every prop from the controls panel. */
export const Playground: Story = {}

// ─── Button Types ─────────────────────────────────────────────────────────────

export const ButtonTypes: Story = {
  name: 'Button Types',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Row>
        {VARIANTS.map((variant) => (
          <div key={variant} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Button variant={variant}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Button>
            <span style={{ fontSize: 11, color: '#888', textTransform: 'capitalize' }}>{variant}</span>
          </div>
        ))}
      </Row>
      <Row>
        {VARIANTS.map((variant) => (
          <Button key={variant} variant={variant} leadingIcon={<Icon />}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Button>
        ))}
      </Row>
    </div>
  ),
}

// ─── All Sizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Row>
        {SIZES.map((size) => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Button size={size}>Button</Button>
            <span style={{ fontSize: 11, color: '#888' }}>{size}</span>
          </div>
        ))}
      </Row>
      <Row>
        {SIZES.map((size) => (
          <Button key={size} size={size} leadingIcon={<Icon />}>Button</Button>
        ))}
      </Row>
    </div>
  ),
}

// ─── Full Width ───────────────────────────────────────────────────────────────

export const FullWidth: Story = {
  name: 'Full Width',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 480 }}>
      {VARIANTS.map((variant) => (
        <Button key={variant} variant={variant} fullWidth leadingIcon={<Icon />}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </div>
  ),
}

// ─── Icon Only ────────────────────────────────────────────────────────────────

export const IconOnly: Story = {
  name: 'Icon Only',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Row>
        {SIZES.map((size) => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Button size={size} iconOnly leadingIcon={<Icon />} aria-label={`Action ${size}`} />
            <span style={{ fontSize: 11, color: '#888' }}>{size}</span>
          </div>
        ))}
      </Row>
      <Row>
        {VARIANTS.map((variant) => (
          <Button key={variant} variant={variant} iconOnly leadingIcon={<Icon />} aria-label={variant} />
        ))}
      </Row>
    </div>
  ),
}

// ─── Loading ──────────────────────────────────────────────────────────────────

export const Loading: Story = {
  name: 'Loading',
  render: () => (
    <Row>
      {VARIANTS.map((variant) => (
        <Button key={variant} variant={variant} loading>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </Row>
  ),
}

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <Row>
      {VARIANTS.map((variant) => (
        <Button key={variant} variant={variant} disabled leadingIcon={<Icon />}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </Row>
  ),
}

// ─── All States ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(
        [
          { label: 'Loading',  buttons: VARIANTS.map((v) => <Button key={v} variant={v} loading>{v.charAt(0).toUpperCase() + v.slice(1)}</Button>) },
          { label: 'Disabled', buttons: VARIANTS.map((v) => <Button key={v} variant={v} disabled>{v.charAt(0).toUpperCase() + v.slice(1)}</Button>) },
          { label: 'Skeleton', buttons: SIZES.map((s) => <Button key={s} size={s} skeleton />) },
        ] as const
      ).map(({ label, buttons }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
          <Row>{buttons}</Row>
        </div>
      ))}
    </div>
  ),
}
