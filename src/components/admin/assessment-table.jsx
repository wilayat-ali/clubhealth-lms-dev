'use client'

import { useState } from 'react'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/data-table'
import CustomSelect from '@/components/custom-select'
import CircleProgress from '@/components/circular-progress'
import AssessmentViewDrawer from '@/components/drawers/assessment-view-drawer'
import learnerData from '@/data/admin-assessment-data.json'

const AssessmentTable = () => {
    const [data, setData] = useState(learnerData)
    const [openDrawer, setOpenDrawer] = useState(false)
    const dotColorMap = {
        draft: 'bg-muted-foreground',
        active: 'bg-status-green',
    }
    const statusDotColor = (status) => dotColorMap[status] || ''

    const assessmentTableColumns = [
        {
            accessorKey: 'title',
            header: 'Title',
            cell: ({ row }) => {
                const { fullName, subtitle } = row.original
                return (
                    <div
                        className="cursor-pointer"
                        onClick={() => setOpenDrawer(true)}
                    >
                        <span className="text-foreground block text-sm font-medium capitalize">
                            {fullName}
                        </span>
                        <span className="text-secondary-foreground text-sm capitalize">
                            {subtitle}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: 'avgScore',
            header: 'Avg.Score',
            cell: ({ row }) => {
                const { avgScore } = row.original
                return (
                    <CircleProgress
                        value={avgScore}
                        maxValue={100}
                        progressColor="var(--color-primary)"
                        trackColor="var(--color-muted)"
                        size="33px"
                    />
                )
            },
        },
        {
            accessorKey: 'avgTimeSpent',
            header: 'Avg. Time Spent',
            center: true,
            cell: ({ row }) => {
                const avgTimeSpent = row.original.avgTimeSpent
                return (
                    <span
                        className={`text-sm ${avgTimeSpent ? 'text-foreground' : 'text-muted-foreground'}`}
                    >
                        {avgTimeSpent || 'N/A'}
                    </span>
                )
            },
        },
        {
            accessorKey: 'avgAttempts',
            header: 'Avg. Attempts',
            center: true,
            cell: ({ row }) => {
                const { avgAttempts } = row.original
                return (
                    <span
                        className={`text-sm ${avgAttempts ? 'text-foreground' : 'text-muted-foreground'}`}
                    >
                        {avgAttempts || 'N/A'}
                    </span>
                )
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            sortable: true,
            cell: ({ row }) => {
                const status = row.original.status
                return (
                    <Badge
                        variant="outline"
                        status={true}
                        className="rounded-full"
                        dotColor={statusDotColor(status)}
                    >
                        <span className="capitalize">{status}</span>
                    </Badge>
                )
            },
        },
        {
            accessorKey: 'lastUpdated',
            header: 'Last Updated',
            cell: ({ row }) => {
                const lastUpdated = row.original.lastUpdated
                return (
                    <span
                        className={`text-sm ${lastUpdated ? 'text-foreground' : 'text-muted-foreground'}`}
                    >
                        {lastUpdated || 'N/A'}
                    </span>
                )
            },
        },
        {
            id: 'actions',
            cell: () => {
                const handleViewAssessment = () => {
                    setOpenDrawer(true)
                }
                return (
                    <div className="text-foreground flex justify-end gap-3">
                        <Button
                            className="hover:bg-border cursor-pointer rounded-md p-2"
                            variant="outlined"
                            onClick={() => handleViewAssessment()}
                            icon="eye"
                            iconStyle={`!size-5 text-foreground `}
                        />
                        <Link href={`/admin/assessments/add-assessment/123`}>
                            <Button
                                className="hover:bg-border cursor-pointer rounded-md p-2"
                                variant="outlined"
                                iconStyle={`!size-5 text-foreground`}
                                icon="square-pen"
                            />
                        </Link>
                    </div>
                )
            },
        },
    ]

    return (
        <div>
            <DataTable
                data={data}
                columns={assessmentTableColumns}
                searchKey="Search by name or keyword"
                showSearch={true}
                initialDisplayCount={10}
                loadMoreCount={5}
                selectableRows={true}
            >
                <div className="flex gap-3 p-2">
                    <CustomSelect
                        placeholder="Filter by Status"
                        options={[
                            { label: 'N/A', value: 'N/A' },
                            { label: 'Yes', value: 'Yes' },
                            { label: 'No', value: 'No' },
                        ]}
                        size="default"
                        className="w-[170px]"
                        iconName="lock"
                    />

                    <CustomSelect
                        placeholder="Filter by Course Association"
                        options={[
                            { label: 'N/A', value: 'N/A' },
                            { label: 'Yes', value: 'Yes' },
                            { label: 'No', value: 'No' },
                        ]}
                        size="default"
                        iconName="library"
                        className="w-[250px]"
                    />
                </div>
            </DataTable>
            <AssessmentViewDrawer
                open={openDrawer}
                onOpenChange={setOpenDrawer}
            />
        </div>
    )
}

export default AssessmentTable
