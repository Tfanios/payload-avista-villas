'use client'

import { useRowLabel } from '@payloadcms/ui'

type RowLabelProps = {
  /** Field names to use as the row title, in priority order. */
  fields?: string[]
  /** Word shown before the row number when no field value is set. */
  fallback?: string
}

/**
 * Renders a meaningful title for collapsed array rows in the admin UI
 * (e.g. the service title) instead of the generic "Item 01".
 */
export const RowLabel: React.FC<RowLabelProps> = ({ fields = ['title', 'label'], fallback = 'Item' }) => {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>()
  const number = String((rowNumber ?? 0) + 1).padStart(2, '0')

  const value = fields
    .map((field) => data?.[field])
    .find((candidate) => typeof candidate === 'string' && candidate.trim().length > 0)

  return <span>{(value as string) || `${fallback} ${number}`}</span>
}
