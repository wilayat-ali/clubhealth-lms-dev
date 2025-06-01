'use client'

import { useMemo, useState } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'
import { Search } from 'lucide-react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const DataTable = ({
    data,
    columns,
    searchKey = '',
    showSearch = true,
    initialDisplayCount = 10,
    loadMoreCount = 5,
    children,
    className,
}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [displayCount, setDisplayCount] = useState(initialDisplayCount)
    const [isLoading, setIsLoading] = useState(false)
    const [sorting, setSorting] = useState([])

    const filteredData = useMemo(() => {
        if (!searchKey || searchQuery === '') return data
        return data.filter((item) =>
            item[searchKey]?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [data, searchKey, searchQuery])

    const sortedAndVisibleData = useMemo(() => {
        let sortedData = [...filteredData]
        if (sorting.length > 0) {
            const { id, desc } = sorting[0]
            sortedData.sort((a, b) => {
                if (a[id] < b[id]) return desc ? 1 : -1
                if (a[id] > b[id]) return desc ? -1 : 1
                return 0
            })
        }
        return sortedData.slice(0, displayCount)
    }, [filteredData, sorting, displayCount])

    const hasMore = displayCount < filteredData.length

    const handleLoadMore = () => {
        if (isLoading) return
        setIsLoading(true)
        setTimeout(() => {
            setDisplayCount((prev) => prev + loadMoreCount)
            setIsLoading(false)
        }, 500)
    }

    useMemo(() => {
        setDisplayCount(initialDisplayCount)
    }, [searchQuery, initialDisplayCount])

    const table = useReactTable({
        data: sortedAndVisibleData,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
    })

    return (
        <div
            className={cn(
                'border-border bg-background rounded-md border',
                className
            )}
        >
            <div className="flex flex-col">
                {showSearch && searchKey && (
                    <div className="relative flex items-center">
                        <div className="relative w-full">
                            <Search className="text-muted-foreground absolute top-[14px] left-2.5 size-5" />
                            <Input
                                type="text"
                                placeholder={`${searchKey}`}
                                className="h-12 rounded-none border-0 pl-10 shadow-none focus-visible:ring-0"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="ml-auto">{children}</div>
                    </div>
                )}

                <div className={`border-t ${className}`}>
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className={`px-4 py-2 ${header?.column?.columnDef.center ? 'text-center' : ''}`}
                                        >
                                            {!header.column.getCanSort() ? (
                                                <span className="text-muted-foreground text-xs font-semibold capitalize">
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                </span>
                                            ) : (
                                                <Button
                                                    variant="ghost"
                                                    className="text-muted-foreground h-auto p-0 font-semibold hover:bg-transparent"
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    icon="arrow-up-down"
                                                    iconPosition="right"
                                                    size="sm"
                                                >
                                                    <span className="text-muted-foreground">
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext()
                                                        )}
                                                    </span>
                                                </Button>
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map((row, index) => (
                                    <TableRow
                                        key={row.id}
                                        className={cn(
                                            index % 2 === 0
                                                ? 'bg-background'
                                                : 'bg-muted/50',
                                            'hover:!bg-primary/5 transition-colors duration-150'
                                        )}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className={`text-foreground px-4 ${cell.column.columnDef.center ? 'text-center' : ''}`}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        <NoRecordFound
                                            imageSrc="./no-data-found"
                                            imageHeight={200}
                                            imageWidth={200}
                                            heading="No Records Found"
                                            description="There is no Data available"
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {hasMore && (
                    <div className="border-border flex justify-center border-t py-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={handleLoadMore}
                            disabled={isLoading}
                            icon="arrow-down"
                        >
                            {isLoading ? 'Loading...' : 'Load More'}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DataTable
