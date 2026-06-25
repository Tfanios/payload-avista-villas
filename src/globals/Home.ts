import type { GlobalConfig } from 'payload'

import { canReadPublicly, isAuthenticated } from '../access/isAuthenticated'
import {
  galleryField,
  heroFields,
  locationFactsField,
  servicesField,
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
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          description: 'Everything visitors see on the home page, top to bottom.',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Hero',
              admin: { description: 'The full-width banner at the top of the page.' },
              fields: heroFields,
            },
            {
              name: 'intro',
              type: 'group',
              label: 'Introduction',
              admin: { description: 'Opening statement shown below the hero.' },
              fields: [
                {
                  name: 'lead',
                  type: 'textarea',
                  admin: { description: 'Short lead-in sentence.' },
                },
                { name: 'statement', type: 'richText' },
              ],
            },
            {
              name: 'villas',
              type: 'group',
              label: 'Villas comparison',
              admin: {
                description:
                  'Frames the villa comparison section. Optional section copy, plus which villas to feature and in what order.',
              },
              fields: [
                {
                  name: 'kicker',
                  type: 'text',
                  admin: { description: 'Small line displayed above the title.' },
                },
                { name: 'title', type: 'text' },
                {
                  name: 'body',
                  type: 'textarea',
                  admin: { description: 'Short intro paragraph for the section.' },
                },
                {
                  name: 'featured',
                  type: 'relationship',
                  relationTo: 'properties',
                  hasMany: true,
                  label: 'Featured villas',
                  admin: {
                    description:
                      'Villas shown on the home page, in this order. Leave empty to show all properties by their order.',
                  },
                },
              ],
            },
            galleryField,
            servicesField,
            {
              name: 'locationSummary',
              type: 'textarea',
              label: 'Location summary',
              admin: { description: 'Intro paragraph for the location section.' },
            },
            locationFactsField,
            {
              name: 'cta',
              type: 'group',
              label: 'Call to action',
              admin: { description: 'Closing prompt that encourages visitors to get in touch.' },
              fields: [
                { name: 'title', type: 'text' },
                { name: 'body', type: 'textarea' },
                { name: 'buttonLabel', type: 'text', label: 'Button label' },
              ],
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
