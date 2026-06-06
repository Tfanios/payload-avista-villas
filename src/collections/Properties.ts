import type { CollectionConfig } from 'payload'

import { isAuthenticated } from '../access/isAuthenticated'
import { mapLocation } from '../fields/mapLocation'
import {
  galleryFields,
  heroFields,
  iconOptions,
  locationFactFields,
  seoFields,
} from '../fields/shared'

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order'],
  },
  access: {
    create: isAuthenticated,
    read: () => true,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'order', type: 'number', defaultValue: 1, index: true },
    { name: 'tag', type: 'text' },
    { name: 'numeral', type: 'text' },
    {
      name: 'hero',
      type: 'group',
      fields: heroFields,
    },
    { name: 'summary', type: 'textarea' },
    { name: 'overview', type: 'richText' },
    {
      name: 'stats',
      type: 'array',
      fields: locationFactFields,
    },
    {
      name: 'amenities',
      type: 'array',
      fields: [
        {
          name: 'iconKey',
          type: 'select',
          options: iconOptions,
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      fields: galleryFields,
    },
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
