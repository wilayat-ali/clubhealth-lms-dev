'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import DataTable from '@/components/data-table'
import CustomSelect from '@/components/custom-select'
import AdminTutorDialog from '@/components/dialogs/admin-tutor-dialog'
import ConfirmationDialog from '@/components/dialogs/conformation-dialog'
import adminTutorsData from '@/data/admin-tutor.json'

const AdminAndTutorTable = () => {
    const [data, setData] = useState(adminTutorsData)
    const [statusModalOpen, setStatusModalOpen] = useState(false)
    const [selectedAdminTutor, setSelectedAdminTutor] = useState(null)
    const [isAdminTutorModalOpen, setAdminTutorModalOpen] = useState(false)

    const dotColorMap = {
        pending: 'bg-primary',
        blocked: 'bg-status-red',
        active: 'bg-status-green',
    }
    const statusDotColor = (status) => dotColorMap[status] || ''

    const AdminTutorColumns = [
        {
            accessorKey: 'fullName',
            header: 'Full Name',
            cell: ({ row }) => {
                const { avatar, fullName, initials, email } = row.original
                return (
                    <div className="flex w-[600px] items-center gap-3">
                        {' '}
                        {/* wider width */}
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
            accessorKey: 'role',
            header: 'Role',
            center: true,
            cell: ({ row }) => {
                return (
                    <p className="text-foreground flex items-center gap-3 text-sm capitalize">
                        {row.original.role}
                    </p>
                )
            },
        },
        {
            accessorKey: 'courseAssociation',
            header: 'Course Association',
            center: true,
            cell: ({ row }) => (
                <span className="text-foreground text-sm font-medium">
                    {row.original.courseAssociation === '' ? (
                        <span className="text-muted-foreground">N/A</span>
                    ) : (
                        `${row.original.courseAssociation}`
                    )}
                </span>
            ),
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
                        <p className="capitalize">{String(status)}</p>
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
                        {joinDate ? joinDate : 'N/A'}
                    </span>
                )
            },
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => {
                const adminTutorData = row.original

                const handleChangeStatus = () => {
                    setStatusModalOpen(true)
                }

                const handleEditAdminTutor = () => {
                    setSelectedAdminTutor(adminTutorData)
                    setAdminTutorModalOpen(true)
                }

                return (
                    <div className="text-foreground flex justify-end gap-3">
                        <Button
                            className="hover:bg-border cursor-pointer rounded-md p-2"
                            variant="outlined"
                            onClick={() => handleChangeStatus('status-modal')}
                            icon="lock"
                            iconStyle={`size-5 ${adminTutorData?.status === 'blocked' ? 'text-brand-red' : ''}`}
                        />
                        <Button
                            className="hover:bg-border cursor-pointer rounded-md p-2"
                            variant="outlined"
                            onClick={handleEditAdminTutor}
                            icon="square-pen"
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
                columns={AdminTutorColumns}
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
                        className="data-[placeholder]:text-foreground w-[170px]"
                        iconName="lock"
                        iconStyle="text-foreground"
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
                        className="data-[placeholder]:text-foreground w-[250px]"
                        iconStyle="text-foreground"
                    />
                </div>
            </DataTable>

            {statusModalOpen && (
                <ConfirmationDialog
                    open={statusModalOpen}
                    onOpenChange={() => setStatusModalOpen(false)}
                    title="Change Status"
                    message="Are you sure you want to block the account and deny access to the portal for"
                    confirmLabel="Block"
                    onConfirm={() => {}}
                    user="Gretchen Geidt"
                />
            )}

            <AdminTutorDialog
                open={isAdminTutorModalOpen}
                onOpenChange={setAdminTutorModalOpen}
                rowData={selectedAdminTutor}
                onSubmitHandler={() => {}}
            />
        </div>
    )
}

export default AdminAndTutorTable
