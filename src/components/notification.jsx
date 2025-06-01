'use client'

import { useState } from 'react'
import { BellRing } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import NotificationsDrawer from '@/components/drawers/notifications-drawer'

export default function NotificationButton({ count }) {
    const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false)

    return (
        <div className="relative flex h-[40px] cursor-pointer items-center gap-2 px-4 py-2.5">
            <Button
                onClick={() => setOpenNotificationDrawer(true)}
                variant="ghost"
            >
                <BellRing className="size-5" />

                <span className="text-foreground text-sm">Notifications</span>

                {count > 0 && (
                    <Badge className="rounded-full px-2.5">
                        {count > 9 ? '9+' : count}
                    </Badge>
                )}
            </Button>

            {openNotificationDrawer && (
                <NotificationsDrawer
                    open={openNotificationDrawer}
                    onOpenChange={setOpenNotificationDrawer}
                />
            )}
        </div>
    )
}
