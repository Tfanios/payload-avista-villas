import type { Field } from 'payload'

export const heroMedia: Field[] = [
  {
    name: 'imageDesktop',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Shown at 768px and above and used as the video poster/fallback.',
    },
  },
  {
    name: 'imageMobile',
    type: 'upload',
    relationTo: 'media',
    admin: {
      description: 'Portrait-friendly crop shown below 768px. Falls back to the desktop image.',
    },
  },
  {
    name: 'videoDesktop',
    type: 'text',
    admin: {
      description: 'Optional R2 URL for the desktop hero video.',
    },
  },
  {
    name: 'videoMobile',
    type: 'text',
    admin: {
      description: 'Optional lighter R2 video URL for phones.',
    },
  },
  {
    name: 'playOnMobile',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      description: 'Keep off to prevent phones from downloading hero video.',
    },
  },
  {
    name: 'priority',
    type: 'checkbox',
    defaultValue: true,
    admin: {
      description: 'Marks this hero as the above-the-fold image the front end should preload.',
    },
  },
]
