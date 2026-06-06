// @vitest-environment node

import { getPayload, type Payload } from 'payload'
import config, { disposeLocalCloudflareContext } from '@/payload.config'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  afterAll(async () => {
    await payload?.destroy()
    await disposeLocalCloudflareContext()
  })

  it('registers the public content collections and globals', () => {
    expect(payload.config.collections.map(({ slug }) => slug)).toEqual(
      expect.arrayContaining(['properties', 'reviews', 'enquiries', 'media']),
    )
    expect(payload.config.globals.map(({ slug }) => slug)).toEqual(
      expect.arrayContaining([
        'siteSettings',
        'navigation',
        'footer',
        'home',
        'locationPage',
        'contactPage',
      ]),
    )
  })

  it('allows public property reads', async () => {
    const properties = await payload.find({
      collection: 'properties',
      overrideAccess: false,
    })

    expect(properties.docs).toBeDefined()
  })

  it('allows public enquiry creation but protects enquiry reads', async () => {
    const enquiry = await payload.create({
      collection: 'enquiries',
      overrideAccess: false,
      data: {
        name: 'Integration Test',
        email: 'integration@example.com',
        message: 'Please send details about the villas.',
      },
    })

    expect(enquiry.status).toBe('new')

    await expect(
      payload.find({
        collection: 'enquiries',
        overrideAccess: false,
      }),
    ).rejects.toThrow()

    await payload.delete({
      collection: 'enquiries',
      id: enquiry.id,
    })
  })
})
