'use client'

import React, { useState, useEffect } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
    LogOut,
    ShieldQuestion,
    UserRoundCog,
    ChevronRight,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { SupportDialog } from '@/components/dialogs/support-dialog'
import UpdateProfile from '@/components/dialogs/update-profile'
import CustomDropdown from '@/components/custom-dropdown'
import SidebarMenu from '@/components/sidebar/menu'
import { cn } from '@/lib/utils'
import userData from '@/data/user-data.json'

const Sidebar = ({ portalType, isCollapsed, setIsCollapsed }) => {
    const router = useRouter()
    const [isDialogOpen, setDialogOpen] = useState(false)
    const [openSupportDialog, setOpenSupportDialog] = useState(false)

    const userInfo = userData[portalType] || userData.learner

    const handleLogout = () => {
        localStorage.removeItem('userEmail')
        localStorage.removeItem('userRole')
        router.push('/login')
    }

    const learnerMenus = [
        {
            heading: 'Components',
            items: [
                { name: 'Dashboard', icon: 'house', path: '/' },
                {
                    name: 'Browse Courses',
                    icon: 'square-library',
                    path: '/browse-courses',
                },
                {
                    name: 'Assessments',
                    icon: 'file-pen-line',
                    path: '/assessments',
                },
                {
                    name: 'Certifications',
                    icon: 'award',
                    path: '/certifications',
                },
                {
                    name: 'Messages',
                    icon: 'message-square-more',
                    path: '/messages',
                },
            ],
        },
    ]

    const accountMenu = () => [
        {
            items: [
                {
                    name: 'Update Profile',
                    icon: UserRoundCog,
                    onClick: () => setDialogOpen(true),
                },
                {
                    name: 'Sign Out',
                    icon: LogOut,
                    onClick: () => handleLogout(),
                },
            ],
        },
    ]

    const adminMenus = [
        {
            heading: 'Admin',
            items: [
                { name: 'Dashboard', icon: 'house', path: '/admin' },
                {
                    name: 'Learners',
                    icon: 'users',
                    path: '/admin/learner',
                },
                {
                    name: 'Courses',
                    icon: 'square-library',
                    path: '/admin/courses',
                },
                {
                    name: 'Assessments',
                    icon: 'file-pen-line',
                    path: '/admin/assessments',
                },
                {
                    name: 'Messages',
                    icon: 'message-square-more',
                    path: '/admin/messages',
                },
                {
                    name: 'Admin & Tutors',
                    icon: 'user-pen',
                    path: '/admin/admin-tutor',
                },
                {
                    name: 'System Log',
                    icon: 'list-check',
                    path: '/admin/system-log',
                },
                {
                    name: 'Configurations',
                    icon: 'settings',
                    path: '/admin/configrations',
                },
            ],
        },
    ]

    useEffect(() => {
        const handleResize = () => {
            setIsCollapsed(window.innerWidth <= 1024)
        }

        if (typeof window !== 'undefined') {
            handleResize()
            window.addEventListener('resize', handleResize)
        }

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const menus = portalType === 'admin' ? adminMenus : learnerMenus

    return (
        <div className="bg-secondary sticky top-0 z-30">
            <div
                className={cn(
                    'border-secondary relative z-50 flex min-h-screen flex-col border-r transition-all duration-300',
                    isCollapsed ? 'w-16' : 'w-64'
                )}
            >
                {/* Sidebar Logo */}
                <div className="relative z-20 flex-1 flex-grow overflow-auto">
                    <div
                        className={`mb-4 flex h-[65px] items-center p-2 transition-all duration-300 ${
                            isCollapsed ? 'justify-center' : ''
                        }`}
                    >
                        {isCollapsed ? (
                            <Image
                                src="/icons/club-health-logo-icon.svg"
                                alt="logo-icon"
                                width={16}
                                height={24}
                                className="h-6 w-4"
                                priority
                            />
                        ) : (
                            <Image
                                src="/images/club-health-logo.png"
                                alt="logo-image"
                                width={155}
                                height={25}
                                style={{ height: 'auto' }}
                                priority
                            />
                        )}
                    </div>

                    {/* Sidebar Navigation Menu */}
                    <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        <SidebarMenu menus={menus} isCollapsed={isCollapsed} />
                    </div>
                </div>
                {portalType !== 'admin' && (
                    <div className="group mx-2 cursor-pointer">
                        <div
                            className={`text-secondary-background flex w-full items-center justify-start gap-x-2 rounded-sm p-2 ${
                                openSupportDialog
                                    ? 'bg-sidebar-hover/50'
                                    : 'hover:bg-sidebar-hover/50'
                            }`}
                            onClick={() => setOpenSupportDialog(true)}
                        >
                            <div>
                                <ShieldQuestion strokeWidth={1.5} size={20} />
                            </div>
                            <AnimatePresence>
                                {!isCollapsed && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                            transition: {
                                                delay: 0.1,
                                                duration: 0.2,
                                            },
                                        }}
                                        exit={{
                                            opacity: 0,
                                            x: -10,
                                            transition: { duration: 0.15 },
                                        }}
                                    >
                                        Help & Support
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <ChevronRight
                                size={16}
                                className={cn(
                                    'text-muted ml-auto group-hover:visible',
                                    !openSupportDialog && 'invisible'
                                )}
                            />
                        </div>
                    </div>
                )}

                <UpdateProfile
                    open={isDialogOpen}
                    onOpenChange={() =>
                        setDialogOpen((PrevState) => !PrevState)
                    }
                />
                {openSupportDialog && (
                    <SupportDialog
                        trigger={openSupportDialog}
                        setOpen={setOpenSupportDialog}
                    />
                )}
                {/* Footer Section */}
                <div className="mt-auto px-2 py-2">
                    <CustomDropdown
                        title={userInfo.name}
                        subtitle={userInfo.role}
                        image={userInfo.image}
                        menuItems={accountMenu()}
                        align="end"
                        isCollapsed={isCollapsed}
                        contentClassName="ml-2 shadow-none"
                        titleClassName="text-sm"
                    />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
