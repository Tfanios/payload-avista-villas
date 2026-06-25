'use client'

import { useTableColumns } from '@payloadcms/ui'
import { useEffect, useRef } from 'react'

/**
 * Payload allows a saved list preference to disable every column. That leaves
 * populated rows without a visible title or edit link. Restore the collection's
 * configured default columns whenever that invalid state is encountered.
 */
export const EnsureVisibleListColumns = (): null => {
  const { columns, resetColumnsState } = useTableColumns()
  const isResetting = useRef(false)
  const hasVisibleColumn = columns?.some((column) => column.active)

  useEffect(() => {
    if (!columns?.length || hasVisibleColumn) {
      isResetting.current = false
      return
    }

    if (isResetting.current) {
      return
    }

    isResetting.current = true
    void resetColumnsState().catch(() => {
      isResetting.current = false
    })
  }, [columns?.length, hasVisibleColumn, resetColumnsState])

  return null
}

export default EnsureVisibleListColumns
