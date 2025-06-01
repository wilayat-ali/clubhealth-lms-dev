'use client'

import { useState } from 'react'

import NotificationsDrawer from '@/components/drawers/notifications-drawer'
import NotificationButton from '@/components/notification'

const TopBar = () => {
    const [isNotificationOpen, setNotificationOpen] = useState(false)
    let count = 2
    return (
        <div>
            <div
                className="ml-auto flex items-center gap-2"
                onClick={() => {
                    setNotificationOpen(true)
                }}
            >
                <NotificationButton count={count} />
            </div>
            <NotificationsDrawer
                open={isNotificationOpen}
                onOpenChange={() =>
                    setNotificationOpen((prevState) => {
                        return !prevState
                    })
                }
                setNotificationOpen={setNotificationOpen}
            />
        </div>
    )
}

export default TopBar
