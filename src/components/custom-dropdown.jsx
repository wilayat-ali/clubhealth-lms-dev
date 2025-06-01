'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { usePathname } from 'next/navigation'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { cn } from '@/lib/utils'

export default function CustomDropdown({
    title,
    image,
    subtitle,
    isCollapsed = false,
    side = 'right',
    align = 'start',
    menuItems = [],
    triggerClassName,
    titleClassName,
    subtitleClassName,
    contentClassName,
}) {
    const pathname = usePathname()
    const [activeItem, setActiveItem] = useState(null)
    const [open, setOpen] = useState(false)
    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="text"
                    className={cn(
                        'h-auto w-full px-2 py-2 ring-0 focus:ring-0 focus-visible:ring-0',
                        open
                            ? 'bg-sidebar-hover/50'
                            : 'hover:bg-sidebar-hover/50',
                        triggerClassName
                    )}
                >
                    <div className="flex w-full items-center gap-2 text-left">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                            <Avatar size="md" className="rounded-none">
                                <AvatarImage
                                    src={image}
                                    alt={title}
                                    variant="square"
                                />
                                <AvatarFallback>{title}</AvatarFallback>
                            </Avatar>
                        </span>
                        {!isCollapsed && (
                            <div>
                                <span
                                    className={cn(
                                        'text-secondary-background font-semibold',
                                        titleClassName
                                    )}
                                >
                                    {title}
                                </span>
                                {subtitle && (
                                    <span
                                        className={cn(
                                            'text-input block text-[10px] font-normal capitalize',
                                            subtitleClassName
                                        )}
                                    >
                                        {subtitle}
                                    </span>
                                )}
                            </div>
                        )}
                        {!isCollapsed && (
                            <span className="ml-auto">
                                <ChevronsUpDown className="text-secondary-background" />
                            </span>
                        )}
                    </div>
                </Button>
            </DropdownMenuTrigger>
            {/* Dropdown menu content */}
            <DropdownMenuContent
                className={cn('w-60', contentClassName)}
                side={side}
                align={align}
            >
                <>
                    <div className="mx-[-8px] border-b py-1.5">
                        <div className="flex w-full items-center gap-2 px-4 text-left">
                            {/* Image icon */}
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm">
                                <Avatar size="md" className="rounded-none">
                                    <AvatarImage
                                        src={image}
                                        alt={title}
                                        variant="square"
                                        className="rounded-none"
                                    />
                                    <AvatarFallback>{title}</AvatarFallback>
                                </Avatar>
                            </span>
                            {/* Display title and subtitle if not collapsed */}
                            {!isCollapsed && (
                                <div>
                                    <span
                                        className={cn(
                                            'text-foreground font-semibold',
                                            titleClassName
                                        )}
                                    >
                                        {title}
                                    </span>
                                    {subtitle && (
                                        <span
                                            className={cn(
                                                'text-secondary-foreground block text-[10px] font-normal capitalize',
                                                subtitleClassName
                                            )}
                                        >
                                            {subtitle}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {menuItems.length > 0 ? (
                        menuItems.map((section, index) => (
                            <div key={index}>
                                {/* Section label */}
                                {section.label && (
                                    <DropdownMenuLabel className="text-secondary-foreground font-normal">
                                        {section.label}
                                    </DropdownMenuLabel>
                                )}
                                {/* Separator */}
                                {section.separator && <DropdownMenuSeparator />}
                                {/* Render menu items */}
                                {Array.isArray(section.items) &&
                                    section.items.map((item, idx) => {
                                        const isActive = item.href
                                            ? pathname === item.href
                                            : activeItem === item.name

                                        return (
                                            <DropdownMenuItem
                                                key={idx}
                                                className={cn(
                                                    'hover:bg-muted my-0.5 cursor-pointer',
                                                    isActive && 'bg-muted'
                                                )}
                                                onClick={() => {
                                                    if (!item.href) {
                                                        setActiveItem(item.name)
                                                        item.onClick?.()
                                                    }
                                                }}
                                            >
                                                {item.icon && (
                                                    <item.icon
                                                        className={cn('size-5')}
                                                    />
                                                )}
                                                {item.href ? (
                                                    <Link
                                                        href={item.href}
                                                        className={cn(
                                                            'hover:bg-muted block w-full rounded-md px-2 py-1',
                                                            isActive &&
                                                                'bg-primary hover:bg-primary text-background'
                                                        )}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ) : (
                                                    <span>{item.name}</span>
                                                )}
                                            </DropdownMenuItem>
                                        )
                                    })}
                            </div>
                        ))
                    ) : (
                        <DropdownMenuItem>No items found</DropdownMenuItem>
                    )}
                </>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
