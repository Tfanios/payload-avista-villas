import type { CollectionConfig } from 'payload'

import { isAuthenticated } from '../access/isAuthenticated'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'property', 'score', 'featured'],
  },
  access: {
    create: isAuthenticated,
    read: () => true,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'property',
      type: 'relationship',
      relationTo: 'properties',
      required: true,
      index: true,
    },
    { name: 'authorName', type: 'text', required: true },
    { name: 'authorLocation', type: 'text' },
    {
      name: 'source',
      type: 'select',
      options: ['booking', 'google', 'airbnb', 'direct'],
      defaultValue: 'booking',
    },
    { name: 'score', type: 'number', min: 0, max: 10, defaultValue: 10 },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'date', type: 'text' },
    { name: 'featured', type: 'checkbox', defaultValue: true, index: true },
  ],
}
