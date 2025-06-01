'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import DataTable from '@/components/data-table'
import CircleProgress from '@/components/circular-progress'
import topLearnersData from '@/data/admin-top-learners.json'

const TopLearnersTable = () => {
    const [data, setData] = useState(topLearnersData)

    const jobsColumns = [
        {
            accessorKey: 'fullName',
            header: 'Full Name',
            cell: ({ row }) => {
                const { avatar, fullName, initials, email } = row.original
                return (
                    <div className="flex cursor-pointer items-center gap-3">
                        <Avatar size="default" variant="circle">
                            <AvatarImage
                                src={avatar || '/images/avatar.png'}
                                alt={fullName}
                            />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                            <span className="text-foreground block text-sm font-medium">
                                {fullName}
                            </span>
                            <span className="text-secondary-foreground text-sm">
                                {email}
                            </span>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: 'courseCompleted',
            header: 'Course Completed',
            cell: ({ row }) => {
                return (
                    <p className="text-foreground flex items-center justify-center gap-3 text-sm capitalize">
                        {row.original.courseCompleted}
                    </p>
                )
            },
        },
        {
            accessorKey: 'learningHours',
            header: 'Learning Hourse',
            cell: ({ row }) => {
                const learningHours = row.original.learningHours
                return (
                    <span
                        className={`flex justify-center text-sm ${learningHours ? 'text-foreground' : 'text-muted-foreground'}`}
                    >
                        {learningHours || 'N/A'}
                    </span>
                )
            },
        },
        {
            accessorKey: 'avgScore',
            header: 'Avg.Score',
            cell: ({ row }) => {
                const { avgScore } = row.original
                return (
                    <div className="flex justify-center">
                        <CircleProgress
                            value={avgScore}
                            maxValue={100}
                            progressColor="var(--color-primary)"
                            trackColor="var(--color-muted)"
                            size="33px"
                        />
                    </div>
                )
            },
        },
    ]

    return (
        <DataTable
            data={data}
            columns={jobsColumns}
            showSearch={true}
            initialDisplayCount={10}
            loadMoreCount={5}
            selectableRows={true}
            className="border-none"
        />
    )
}

export default TopLearnersTable
