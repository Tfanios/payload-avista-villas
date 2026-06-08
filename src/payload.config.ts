import fs from 'fs'
import path from 'path'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig, type PayloadLogger } from 'payload'
import { fileURLToPath } from 'url'
import { getCloudflareContext, type CloudflareContext } from '@opennextjs/cloudflare'
import type { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Enquiries } from './collections/Enquiries'
import { Properties } from './collections/Properties'
import { Reviews } from './collections/Reviews'
import { ContactPage } from './globals/ContactPage'
import { Footer } from './globals/Footer'
import { Home } from './globals/Home'
import { LocationPage } from './globals/LocationPage'
import { Navigation } from './globals/Navigation'
import { SiteSettings } from './globals/SiteSettings'
import { migrations } from './migrations'
import { removeDisabledR2ClientUploadProvider } from './plugins/removeDisabledR2ClientUploadProvider'
import { triggerDeployOnContentChange } from './plugins/triggerDeployOnContentChange'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const realpath = (value: string) => (fs.existsSync(value) ? fs.realpathSync(value) : undefined)

const isCLI = process.argv.some((value) => realpath(value).endsWith(path.join('payload', 'bin.js')))
const isProduction = process.env.NODE_ENV === 'production'
const isNextBuild =
  process.env.NEXT_PHASE === 'phase-production-build' ||
  process.env.NEXT_PRIVATE_BUILD_WORKER === '1'

const createLog =
  (level: string, fn: typeof console.log) => (objOrMsg: object | string, msg?: string) => {
    if (typeof objOrMsg === 'string') {
      fn(JSON.stringify({ level, msg: objOrMsg }))
    } else {
      fn(JSON.stringify({ level, ...objOrMsg, msg: msg ?? (objOrMsg as { msg?: string }).msg }))
    }
  }

const cloudflareLogger = {
  level: process.env.PAYLOAD_LOG_LEVEL || 'info',
  trace: createLog('trace', console.debug),
  debug: createLog('debug', console.debug),
  info: createLog('info', console.log),
  warn: createLog('warn', console.warn),
  error: createLog('error', console.error),
  fatal: createLog('fatal', console.error),
  silent: () => {},
} as unknown as PayloadLogger

let localCloudflareContext: (CloudflareContext & { dispose?: () => Promise<void> }) | undefined
const cloudflare = await getCloudflareContextForPayload()

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Avista Villas',
    },
    components: {
      graphics: {
        Logo: '/components/admin/Logo#Logo',
        Icon: '/components/admin/Icon#Icon',
      },
      beforeLogin: ['/components/admin/BeforeLogin#BeforeLogin'],
      beforeDashboard: ['/components/admin/BeforeDashboard#BeforeDashboard'],
    },
  },
  collections: [Users, Media, Properties, Reviews, Enquiries],
  globals: [SiteSettings, Navigation, Footer, Home, LocationPage, ContactPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({
    binding: cloudflare.env.D1,
    prodMigrations: migrations,
    push: false,
  }),
  logger: isProduction ? cloudflareLogger : undefined,
  plugins: [
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
    removeDisabledR2ClientUploadProvider,
    triggerDeployOnContentChange,
  ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextForPayload(): Promise<CloudflareContext> {
  if (isNextBuild) {
    return Promise.resolve({
      env: {
        D1: createBuildTimeBinding<D1Database>('D1'),
        R2: createBuildTimeBinding<R2Bucket>('R2'),
      } as CloudflareEnv,
      cf: undefined,
      ctx: createBuildTimeBinding<ExecutionContext>('ExecutionContext'),
    })
  }

  return isCLI || !isProduction
    ? getCloudflareContextFromWrangler()
    : getCloudflareContext({ async: true })
}

function createBuildTimeBinding<T>(name: string): T {
  return new Proxy((): undefined => undefined, {
    apply: () => {
      throw new Error(`${name} binding is not available while Next.js is building.`)
    },
    get: (_target, property): unknown => {
      if (property === 'then') {
        return undefined
      }

      return createBuildTimeBinding(`${name}.${String(property)}`)
    },
  }) as T
}

async function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  const { getPlatformProxy } = await import(
    /* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`
  )
  const context = await getPlatformProxy({
    remoteBindings: isProduction,
  } satisfies GetPlatformProxyOptions)

  localCloudflareContext = context

  return context
}

export async function disposeLocalCloudflareContext(): Promise<void> {
  await localCloudflareContext?.dispose?.()
  localCloudflareContext = undefined
}
