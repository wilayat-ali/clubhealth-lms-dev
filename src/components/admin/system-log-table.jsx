'use client'

import DataTable from '@/components/data-table'
import CustomSelect from '@/components/custom-select'
import systemLogData from '@/data/system-log-data.json'

const SystemLogTable = () => {
    const systemLogColumns = [
        {
            accessorKey: 'time_stamp',
            header: 'Timestamp',
            cell: ({ row }) => {
                return (
                    <div className="text-foreground flex items-center gap-3 text-sm">
                        {row.original.time_stamp}
                    </div>
                )
            },
        },
        {
            accessorKey: 'name',
            header: 'Full Name',
            center: true,
            cell: ({ row }) => {
                return (
                    <div className="text-foreground flex items-center gap-3 text-sm capitalize">
                        {row.original.name}
                    </div>
                )
            },
        },
        {
            accessorKey: 'role',
            header: 'Role',
            center: true,
            cell: ({ row }) => {
                return (
                    <div className="text-foreground flex items-center gap-3 text-sm capitalize">
                        {row.original.role}
                    </div>
                )
            },
        },
        {
            accessorKey: 'actionType',
            header: 'Action Type',
            cell: ({ row }) => (
                <span className="text-foreground text-sm font-medium capitalize">
                    {row.original.actionType}
                </span>
            ),
        },
        {
            accessorKey: 'entity',
            header: 'Entity',
            cell: ({ row }) => (
                <span className="text-foreground text-sm font-medium capitalize">
                    {row.original.entity}
                </span>
            ),
        },
        {
            accessorKey: 'message',
            header: 'Message',
            cell: ({ row }) => (
                <span className="text-foreground text-sm font-medium">
                    {row.original.message}
                </span>
            ),
        },
    ]

    return (
        <div>
            <DataTable
                data={systemLogData}
                columns={systemLogColumns}
                searchKey="Search by name or keyword"
                showSearch={true}
                initialDisplayCount={10}
                loadMoreCount={5}
                selectableRows={true}
                className="data-[placeholder]:text-foreground"
            >
                <div className="flex gap-3 p-2">
                    <div>
                        <CustomSelect
                            placeholder="Last 1 month"
                            options={[
                                { label: 'N/A', value: 'N/A' },
                                { label: 'Yes', value: 'Yes' },
                                { label: 'No', value: 'No' },
                            ]}
                            size="default"
                            className="w-[148px] data-[placeholder]:text-foreground"
                            iconName="calendar-search"
                            iconStyle="text-foreground"
                        />
                    </div>
                    <div>
                        <CustomSelect
                            placeholder="Filter by user type"
                            options={[
                                { label: 'N/A', value: 'N/A' },
                                { label: 'Yes', value: 'Yes' },
                                { label: 'No', value: 'No' },
                            ]}
                            size="default"
                            className="w-[185px] data-[placeholder]:text-foreground"
                            iconName="users"
                            iconStyle="text-foreground"
                        />
                    </div>
                    <div>
                        <CustomSelect
                            placeholder="Filter by action type"
                            options={[
                                { label: 'N/A', value: 'N/A' },
                                { label: 'Yes', value: 'Yes' },
                                { label: 'No', value: 'No' },
                            ]}
                            size="default"
                            iconName="zap"
                            iconStyle="text-foreground"
                            className="w-[195px] data-[placeholder]:text-foreground"
                        />
                    </div>
                </div>
            </DataTable>
        </div>
    )
}

export default SystemLogTable
