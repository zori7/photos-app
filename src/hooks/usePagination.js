import {useMemo} from "react"

export const usePagination = (
    items,
    page = 1,
    pageSize = 10,
) => {
    let totalPages = Math.ceil(items.length / pageSize)

    const currentPage = useMemo(() => {
        if (page < 1) return 1
        if (page > totalPages) return totalPages

        return page
    }, [page, totalPages])

    const paginatedItems = useMemo(() => {
        let startIndex = (currentPage - 1) * pageSize
        let endIndex = Math.min(startIndex + pageSize - 1, items.length - 1)

        return items.slice(startIndex, endIndex + 1)
    }, [currentPage, items, pageSize])

    return {
        count: totalPages,
        items: paginatedItems
    }
}
