import type { GlobalConfig } from 'payload'

import { canReadPublicly, isAuthenticated } from '../access/isAuthenticated'
import { linkFields } from '../fields/shared'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Site',
  },
  access: {
    read: canReadPublicly,
    update: isAuthenticated,
  },
  fields: [
    { name: 'brandBlurb', type: 'textarea' },
    {
      name: 'columns',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: linkFields,
        },
      ],
    },
  ],
}
