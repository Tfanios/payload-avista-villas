import { act, createElement } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const useTableColumns = vi.hoisted(() => vi.fn())

vi.mock('@payloadcms/ui', () => ({
  useTableColumns,
}))

import { EnsureVisibleListColumns } from '@/components/admin/EnsureVisibleListColumns'

;(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean })
  .IS_REACT_ACT_ENVIRONMENT = true

describe('EnsureVisibleListColumns', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
  })

  afterEach(() => {
    act(() => {
      root.unmount()
    })
    container.remove()
    vi.clearAllMocks()
  })

  it('restores defaults when every saved column is disabled', async () => {
    const resetColumnsState = vi.fn().mockResolvedValue(undefined)
    useTableColumns.mockReturnValue({
      columns: [
        { accessor: 'name', active: false },
        { accessor: 'slug', active: false },
      ],
      resetColumnsState,
    })

    await act(async () => {
      root.render(createElement(EnsureVisibleListColumns))
    })

    expect(resetColumnsState).toHaveBeenCalledTimes(1)
  })

  it('preserves a valid column selection', async () => {
    const resetColumnsState = vi.fn().mockResolvedValue(undefined)
    useTableColumns.mockReturnValue({
      columns: [
        { accessor: 'name', active: true },
        { accessor: 'slug', active: false },
      ],
      resetColumnsState,
    })

    await act(async () => {
      root.render(createElement(EnsureVisibleListColumns))
    })

    expect(resetColumnsState).not.toHaveBeenCalled()
  })
})
