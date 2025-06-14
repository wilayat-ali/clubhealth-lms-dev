'use client'

import { useState, useEffect } from 'react'

import { notFound } from 'next/navigation';
import { useRouter, usePathname } from 'next/navigation'
import NotificationButton from '@/components/notification'
import Sidebar from '@/components/sidebar/sidebar'
import { Button } from '@/components/ui/button'
import Breadcrumbs from '@/components/layout/bread-crumbs'
import '../globals.css'

const PageLayout = ({ children }) => {
    const router = useRouter()
    const pathname = usePathname()
    const [portalType, setPortalType] = useState(null)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        if (!pathname) return

        const email = localStorage.getItem('userEmail')
        const role = localStorage.getItem('userRole')

        // If no auth info, redirect to login
        if (!email || !role) {
            router.replace('/login')
            return
        }

        // Determine portal type based on pathname
        const isAdminPath = pathname.startsWith('/admin')
        const isLearnerPath = !isAdminPath

        // Redirect based on role and attempted path
        if (role === 'admin' && isLearnerPath) {
            notFound()
            return
        }

        if (role === 'learner' && isAdminPath) {
            notFound()
            return
        }

        // Set portal type and sidebar state
        setPortalType(isAdminPath ? 'admin' : 'learner')
        setIsCollapsed(window.innerWidth <= 1024)
        setHasMounted(true)

        const handleResize = () => {
            setIsCollapsed(window.innerWidth <= 1024)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [pathname])

    // if (!hasMounted || !portalType) return null

    // Show loader while checking auth
    if (!hasMounted || !portalType) {
        return (
            <div className="flex h-screen flex-col items-center justify-center space-y-2 bg-white">
                {/* <Loader2 className="mr-2 h-6 w-6 animate-spin text-gray-600" /> */}
                <p>Redirecting...</p>
            </div>
        )
    }

    return (
        <div className="bg-muted flex">
            <Sidebar
                portalType={portalType}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            <div className="flex-1 overflow-auto" id="scroll-container">
                {/* Top Bar */}
                <div className="bg-secondary sticky top-0 z-10 pt-3">
                    <div className="border-border bg-background flex h-[60px] items-center justify-between rounded-tl-3xl border-b px-4">
                        <div className="flex items-center gap-4 pl-2">
                            <Button
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="text-secondary-foreground hover:text-foreground cursor-pointer p-0"
                                size="xl"
                                variant="icon"
                                icon="panel-left"
                                aria-label={
                                    isCollapsed
                                        ? 'Expand Sidebar'
                                        : 'Collapse Sidebar'
                                }
                            ></Button>
                            <span className="text-muted-foreground text-[21px] text-stone-400">
                                |
                            </span>
                            <Breadcrumbs />
                        </div>

                        <div className="ml-auto flex items-center gap-2">
                            <NotificationButton count={2} />
                        </div>
                    </div>
                </div>

                <div className="h-[calc(100vh-72px)]">{children}</div>
            </div>
        </div>
    )
}

export default PageLayout
