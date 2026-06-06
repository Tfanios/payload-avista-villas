import type { Field } from 'payload'

export const mapLocation: Field[] = [
  {
    name: 'latitude',
    type: 'number',
    required: true,
    admin: {
      description: 'Pin latitude, for example 40.1969.',
    },
  },
  {
    name: 'longitude',
    type: 'number',
    required: true,
    admin: {
      description: 'Pin longitude, for example 23.7761.',
    },
  },
  {
    name: 'zoom',
    type: 'number',
    defaultValue: 14,
    min: 1,
    max: 20,
  },
  {
    name: 'label',
    type: 'text',
    admin: {
      description: 'Pin tooltip or place name.',
    },
  },
  {
    name: 'directionsQuery',
    type: 'text',
    admin: {
      description: 'Optional directions target. Falls back to latitude and longitude.',
    },
  },
  {
    name: 'staticPreview',
    type: 'upload',
    relationTo: 'media',
    admin: {
      description: 'Static map image shown before the visitor chooses to load the interactive map.',
    },
  },
]
