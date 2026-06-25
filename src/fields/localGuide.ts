import type { Field, TextFieldSingleValidation } from 'payload'

const googleMapsHostnames = new Set([
  'google.com',
  'www.google.com',
  'maps.google.com',
  'maps.app.goo.gl',
])

export const validateGoogleMapsURL: TextFieldSingleValidation = (value) => {
  if (!value) {
    return 'A Google Maps URL is required'
  }

  try {
    const url = new URL(value)

    if (url.protocol !== 'https:') {
      return 'Use an HTTPS URL'
    }

    if (!googleMapsHostnames.has(url.hostname)) {
      return 'Use a Google Maps URL'
    }

    return true
  } catch {
    return 'Enter a valid URL'
  }
}

export const localGuideField: Field = {
  name: 'localGuide',
  type: 'group',
  label: 'Local guide',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Supports a newline for the intended heading break.',
      },
    },
    {
      name: 'intro',
      type: 'textarea',
      required: true,
    },
    {
      name: 'note',
      type: 'text',
    },
    {
      name: 'categories',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Category',
        plural: 'Categories',
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'places',
          type: 'array',
          minRows: 1,
          labels: {
            singular: 'Place',
            plural: 'Places',
          },
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'area',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              required: true,
              validate: validateGoogleMapsURL,
            },
          ],
        },
      ],
    },
  ],
}
