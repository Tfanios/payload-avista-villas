import type { CollectionConfig } from 'payload'

import { isAuthenticated } from '../access/isAuthenticated'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'preferredProperty', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    {
      name: 'preferredProperty',
      type: 'select',
      options: ['either', 'avista-villa', 'avista-private-resort'],
      defaultValue: 'either',
    },
    { name: 'arrival', type: 'date' },
    { name: 'departure', type: 'date' },
    { name: 'guests', type: 'number', min: 1 },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      options: ['new', 'replied', 'archived'],
      defaultValue: 'new',
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
