'use client'

import { useState, useCallback } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { DynamicIcon } from 'lucide-react/dynamic'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const SidebarItem = ({ item, isOpen, onToggle, isCollapsed, pathname }) => {
    const isActive = (() => {
        if (item.path === '/admin' || item.path === '/') {
            return pathname === item.path
        }
        return (
            pathname === item.path ||
            pathname.startsWith(item.path + '/') ||
            item?.subItems?.some((sub) => pathname === sub.path)
        )
    })()

    return (
        <li key={item.path || item.name}>
            {' '}
            <Link
                href={item?.path || '#'}
                className={cn(
                    'group mx-2 flex h-[36px] items-center justify-between rounded-sm p-2 text-sm transition-all',
                    isActive
                        ? 'bg-primary-foreground text-secondary-background'
                        : 'hover:bg-sidebar-hover/50 text-secondary-background'
                )}
                onClick={(e) => {
                    if (item?.subItems) {
                        e.preventDefault()
                        onToggle()
                    }
                }}
                aria-haspopup={!!item?.subItems}
                aria-expanded={isOpen}
            >
                <span
                    className={cn(
                        'flex w-full items-center justify-center gap-2'
                    )}
                >
                    <DynamicIcon
                        name={item?.icon}
                        strokeWidth={1.5}
                        size={20}
                    />
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    transition: { delay: 0.1, duration: 0.2 },
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -10,
                                    transition: { duration: 0.15 },
                                }}
                                className="flex w-full items-center justify-between"
                            >
                                <span className="text-secondary-100 text-sm">
                                    {item?.name}
                                </span>

                                <ChevronRight
                                    size={16}
                                    className={cn(
                                        'text-muted ml-auto group-hover:visible',
                                        !isActive && 'invisible'
                                    )}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </span>

                {/* Animated chevron for items with sub-items */}
                {!isCollapsed && item?.subItems && (
                    <motion.div
                        initial={false}
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <ChevronRight size={16} />
                    </motion.div>
                )}
            </Link>
            {/* Render sub-items if they exist and are open */}
            {!isCollapsed && item?.subItems && (
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="border-secondary-background mt-3 ml-6 border-l"
                        >
                            {item?.subItems.map((subItem) => (
                                <li key={subItem.path || subItem.name}>
                                    {' '}
                                    <Link
                                        href={subItem?.path}
                                        className={cn(
                                            'block px-3 py-1.5 text-sm transition-all',
                                            pathname === subItem?.path
                                                ? 'text-primary font-bold'
                                                : 'text-secondary-foreground hover:text-secondary-foreground'
                                        )}
                                    >
                                        {subItem?.name}
                                    </Link>
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            )}
        </li>
    )
}

const SidebarMenu = ({ menus, isCollapsed }) => {
    const pathname = usePathname()
    const [openSubmenu, setOpenSubmenu] = useState({})
    const toggleSubmenu = useCallback((path) => {
        setOpenSubmenu((prev) => ({ ...prev, [path]: !prev[path] }))
    }, [])

    return (
        <nav aria-label="Main Navigation">
            <ul>
                {menus.map((section, sectionIndex) => (
                    <div className="space-y-2" key={sectionIndex}>
                        {section.items.map((item) => (
                            <SidebarItem
                                key={item.path || item.name}
                                item={item}
                                isOpen={
                                    openSubmenu[item.path] ||
                                    pathname === item.path
                                }
                                onToggle={() => toggleSubmenu(item.path)}
                                isCollapsed={isCollapsed}
                                pathname={pathname}
                            />
                        ))}
                    </div>
                ))}
            </ul>
        </nav>
    )
}

export default SidebarMenu
