import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
    'inline-flex items-center justify-center capitalize rounded-md border px-2 py-0.5 text-xs font-medium font-bold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-primary text-background [a&]:hover:bg-primary/90',
                secondary:
                    'border-transparent bg-secondary text-background [a&]:hover:bg-secondary/90',
                destructive:
                    'border-transparent bg-destructive text-background [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                outline:
                    'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
)

function Badge({
    className,
    variant,
    status,
    dotColor,
    asChild = false,
    children,
    ...props
}) {
    const Comp = asChild ? Slot : 'span'

    return (
        <Comp
            data-slot="badge"
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        >
            <span className="flex items-center gap-1.5">
                {status && (
                    <span className={cn('h-2 w-2 rounded-[2px]', dotColor)} />
                )}
                {children}
            </span>
        </Comp>
    )
}

export { Badge, badgeVariants }
