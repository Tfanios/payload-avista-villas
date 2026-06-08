import type {
  Access,
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
  Plugin,
} from 'payload'

const publishableCollectionSlugs = new Set(['properties', 'reviews'])
const publicGlobalSlugs = new Set([
  'siteSettings',
  'navigation',
  'footer',
  'home',
  'locationPage',
  'contactPage',
])

const isAuthenticated: Access = ({ req }) => Boolean(req.user)
const isTrue = (value: unknown): boolean => value === true || value === 'true'

const canReadPublishedCollection: Access = ({ req }) =>
  req.user
    ? true
    : {
        _status: {
          equals: 'published',
        },
      }

const canReadPublishedGlobal: Access = ({ req }) => Boolean(req.user) || !isTrue(req.query.draft)

const changesPublishedContent = (doc: Record<string, unknown>, req: PayloadRequest): boolean =>
  doc._status === 'published' || isTrue(req.query.unpublishAllLocales)

const triggerDeploy = async (req: PayloadRequest, source: string): Promise<void> => {
  const deployHook = process.env.DEPLOY_HOOK

  if (!deployHook) {
    req.payload.logger.warn({
      msg: 'Skipped deploy hook because DEPLOY_HOOK is not configured',
      source,
    })
    return
  }

  try {
    const response = await fetch(deployHook, { method: 'POST' })

    if (!response.ok) {
      throw new Error(`Deploy hook returned HTTP ${response.status}`)
    }

    req.payload.logger.info({
      msg: 'Triggered Cloudflare deploy hook',
      source,
    })
  } catch (error) {
    req.payload.logger.error({
      error: error instanceof Error ? error.message : String(error),
      msg: 'Failed to trigger Cloudflare deploy hook',
      source,
    })
  }
}

const collectionAfterChange =
  (slug: string): CollectionAfterChangeHook =>
  async ({ doc, req }) => {
    if (!changesPublishedContent(doc, req)) {
      return
    }

    await triggerDeploy(req, `collection:${slug}`)
  }

const collectionAfterDelete =
  (slug: string): CollectionAfterDeleteHook =>
  async ({ req }) => {
    await triggerDeploy(req, `collection:${slug}`)
  }

const globalAfterChange =
  (slug: string): GlobalAfterChangeHook =>
  async ({ doc, req }) => {
    if (!changesPublishedContent(doc, req)) {
      return
    }

    await triggerDeploy(req, `global:${slug}`)
  }

export const triggerDeployOnContentChange: Plugin = (config) => {
  config.collections = config.collections?.map((collection) => {
    if (!publishableCollectionSlugs.has(collection.slug)) {
      return collection
    }

    return {
      ...collection,
      access: {
        ...collection.access,
        read: canReadPublishedCollection,
        readVersions: isAuthenticated,
      },
      versions: {
        drafts: {
          validate: true,
        },
        maxPerDoc: 20,
      },
      hooks: {
        ...collection.hooks,
        afterChange: [
          ...(collection.hooks?.afterChange ?? []),
          collectionAfterChange(collection.slug),
        ],
        afterDelete: [
          ...(collection.hooks?.afterDelete ?? []),
          collectionAfterDelete(collection.slug),
        ],
      },
    }
  })

  config.globals = config.globals?.map((global) => {
    if (!publicGlobalSlugs.has(global.slug)) {
      return global
    }

    return {
      ...global,
      access: {
        ...global.access,
        read: canReadPublishedGlobal,
        readVersions: isAuthenticated,
      },
      versions: {
        drafts: {
          validate: true,
        },
        max: 20,
      },
      hooks: {
        ...global.hooks,
        afterChange: [...(global.hooks?.afterChange ?? []), globalAfterChange(global.slug)],
      },
    }
  })

  return config
}
