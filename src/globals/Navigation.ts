import type { GlobalConfig } from 'payload'

import { canReadPublicly, isAuthenticated } from '../access/isAuthenticated'
import { linkFields } from '../fields/shared'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: canReadPublicly,
    update: isAuthenticated,
  },
  fields: [
    {
      name: 'leftLinks',
      type: 'array',
      fields: linkFields,
      defaultValue: [
        { label: 'Avista Villa', href: '/avista-villa' },
        { label: 'Private Resort', href: '/avista-private-resort' },
      ],
    },
    {
      name: 'rightLinks',
      type: 'array',
      fields: linkFields,
      defaultValue: [
        { label: 'Location', href: '/location' },
        { label: 'Enquire', href: '/contact' },
      ],
    },
  ],
}
