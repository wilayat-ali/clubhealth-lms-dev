'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const HeaderWithAction = ({
    title,
    description,
    showButton = true,
    buttonLabel = 'Action',
    buttonVariant = 'outline',
    buttonIcon,
    onButtonClick,
    className = '',
    titleClassName = '',
    link = null,
}) => {
    const Wrapper = link ? Link : 'div'
    return (
        <div className="mb-6 flex items-end justify-between">
            <div>
                <h2
                    className={cn(
                        'text-foreground font-2xl font-medium',
                        titleClassName
                    )}
                >
                    {title}
                </h2>
                {description && (
                    <p className="text-secondary-foreground mt-3 text-[14px] font-normal">
                        {description}
                    </p>
                )}
            </div>

            {(showButton || link) && (
                <Wrapper {...(link ? { href: link, passHref: true } : {})}>
                    <Button
                        className={cn('cursor-pointer', className)}
                        variant={buttonVariant}
                        icon={buttonIcon}
                        onClick={onButtonClick}
                    >
                        {buttonLabel}
                    </Button>
                </Wrapper>
            )}
        </div>
    )
}

export default HeaderWithAction
