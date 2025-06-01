'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

function Progress({ className, value, fillColor, unfillColor, ...props }) {
    return (
        <ProgressPrimitive.Root
            data-slot="progress"
            className={cn(
                'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
                unfillColor, // Overrides default if provided
                className
            )}
            {...props}
        >
            <ProgressPrimitive.Indicator
                data-slot="progress-indicator"
                className={cn(
                    'bg-primary h-full w-full flex-1 transition-all',
                    fillColor // Overrides default if provided
                )}
                style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
            />
        </ProgressPrimitive.Root>
    )
}

export { Progress }
