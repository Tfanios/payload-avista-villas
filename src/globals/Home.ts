import type { GlobalConfig } from 'payload'

import { canReadPublicly, isAuthenticated } from '../access/isAuthenticated'
import {
  galleryFields,
  heroFields,
  locationFactFields,
  serviceFields,
  seoFields,
} from '../fields/shared'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
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
    {
      name: 'intro',
      type: 'group',
      fields: [
        { name: 'lead', type: 'textarea' },
        { name: 'statement', type: 'richText' },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      fields: galleryFields,
    },
    {
      name: 'services',
      type: 'array',
      fields: serviceFields,
    },
    { name: 'locationSummary', type: 'textarea' },
    {
      name: 'locationFacts',
      type: 'array',
      fields: locationFactFields,
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'body', type: 'textarea' },
        { name: 'buttonLabel', type: 'text' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: seoFields,
    },
  ],
}
