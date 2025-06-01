import React from 'react'
import Link from 'next/link'
import { useBreadcrumbs } from '@/context/bread-crumb-context'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const Breadcrumbs = () => {
    const { breadcrumbs } = useBreadcrumbs()

    if (!breadcrumbs.length) return null

    // Only apply truncation if breadcrumb count > 3
    const shouldTruncate = breadcrumbs.length > 3
    const truncateClasses = shouldTruncate
        ? 'block max-w-[90px] truncate 2xl:max-w-none 2xl:whitespace-normal'
        : ''

    return (
        <div className="overflow-x-auto px-1 whitespace-nowrap">
            <Breadcrumb>
                <BreadcrumbList className="flex items-center gap-1">
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <BreadcrumbSeparator />}
                            <BreadcrumbItem>
                                {crumb.href ? (
                                    <BreadcrumbLink
                                        asChild
                                        className="text-secondary-foreground text-sm"
                                    >
                                        <Link
                                            href={crumb.href}
                                            className={`text-ellipsis hover:underline ${truncateClasses}`}
                                            title={crumb.label}
                                        >
                                            {crumb.label}
                                        </Link>
                                    </BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage
                                        className={`text-secondary-foreground text-sm text-ellipsis ${truncateClasses}`}
                                        title={crumb.label}
                                    >
                                        {crumb.label}
                                    </BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default Breadcrumbs
