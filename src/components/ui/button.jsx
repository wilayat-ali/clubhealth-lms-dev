import * as React from 'react'
import { Loader } from 'lucide-react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { DynamicIcon } from 'lucide-react/dynamic'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 align-middle whitespace-nowrap rounded-md text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-background font-medium shadow-xs hover:bg-primary/90',
                primary: 'bg-primary text-background hover:bg-primary/80 ',
                destructive:
                    'bg-destructive text-background shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                outline:
                    'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:hover:bg-input/50 font-medium text-sm',
                secondary:
                    'bg-secondary text-primary-foreground shadow-xs hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
                link: 'text-foreground underline-offset-4 hover:underline',
                customLink:
                    'text-foreground underline-offset-1 hover:underline decoration-stone-300 text-sm font-medium',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
                icon: 'h-9 w-9',
            },
            size: {
                default: 'h-9 px-4 py-2 has-[>svg]:px-3',
                sm: 'h-8 rounded-md gap-1.5 px-3 text-xs has-[>svg]:px-2.5',
                md: 'h-10 px-4 py-2 has-[>svg]:px-3',
                lg: 'h-10 rounded-md px-8 has-[>svg]:px-4',
                xl: 'h-11 px-4 py-2',
                icon: 'size-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

const Button = React.forwardRef(
    (
        {
            className,
            variant,
            size,
            icon,
            iconStyle,
            iconSize,
            iconPosition,
            loading,
            asChild = false,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <Comp
                className={cn(
                    iconPosition === 'right' && 'flex-row-reverse',
                    buttonVariants({ variant, size, className })
                )}
                ref={ref}
                {...props}
                disabled={loading || disabled}
            >
                {loading ? (
                    <>
                        Please wait
                        <Loader className="animate-spin [animation-duration:3s]" />
                    </>
                ) : (
                    <>
                        {icon && (
                            <div>
                                <DynamicIcon
                                    name={icon}
                                    className={iconStyle}
                                    size={iconSize}
                                />
                            </div>
                        )}

                        {children}
                    </>
                )}
            </Comp>
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
