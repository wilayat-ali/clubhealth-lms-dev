'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import NotificationList from '@/components/notification-items'
import CompletionistDialog from '@/components/dialogs/completionist-dialog'

import learnerNotifications from '@/data/notifications.json'
import adminNotifications from '@/data/admin-notifications.json'

const Notifications = ({ open, onOpenChange }) => {
    const router = useRouter()
    const role = localStorage.getItem('userRole')
    const [isCompletionistDialogOpen, setIsCompletionistDialogOpen] =
        useState(false)
    const [notification, setNotification] = useState([])

    useEffect(() => {
        if (role === 'admin') {
            setNotification(adminNotifications)
        } else {
            setNotification(learnerNotifications)
        }
    }, [role])

    const handleActionClick = (actionLabel) => {
        if (actionLabel === 'View Badge') {
            setIsCompletionistDialogOpen(true)
        }
        if (actionLabel === 'View Message') {
            router.push(`/messages`)
            onOpenChange(false)
        }
    }

    const markAllAsRead = () => {
        setNotification(
            notification.map((n) => ({
                ...n,
                isRead: true,
            }))
        )
    }

    // const data = role === 'admin' ? adminNotifications : learnerNotifications

    return (
        <>
            <Drawer
                open={open}
                onOpenChange={onOpenChange}
                direction="right"
                className="flex h-screen max-h-screen flex-col"
            >
                <DrawerTrigger asChild></DrawerTrigger>
                <DrawerContent>
                    <div className="h-screen pt-6 pl-10">
                        <DrawerHeader>
                            <div className="flex items-center justify-between">
                                <p className="text-foreground text-lg font-semibold">
                                    Notifications &amp; Alerts
                                </p>
                                <DrawerTitle />
                                <DrawerClose className="cursor-pointer">
                                    <X className="text-foreground size-5" />
                                </DrawerClose>
                            </div>
                            <DrawerDescription className="text-secondary-foreground text-sm font-normal">
                                Stay informed with real-time updates on your
                                learning journey.
                            </DrawerDescription>
                        </DrawerHeader>
                        <NotificationList
                            data={notification}
                            onActionClick={handleActionClick}
                            onMarkAllRead={markAllAsRead}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
            <CompletionistDialog
                open={isCompletionistDialogOpen}
                onClose={() => setIsCompletionistDialogOpen(false)}
            />
        </>
    )
}

export default Notifications
