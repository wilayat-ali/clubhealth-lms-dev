'use client'

import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import DataTable from '@/components/data-table'
import CustomSelect from '@/components/custom-select'
import CircleProgress from '@/components/circular-progress'
import NewMessageForm from '@/components/dialogs/new-message'
import LearnerProfileDrawer from '@/components/drawers/learner-profile-drawer'
import UpdateLearnerProfileDialog from '@/components/dialogs/update-learner-profile-dialog'
import learnerData from '@/data/admin-learner-data.json'

const LearnerTable = () => {
    const [data, setData] = useState(learnerData)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [openMessageDialog, setOpenMessageDialog] = useState(false)
    const [learnerRowData, setLearnerRowData] = useState(null)
    const [openLearnerProfileDialog, setOpenLearnerProfileDialog] =
        useState(false)

    const dotColorMap = {
        pending: 'bg-primary',
        blocked: 'bg-status-red',
        active: 'bg-status-green',
    }
    const statusDotColor = (status) => dotColorMap[status] || ''

    const jobsColumns = [
        {
            accessorKey: 'fullName',
            header: 'Full Name',
            cell: ({ row }) => {
                const { avatar, fullName, initials, email } = row.original
                return (
                    <div
                        className="flex cursor-pointer items-center gap-3"
                        onClick={() => setOpenDrawer(true)}
                    >
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
            accessorKey: 'learnerGroup',
            header: 'Learner Group',
            cell: ({ row }) => {
                return (
                    <p className="text-foreground flex items-center gap-3 text-sm capitalize">
                        {row.original.learnerGroup}
                    </p>
                )
            },
        },
        {
            accessorKey: 'courseCompleted',
            header: 'Course Completed',
            center: true,
            cell: ({ row }) => {
                return (
                    <p className="text-foreground flex items-center gap-3 text-sm capitalize">
                        {row.original.courseCompleted}
                    </p>
                )
            },
        },
        {
            accessorKey: 'learningHours',
            header: 'Learning Hourse',
            center: true,
            cell: ({ row }) => {
                const learningHours = row.original.learningHours
                return (
                    <span
                        className={`text-sm ${learningHours ? 'text-foreground' : 'text-muted-foreground'}`}
                    >
                        {learningHours || 'N/A'}
                    </span>
                )
            },
        },
        {
            accessorKey: 'avgScore',
            header: 'Avg.Score',
            center: true,
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
            accessorKey: 'status',
            header: 'Status',
            center: true,
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
                        <span className="capitalize">{String(status)}</span>
                    </Badge>
                )
            },
        },
        {
            accessorKey: 'joinDate',
            header: 'Join Date',
            center: true,
            cell: ({ row }) => {
                const joinDate = row.original.joinDate
                return (
                    <span
                        className={`text-sm ${joinDate ? 'text-foreground' : 'text-muted-foreground'}`}
                    >
                        {joinDate || 'N/A'}
                    </span>
                )
            },
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => {
                const handleLearnerStatusModal = (row) => {
                    setLearnerRowData({
                        status: row.status,
                        group: row.learnerGroup,
                    })
                    setOpenLearnerProfileDialog(true)
                }

                return (
                    <div className="text-muted-foreground flex justify-end gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            icon="settings-2"
                            onClick={() =>
                                handleLearnerStatusModal(row.original)
                            }
                        />

                        <Button
                            variant="ghost"
                            size="icon"
                            icon="message-square-plus"
                            onClick={() => setOpenMessageDialog(true)}
                        />

                        <Button
                            variant="ghost"
                            size="icon"
                            icon="eye"
                            onClick={() => setOpenDrawer(true)}
                        />
                    </div>
                )
            },
        },
    ]

    return (
        <div>
            <DataTable
                data={data}
                columns={jobsColumns}
                searchKey="Search by name or keyword"
                showSearch={true}
                initialDisplayCount={10}
                loadMoreCount={5}
                selectableRows={true}
            >
                <div className="text-foreground flex gap-3 p-2">
                    <CustomSelect
                        placeholder="Filter by Status"
                        size="sm"
                        options={[
                            { label: 'N/A', value: 'N/A' },
                            { label: 'Yes', value: 'Yes' },
                            { label: 'No', value: 'No' },
                        ]}
                        className="data-[placeholder]:text-foreground w-[170px]"
                        iconStyle="text-foreground"
                        iconName="lock"
                    />

                    <CustomSelect
                        placeholder="Filter by Learner Group"
                        options={[
                            { label: 'N/A', value: 'N/A' },
                            { label: 'Yes', value: 'Yes' },
                            { label: 'No', value: 'No' },
                        ]}
                        size="sm"
                        className="data-[placeholder]:text-foreground w-[210px]"
                        iconStyle="text-foreground"
                        iconName="users"
                    />

                    <CustomSelect
                        placeholder="Filter by Course Enrollment"
                        options={[
                            { label: 'N/A', value: 'N/A' },
                            { label: 'Yes', value: 'Yes' },
                            { label: 'No', value: 'No' },
                        ]}
                        size="sm"
                        iconName="library"
                        iconStyle="text-foreground"
                        className="data-[placeholder]:text-foreground w-[230px]"
                    />
                </div>
            </DataTable>
            <NewMessageForm
                trigger={openMessageDialog}
                setOpen={setOpenMessageDialog}
                onSubmit={() => {}}
            />
            <UpdateLearnerProfileDialog
                open={openLearnerProfileDialog}
                setOpen={setOpenLearnerProfileDialog}
                learnerRowData={learnerRowData}
            />
            <LearnerProfileDrawer
                open={openDrawer}
                onOpenChange={setOpenDrawer}
            />
        </div>
    )
}

export default LearnerTable
