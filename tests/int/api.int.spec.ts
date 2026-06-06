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

  it('groups page and site globals clearly in the admin panel', () => {
    const globalGroups = Object.fromEntries(
      payload.config.globals.map(({ admin, slug }) => [slug, admin?.group]),
    )

    expect(globalGroups).toMatchObject({
      home: 'Pages',
      locationPage: 'Pages',
      contactPage: 'Pages',
      siteSettings: 'Site',
      navigation: 'Site',
      footer: 'Site',
    })
  })

  it('keeps the disabled R2 direct-upload handler out of the admin bundle', () => {
    const r2ClientUploadHandler = '@payloadcms/storage-r2/client#R2ClientUploadHandler'
    const providers = payload.config.admin.components.providers ?? []

    expect(payload.config.admin.dependencies?.[r2ClientUploadHandler]).toBeUndefined()
    expect(
      providers.some((provider) =>
        typeof provider === 'string'
          ? provider === r2ClientUploadHandler
          : Boolean(provider && provider.path === r2ClientUploadHandler),
      ),
    ).toBe(false)
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
