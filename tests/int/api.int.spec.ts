// @vitest-environment node

import { getPayload, type Payload } from 'payload'
import config, { disposeLocalCloudflareContext } from '@/payload.config'
import type { LocationPage } from '@/payload-types'

import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

let payload: Payload
type LocalGuide = LocationPage['localGuide']

const editableGuide = (): LocalGuide => ({
  enabled: false,
  title: 'Edited local guide',
  intro: 'Editor-managed recommendations.',
  note: '',
  categories: [
    {
      title: 'Restaurants',
      description: 'Dinner recommendations.',
      places: [
        {
          name: 'Melia',
          description: 'Dinner beneath the trees',
          area: 'Vourvourou',
          href: 'https://www.google.com/maps/search/?api=1&query=Melia+Restaurant+Vourvourou',
        },
        {
          name: 'Paris Restaurant',
          description: 'Greek cooking and grilled seafood',
          area: 'Vourvourou',
          href: 'https://www.google.com/maps/search/?api=1&query=Paris+Restaurant+Vourvourou',
        },
      ],
    },
    {
      title: 'Beaches',
      description: 'Nearby swimming spots.',
      places: [
        {
          name: 'Karidi Beach',
          description: 'Pale sand, pines and calm shallows',
          area: 'Vourvourou',
          href: 'https://www.google.com/maps/search/?api=1&query=Karidi+Beach+Vourvourou',
        },
      ],
    },
  ],
})

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

  it('keeps villa titles as the first clickable property-list column', () => {
    const properties = payload.config.collections.find(({ slug }) => slug === 'properties')

    expect(properties?.admin?.useAsTitle).toBe('name')
    expect(properties?.admin?.defaultColumns).toEqual(['name', 'slug', 'order'])
  })

  it('enables drafts and version history for publishable content', () => {
    const publishableCollections = payload.config.collections.filter(({ slug }) =>
      ['properties', 'reviews'].includes(slug),
    )

    expect(
      publishableCollections.every(
        (collection) => collection.versions?.drafts && collection.versions.drafts.validate === true,
      ),
    ).toBe(true)
    expect(
      payload.config.globals.every(
        (global) => global.versions?.drafts && global.versions.drafts.validate === true,
      ),
    ).toBe(true)
  })

  it('triggers deploys for publish and unpublish but not draft saves', async () => {
    const properties = payload.config.collections.find(({ slug }) => slug === 'properties')
    const afterChange = properties?.hooks?.afterChange?.at(-1)
    const originalDeployHook = process.env.DEPLOY_HOOK
    process.env.DEPLOY_HOOK = 'https://example.com/deploy'
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(null, { status: 200 }))

    try {
      await afterChange?.({ doc: { _status: 'draft' }, req: { payload, query: {} } } as never)
      expect(fetchMock).not.toHaveBeenCalled()

      await afterChange?.({ doc: { _status: 'published' }, req: { payload, query: {} } } as never)
      expect(fetchMock).toHaveBeenCalledWith(process.env.DEPLOY_HOOK, { method: 'POST' })

      await afterChange?.({
        doc: { _status: 'draft' },
        req: { payload, query: { unpublishAllLocales: 'true' } },
      } as never)
      expect(fetchMock).toHaveBeenCalledTimes(2)
    } finally {
      fetchMock.mockRestore()
      if (originalDeployHook === undefined) {
        delete process.env.DEPLOY_HOOK
      } else {
        process.env.DEPLOY_HOOK = originalDeployHook
      }
    }
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

  it('allows public users to read the seeded local guide', async () => {
    const locationPage = await payload.findGlobal({
      slug: 'locationPage',
      overrideAccess: false,
    })

    expect(locationPage.localGuide).toMatchObject({
      enabled: true,
      title: 'A few places\nto begin.',
      note: 'Each name opens in Google Maps.',
    })
    expect(locationPage.localGuide.categories).toHaveLength(3)
    expect(locationPage.localGuide.categories?.map(({ title }) => title)).toEqual([
      'Beaches',
      'Restaurants',
      'Bars by the water',
    ])
    expect(locationPage.localGuide.categories?.flatMap(({ places }) => places ?? [])).toHaveLength(
      9,
    )
  })

  it('allows editors to reorder, update, and remove local guide entries', async () => {
    const original = await payload.findGlobal({
      slug: 'locationPage',
      draft: true,
    })
    const editor = {
      id: 1,
      collection: 'users',
      email: 'editor@example.com',
    }

    try {
      const reordered = await payload.updateGlobal({
        slug: 'locationPage',
        data: {
          localGuide: editableGuide(),
        },
        draft: true,
        overrideAccess: false,
        overrideLock: true,
        user: editor as never,
      })

      expect(reordered.localGuide.enabled).toBe(false)
      expect(reordered.localGuide.note === '' || reordered.localGuide.note == null).toBe(true)
      expect(reordered.localGuide.categories?.map(({ title }) => title)).toEqual([
        'Restaurants',
        'Beaches',
      ])
      expect(reordered.localGuide.categories?.[0]?.places?.map(({ name }) => name)).toEqual([
        'Melia',
        'Paris Restaurant',
      ])

      const reduced = await payload.updateGlobal({
        slug: 'locationPage',
        data: {
          localGuide: {
            ...editableGuide(),
            title: 'Reduced local guide',
            categories: [
              editableGuide().categories?.[1] as NonNullable<LocalGuide['categories']>[0],
            ],
          },
        },
        draft: true,
        overrideAccess: false,
        overrideLock: true,
        user: editor as never,
      })

      expect(reduced.localGuide.title).toBe('Reduced local guide')
      expect(reduced.localGuide.categories).toHaveLength(1)
      expect(reduced.localGuide.categories?.[0]?.places).toHaveLength(1)
    } finally {
      await payload.updateGlobal({
        slug: 'locationPage',
        data: {
          localGuide: original.localGuide,
        },
        draft: true,
        overrideAccess: true,
        overrideLock: true,
      })
    }
  })

  it('rejects invalid and non-HTTPS local guide map URLs', async () => {
    const invalidGuide = editableGuide()
    const invalidPlace = invalidGuide.categories?.[0]?.places?.[0]

    if (!invalidPlace) {
      throw new Error('Local guide test fixture is missing a place')
    }

    invalidPlace.href = 'not-a-url'
    await expect(
      payload.updateGlobal({
        slug: 'locationPage',
        data: { localGuide: invalidGuide },
        draft: true,
        overrideAccess: true,
        overrideLock: true,
      }),
    ).rejects.toThrow()

    invalidPlace.href = 'http://www.google.com/maps/search/?api=1&query=Melia+Restaurant+Vourvourou'
    await expect(
      payload.updateGlobal({
        slug: 'locationPage',
        data: { localGuide: invalidGuide },
        draft: true,
        overrideAccess: true,
        overrideLock: true,
      }),
    ).rejects.toThrow()

    invalidPlace.href = 'https://example.com/not-google-maps'
    await expect(
      payload.updateGlobal({
        slug: 'locationPage',
        data: { localGuide: invalidGuide },
        draft: true,
        overrideAccess: true,
        overrideLock: true,
      }),
    ).rejects.toThrow()
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
