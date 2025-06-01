'use client'

import { forwardRef, useMemo } from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

// eslint-disable-next-line react/display-name
const CircleProgress = forwardRef(
    (
        {
            className,
            value = 0,
            maxValue = 100,
            percentage = false,
            size = '2.5rem',
            progressColor = '#10B981', // default green
            trackColor = '#D1D5DB', // default gray-300
            children,
            ...restProps
        },
        ref
    ) => {
        const { displayValue, roundedPercentage, backgroundStyle } =
            useMemo(() => {
                const displayVal = percentage ? value : (value / maxValue) * 100
                const roundedPercent = Math.min(Math.round(displayVal), 100)
                const background = {
                    background: `radial-gradient(closest-side, white 75%, transparent 80% 100%), conic-gradient(${progressColor} ${roundedPercent}%, ${trackColor} 0)`,
                }
                return {
                    displayValue: displayVal,
                    roundedPercentage: roundedPercent,
                    backgroundStyle: background,
                }
            }, [value, maxValue, percentage, progressColor, trackColor])

        return (
            <ProgressPrimitive.Root
                ref={ref}
                className={cn(
                    'relative flex items-center justify-center overflow-hidden rounded-full',
                    className
                )}
                style={{
                    ...backgroundStyle,
                    width: size,
                    height: size,
                }}
                {...restProps}
            >
                <div className="text-center">
                    {children ?? (
                        <span className="text-foreground text-xs font-semibold">
                            {percentage
                                ? `${Math.round(displayValue)}%`
                                : value}
                        </span>
                    )}
                </div>
            </ProgressPrimitive.Root>
        )
    }
)

export default CircleProgress
