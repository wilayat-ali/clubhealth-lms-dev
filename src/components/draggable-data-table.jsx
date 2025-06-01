'use client'

import { useMemo, useState } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'
import { Search, GripVertical } from 'lucide-react'
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
    arrayMove,
} from '@dnd-kit/sortable'
import {
    restrictToVerticalAxis,
    restrictToWindowEdges,
} from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'
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

// Sortable Table Row Component that renders as a proper <tr>
const SortableTableRow = ({ item, children }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: item.id,
        disabled: item.locked,
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <TableRow
            ref={setNodeRef}
            style={style}
            className={isDragging ? 'relative z-50' : ''}
        >
            <TableCell className="w-12 px-2">
                <div
                    {...attributes}
                    {...listeners}
                    className="hover:bg-muted cursor-grab rounded p-1 active:cursor-grabbing"
                >
                    <GripVertical className="text-muted-foreground h-4 w-4" />
                </div>
            </TableCell>
            {children}
        </TableRow>
    )
}

const DraggableDataTable = ({
    data,
    columns,
    searchKey = '',
    showSearch = true,
    initialDisplayCount = 10,
    loadMoreCount = 5,
    children,
    onDataReorder,
}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [displayCount, setDisplayCount] = useState(initialDisplayCount)
    const [isLoading, setIsLoading] = useState(false)
    const [sorting, setSorting] = useState([])
    const [tableData, setTableData] = useState(data)

    // Update table data when prop data changes
    useMemo(() => {
        setTableData(data)
    }, [data])

    // Filtered data
    const filteredData = useMemo(() => {
        if (!searchKey || searchQuery === '') return tableData
        return tableData.filter((item) =>
            item[searchKey]?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [tableData, searchKey, searchQuery])

    // Sorted and paginated data
    const sortedAndVisibleData = useMemo(() => {
        const sortedData = [...filteredData]
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

    // Drag and drop handlers
    const sensors = useSensors(useSensor(PointerSensor))

    const handleDragEnd = ({ active, over }) => {
        if (!over || active.id === over.id) return

        // Find the dragged item
        const activeItem = tableData.find((item) => item.id === active.id)

        // If the dragged item is locked, don't allow movement
        if (activeItem?.locked) return

        const oldIndex = tableData.findIndex((item) => item.id === active.id)
        const newIndex = tableData.findIndex((item) => item.id === over.id)

        if (oldIndex !== -1 && newIndex !== -1) {
            const newData = arrayMove(tableData, oldIndex, newIndex)
            setTableData(newData)

            // Call the callback if provided
            if (onDataReorder) {
                onDataReorder(newData)
            }
        }
    }

    // Add drag handle column to the beginning
    const columnsWithDragHandle = useMemo(
        () => [
            {
                id: 'drag-handle',
                header: '',
                cell: () => null,
                enableSorting: false,
                size: 50,
            },
            ...columns,
        ],
        [columns]
    )

    const table = useReactTable({
        data: sortedAndVisibleData,
        columns: columnsWithDragHandle,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
    })

    return (
        <div className="border-border bg-background rounded-md border">
            <div className="flex flex-col">
                {showSearch && searchKey && (
                    <div className="relative flex items-center">
                        <div className="relative w-full">
                            <Search className="text-muted-foreground absolute top-[14px] left-2.5 h-5 w-5" />
                            <Input
                                type="text"
                                placeholder={searchKey}
                                className="h-12 rounded-none border-0 pl-10 shadow-none focus-visible:ring-0"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="ml-auto">{children}</div>
                    </div>
                )}

                <div className="border-t">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                        modifiers={[
                            restrictToVerticalAxis,
                            restrictToWindowEdges,
                        ]}
                    >
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead
                                                key={header.id}
                                                className="px-4 py-2"
                                                style={{
                                                    width:
                                                        header.id ===
                                                        'drag-handle'
                                                            ? '50px'
                                                            : undefined,
                                                }}
                                            >
                                                {header.id === 'drag-handle' ? (
                                                    ''
                                                ) : !header.column.getCanSort() ? (
                                                    <span className="text-muted-foreground text-xs font-semibold capitalize">
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext()
                                                        )}
                                                    </span>
                                                ) : (
                                                    <Button
                                                        variant="ghost"
                                                        className="text-muted-foreground h-auto p-0 font-semibold capitalize hover:bg-transparent"
                                                        onClick={header.column.getToggleSortingHandler()}
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
                                <SortableContext
                                    items={sortedAndVisibleData.map(
                                        (item) => item.id
                                    )}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {table.getRowModel().rows.length > 0 ? (
                                        table.getRowModel().rows.map((row) => (
                                            <SortableTableRow
                                                key={row.id}
                                                item={row.original}
                                            >
                                                {row
                                                    .getVisibleCells()
                                                    .map((cell) => {
                                                        if (
                                                            cell.column.id ===
                                                            'drag-handle'
                                                        ) {
                                                            return null
                                                        }
                                                        return (
                                                            <TableCell
                                                                className="text-foreground px-4 py-2"
                                                                key={cell.id}
                                                            >
                                                                {flexRender(
                                                                    cell.column
                                                                        .columnDef
                                                                        .cell,
                                                                    cell.getContext()
                                                                )}
                                                            </TableCell>
                                                        )
                                                    })}
                                            </SortableTableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={
                                                    columnsWithDragHandle.length
                                                }
                                                className="h-24 text-center"
                                            >
                                                No results found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </SortableContext>
                            </TableBody>
                        </Table>
                    </DndContext>
                </div>

                {hasMore && (
                    <div className="my-3 flex justify-center">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={handleLoadMore}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'Load More'}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DraggableDataTable
