import type { CollectionConfig } from 'payload'

import { isAuthenticated } from '../access/isAuthenticated'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Content',
  },
  access: {
    create: isAuthenticated,
    read: () => true,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'blurDataURL',
      type: 'text',
      admin: {
        description: 'Optional low-quality placeholder populated by the media import pipeline.',
        hidden: true,
        readOnly: true,
      },
    },
  ],
  upload: {
    // Sharp-based focal point cropping and image sizes are not supported in Cloudflare Workers.
    // Store originals in R2 and use Cloudflare Image Resizing for responsive variants.
    crop: false,
    focalPoint: false,
  },
}
