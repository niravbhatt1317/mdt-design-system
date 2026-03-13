import { addons, types } from '@storybook/manager-api'
import React from 'react'

addons.register('zeroheight', () => {
  addons.add('zeroheight/toolbar', {
    type: types.TOOL,
    title: 'View in ZeroHeight',
    render: () =>
      React.createElement(
        'a',
        {
          href: 'https://motadata.zeroheight.com',
          target: '_blank',
          rel: 'noopener noreferrer',
          title: 'View in ZeroHeight',
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 10px',
            fontSize: '12px',
            fontWeight: 500,
            color: 'inherit',
            textDecoration: 'none',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
          },
        },
        '↗ ZeroHeight'
      ),
  })
})
