import type { GlobalConfig } from 'payload'

import { canReadPublicly, isAuthenticated } from '../access/isAuthenticated'
import { mapLocation } from '../fields/mapLocation'
import { heroFields, seoFields } from '../fields/shared'

export const ContactPage: GlobalConfig = {
  slug: 'contactPage',
  access: {
    read: canReadPublicly,
    update: isAuthenticated,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: heroFields,
    },
    { name: 'invitation', type: 'richText' },
    {
      name: 'map',
      type: 'group',
      fields: mapLocation,
    },
    {
      name: 'seo',
      type: 'group',
      fields: seoFields,
    },
  ],
}
