import type { GlobalConfig } from 'payload'

import { canReadPublicly, isAuthenticated } from '../access/isAuthenticated'
import { mapLocation } from '../fields/mapLocation'
import { heroFields, linkFields, locationFactFields, seoFields } from '../fields/shared'

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
      name: 'hero',
      type: 'group',
      fields: heroFields,
    },
    { name: 'overview', type: 'richText' },
    {
      name: 'locationFacts',
      type: 'array',
      fields: locationFactFields,
    },
    {
      name: 'map',
      type: 'group',
      fields: mapLocation,
    },
    {
      name: 'crossLinks',
      type: 'array',
      maxRows: 2,
      fields: linkFields,
    },
    {
      name: 'seo',
      type: 'group',
      fields: seoFields,
    },
  ],
}
