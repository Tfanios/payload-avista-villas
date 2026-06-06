import type { Field } from 'payload'

import { heroMedia } from './heroMedia'

export const iconOptions = [
  'bed',
  'bath',
  'pool',
  'view',
  'kitchen',
  'garden',
  'wifi',
  'parking',
  'accessible',
  'bbq',
  'concierge',
  'chef',
]

/** Shared RowLabel config so collapsed array rows show a real title. */
const rowLabel = (fields: string[], fallback: string) => ({
  path: '/components/RowLabel#RowLabel',
  clientProps: { fields, fallback },
})

export const heroFields: Field[] = [
  ...heroMedia,
  {
    name: 'kicker',
    type: 'text',
    admin: { description: 'Small line displayed above the title.' },
  },
  { name: 'title', type: 'text' },
  {
    name: 'sub',
    type: 'textarea',
    label: 'Subtitle',
    admin: { description: 'Supporting line shown beneath the title.' },
  },
]

export const linkFields: Field[] = [
  { name: 'label', type: 'text', required: true, admin: { description: 'Visible link text.' } },
  { name: 'href', type: 'text', required: true, admin: { description: 'Destination URL or path, e.g. /contact.' } },
]

export const locationFactFields: Field[] = [
  { name: 'value', type: 'text', required: true, admin: { description: 'The figure, e.g. "5 min".' } },
  { name: 'label', type: 'text', required: true, admin: { description: 'What the figure refers to, e.g. "To the beach".' } },
]

export const galleryFields: Field[] = [
  { name: 'image', type: 'upload', relationTo: 'media', required: true },
  {
    name: 'alt',
    type: 'text',
    required: true,
    label: 'Alt text',
    admin: { description: 'Describes the image for accessibility and SEO.' },
  },
  {
    name: 'layout',
    type: 'select',
    options: [
      { label: 'Landscape', value: 'l' },
      { label: 'Portrait', value: 'p' },
      { label: 'Square', value: 's' },
    ],
    defaultValue: 'l',
    admin: { description: 'Aspect ratio used in the gallery grid.' },
  },
  {
    name: 'height',
    type: 'select',
    options: [
      { label: 'Extra small', value: 'h1' },
      { label: 'Small', value: 'h2' },
      { label: 'Medium', value: 'h3' },
      { label: 'Large', value: 'h4' },
      { label: 'Extra large', value: 'h5' },
    ],
    defaultValue: 'h2',
    admin: { description: 'How tall the tile renders.' },
  },
]

export const seoFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Meta title',
    admin: { description: 'Shown in browser tabs and search results. Aim for under 60 characters.' },
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Meta description',
    admin: { description: 'Search result snippet. Aim for 150–160 characters.' },
  },
  {
    name: 'ogImage',
    type: 'upload',
    relationTo: 'media',
    label: 'Social share image',
    admin: { description: 'Preview image used when the page is shared on social media (1200×630 recommended).' },
  },
]

export const serviceFields: Field[] = [
  {
    name: 'iconKey',
    type: 'select',
    label: 'Icon',
    options: iconOptions,
    admin: { description: 'Icon displayed alongside the service.' },
  },
  { name: 'title', type: 'text', required: true },
  { name: 'description', type: 'textarea' },
]

// ---------------------------------------------------------------------------
// Array field factories — centralise labels, collapsed rows, and row titles so
// every page renders the same friendly editing experience.
// ---------------------------------------------------------------------------

export const galleryField: Field = {
  name: 'gallery',
  type: 'array',
  labels: { singular: 'Image', plural: 'Gallery images' },
  admin: {
    description: 'Images shown in the page gallery, in order.',
    initCollapsed: true,
    components: { RowLabel: rowLabel(['alt'], 'Image') },
  },
  fields: galleryFields,
}

export const servicesField: Field = {
  name: 'services',
  type: 'array',
  labels: { singular: 'Service', plural: 'Services' },
  admin: {
    description: 'Highlighted services or amenities.',
    initCollapsed: true,
    components: { RowLabel: rowLabel(['title'], 'Service') },
  },
  fields: serviceFields,
}

export const locationFactsField: Field = {
  name: 'locationFacts',
  type: 'array',
  labels: { singular: 'Fact', plural: 'Location facts' },
  admin: {
    description: 'Short stats about the location, e.g. distance to the beach.',
    initCollapsed: true,
    components: { RowLabel: rowLabel(['label', 'value'], 'Fact') },
  },
  fields: locationFactFields,
}

export const crossLinksField: Field = {
  name: 'crossLinks',
  type: 'array',
  maxRows: 2,
  labels: { singular: 'Link', plural: 'Cross links' },
  admin: {
    description: 'Up to two links to related pages.',
    initCollapsed: true,
    components: { RowLabel: rowLabel(['label'], 'Link') },
  },
  fields: linkFields,
}
