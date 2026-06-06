import type { GlobalConfig } from 'payload'

import { canReadPublicly, isAuthenticated } from '../access/isAuthenticated'
import { mapLocation } from '../fields/mapLocation'
import { heroFields, seoFields } from '../fields/shared'

export const ContactPage: GlobalConfig = {
  slug: 'contactPage',
  label: 'Contact Page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: canReadPublicly,
    update: isAuthenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          description: 'Everything visitors see on the contact page, top to bottom.',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Hero',
              admin: { description: 'The full-width banner at the top of the page.' },
              fields: heroFields,
            },
            {
              name: 'invitation',
              type: 'richText',
              admin: { description: 'Welcoming message that invites visitors to reach out.' },
            },
            {
              name: 'map',
              type: 'group',
              label: 'Map',
              admin: { description: 'Interactive map pin and directions.' },
              fields: mapLocation,
            },
          ],
        },
        {
          label: 'SEO',
          description: 'Search engine and social sharing metadata.',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: false,
              fields: seoFields,
            },
          ],
        },
      ],
    },
  ],
}
