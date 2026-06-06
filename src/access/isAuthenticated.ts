import type { Access, GlobalConfig } from 'payload'

export const isAuthenticated: Access = ({ req }) => Boolean(req.user)

export const canReadPublicly: NonNullable<GlobalConfig['access']>['read'] = () => true
