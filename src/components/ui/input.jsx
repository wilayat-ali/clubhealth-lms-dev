import * as React from 'react'
import { CircleAlert } from 'lucide-react'

import { cn } from '@/lib/utils'

function Input({ className, type, infoMessage, size = 'default', ...props }) {
    const inputSizes = {
        sm: 'h-8 text-sm px-2',
        default: 'h-9 text-base px-3',
        lg: 'h-11 text-base px-4 py-2.5',
    }
    return (
        <div>
            <input
                type={type}
                data-slot="input"
                className={cn(
                    'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]',
                    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                    inputSizes[size],
                    className
                )}
                {...props}
            />

            {infoMessage && (
                <div className="text-muted-foreground mt-2 flex items-center">
                    <CircleAlert className="h-[13px] w-[13px]" />
                    <p className="text-muted-foreground mx-[6px] text-xs">
                        {infoMessage}
                    </p>
                </div>
            )}
        </div>
    )
}

export { Input }
