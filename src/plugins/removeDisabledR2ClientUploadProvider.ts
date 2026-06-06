import type { PayloadComponent, Plugin } from 'payload'

const r2ClientUploadHandler = '@payloadcms/storage-r2/client#R2ClientUploadHandler'

const hasPath = (component: PayloadComponent): boolean =>
  typeof component === 'string'
    ? component === r2ClientUploadHandler
    : Boolean(component && component.path === r2ClientUploadHandler)

/**
 * The R2 plugin registers its direct-upload client provider even when
 * `clientUploads` is disabled. Removing it keeps server-only Payload
 * dependencies out of the admin browser bundle.
 */
export const removeDisabledR2ClientUploadProvider: Plugin = (config) => {
  if (config.admin?.dependencies) {
    delete config.admin.dependencies[r2ClientUploadHandler]
  }

  if (config.admin?.components?.providers) {
    config.admin.components.providers = config.admin.components.providers.filter(
      (provider) => !hasPath(provider),
    )
  }

  return config
}
