import type { GlobalConfig } from 'payload'

import { canReadPublicly, isAuthenticated } from '../access/isAuthenticated'
import { localGuideField } from '../fields/localGuide'
import { mapLocation } from '../fields/mapLocation'
import { crossLinksField, heroFields, locationFactsField, seoFields } from '../fields/shared'

export const LocationPage: GlobalConfig = {
  slug: 'locationPage',
  label: 'Location Page',
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
          description: 'Everything visitors see on the location page, top to bottom.',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Hero',
              admin: { description: 'The full-width banner at the top of the page.' },
              fields: heroFields,
            },
            {
              name: 'overview',
              type: 'richText',
              admin: { description: 'Introductory description of the location.' },
            },
            locationFactsField,
            {
              name: 'map',
              type: 'group',
              label: 'Map',
              admin: { description: 'Interactive map pin and directions.' },
              fields: mapLocation,
            },
            localGuideField,
            crossLinksField,
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
