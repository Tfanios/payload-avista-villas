import type { GlobalConfig } from 'payload'

import { canReadPublicly, isAuthenticated } from '../access/isAuthenticated'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  access: {
    read: canReadPublicly,
    update: isAuthenticated,
  },
  fields: [
    { name: 'brandName', type: 'text', defaultValue: 'Avista' },
    { name: 'tagline', type: 'text', defaultValue: 'Two private villas by the Aegean' },
    { name: 'contactEmail', type: 'email', defaultValue: 'stay@avista.gr' },
    { name: 'phone', type: 'text' },
    { name: 'address', type: 'textarea', defaultValue: 'Vourvourou 630 78, Halkidiki, Greece' },
    { name: 'copyright', type: 'text', defaultValue: '© 2026 Avista Villas' },
    {
      name: 'locationSlogan',
      type: 'text',
      defaultValue: 'Vourvourou · Sithonia · Halkidiki',
    },
    {
      name: 'weather',
      type: 'group',
      fields: [
        { name: 'latitude', type: 'number', defaultValue: 40.1969 },
        { name: 'longitude', type: 'number', defaultValue: 23.7761 },
      ],
    },
    {
      name: 'defaultSeo',
      type: 'group',
      fields: [
        { name: 'titleTemplate', type: 'text', defaultValue: 'Avista | %s' },
        { name: 'description', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
