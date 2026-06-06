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

export const heroFields: Field[] = [
  ...heroMedia,
  { name: 'kicker', type: 'text' },
  { name: 'title', type: 'text' },
  { name: 'sub', type: 'textarea' },
]

export const linkFields: Field[] = [
  { name: 'label', type: 'text', required: true },
  { name: 'href', type: 'text', required: true },
]

export const locationFactFields: Field[] = [
  { name: 'value', type: 'text', required: true },
  { name: 'label', type: 'text', required: true },
]

export const galleryFields: Field[] = [
  { name: 'image', type: 'upload', relationTo: 'media', required: true },
  { name: 'alt', type: 'text', required: true },
  { name: 'layout', type: 'select', options: ['l', 'p', 's'], defaultValue: 'l' },
  {
    name: 'height',
    type: 'select',
    options: ['h1', 'h2', 'h3', 'h4', 'h5'],
    defaultValue: 'h2',
  },
]

export const seoFields: Field[] = [
  { name: 'title', type: 'text' },
  { name: 'description', type: 'textarea' },
  { name: 'ogImage', type: 'upload', relationTo: 'media' },
]

export const serviceFields: Field[] = [
  {
    name: 'iconKey',
    type: 'select',
    options: iconOptions,
  },
  { name: 'title', type: 'text', required: true },
  { name: 'description', type: 'textarea' },
]
