'use client'

import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

import { cn } from '@/lib/utils'

function Drawer({ ...props }) {
    return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({ ...props }) {
    return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({ ...props }) {
    return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ ...props }) {
    return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({ className, ...props }) {
    return (
        <DrawerPrimitive.Overlay
            data-slot="drawer-overlay"
            className={cn(
                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
                className
            )}
            {...props}
        />
    )
}

function DrawerContent({ className, children, size = 'sm', ...props }) {
    const handlePointerDownCapture = (event) => {
        // If the event target is not inside the designated drag handle, stop propagation.
        if (!event.target.closest('[data-drag-handle]')) {
            event.stopPropagation()
        }
    }
    const sizeClasses = {
        sm: 'data-[vaul-drawer-direction=right]:max-w-[640px] data-[vaul-drawer-direction=right]:max-h-[1058px]',
        md: 'data-[vaul-drawer-direction=right]:max-w-[768px] data-[vaul-drawer-direction=right]:max-h-[1058px]',
    }

    return (
        <DrawerPortal data-slot="drawer-portal">
            <DrawerOverlay />
            <DrawerPrimitive.Content
                data-slot="drawer-content"
                onPointerDownCapture={handlePointerDownCapture}
                className={cn(
                    'group/drawer-content fixed z-50 flex h-auto flex-col bg-white',
                    'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg',
                    'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg',
                    `data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:rounded-tl-md data-[vaul-drawer-direction=right]:rounded-bl-md ${sizeClasses[size]}`,
                    'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:sm:max-w-sm',
                    className
                )}
                {...props}
            >
                <div
                    data-drag-handle
                    className="bg-border absolute top-1/2 h-32 w-2 -translate-y-1/2 cursor-grab rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:top-3 group-data-[vaul-drawer-direction=bottom]/drawer-content:left-1/2 group-data-[vaul-drawer-direction=bottom]/drawer-content:-translate-x-1/2 group-data-[vaul-drawer-direction=bottom]/drawer-content:rotate-90 group-data-[vaul-drawer-direction=left]/drawer-content:right-2 group-data-[vaul-drawer-direction=right]/drawer-content:left-3 group-data-[vaul-drawer-direction=top]/drawer-content:!top-auto group-data-[vaul-drawer-direction=top]/drawer-content:bottom-3 group-data-[vaul-drawer-direction=top]/drawer-content:left-1/2 group-data-[vaul-drawer-direction=top]/drawer-content:-translate-x-1/2 group-data-[vaul-drawer-direction=top]/drawer-content:translate-y-1/2 group-data-[vaul-drawer-direction=top]/drawer-content:rotate-90 active:cursor-grabbing"
                />

                <div className="group-data-[vaul-drawer-direction=bottom]/drawer-content:pt-2 group-data-[vaul-drawer-direction=top]/drawer-content:pb-2">
                    {children}
                </div>
            </DrawerPrimitive.Content>
        </DrawerPortal>
    )
}

function DrawerHeader({ className, ...props }) {
    return (
        <div
            data-slot="drawer-header"
            className={cn('flex flex-col gap-1.5', className)}
            {...props}
        />
    )
}

function DrawerFooter({ className, ...props }) {
    return (
        <div
            data-slot="drawer-footer"
            className={cn('mt-auto flex flex-col gap-2', className)}
            {...props}
        />
    )
}

function DrawerTitle({ className, ...props }) {
    return (
        <DrawerPrimitive.Title
            data-slot="drawer-title"
            className={cn('text-foreground text-lg font-semibold', className)}
            {...props}
        />
    )
}

function DrawerDescription({ className, ...props }) {
    return (
        <DrawerPrimitive.Description
            data-slot="drawer-description"
            className={cn('text-secondary-foreground text-sm', className)}
            {...props}
        />
    )
}

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
}
