'use client'

import React from 'react'
import { useState } from 'react'
import { DynamicIcon } from 'lucide-react/dynamic'
import { Info } from 'lucide-react'

import { Button } from '@/components/ui/button'
import EnrollNow from '@/components/dialogs/enroll-now'

const KeyDetailSidebar = React.memo(({ keyDetailsData }) => {
    const [enrollNowOpen, setEnrollNowOpen] = useState(false)

    return (
        <div className="sticky top-26">
            <p className="text-muted-foreground mb-6 text-xs">KEY DETAILS</p>

            {keyDetailsData &&
                keyDetailsData?.map((item, detailIndex) => {
                    return (
                        <div
                            key={detailIndex}
                            className={`flex items-center gap-x-[6px] ${keyDetailsData.length - 1 == detailIndex ? 'mb-4' : 'mb-6'}`}
                        >
                            <div>
                                <DynamicIcon
                                    name={item?.icon}
                                    className="text-secondary-foreground ml-1 h-4 w-4"
                                />
                            </div>
                            <div className="flex w-full justify-between text-sm">
                                <div className="text-secondary-foreground">
                                    {item.module}
                                </div>
                                <div className="text-foreground">
                                    {item.duration}
                                </div>
                            </div>
                        </div>
                    )
                })}

            <Button
                size="sm"
                type="submit"
                variant="default"
                icon="arrow-right"
                className="h-10 w-full text-base"
                iconPosition="right"
                onClick={() => setEnrollNowOpen(true)}
            >
                Enroll Now
            </Button>

            <div className="mt-4 flex items-center justify-center gap-x-2">
                <div className="text-muted-foreground">
                    <Info className="h-3 w-3" />
                </div>
                <div className="text-foreground text-sm font-medium">
                    <span className="text-muted-foreground font-medium">
                        Prerequisite:
                    </span>
                    No prior experience required
                </div>
            </div>

            {enrollNowOpen && (
                <EnrollNow
                    trigger={enrollNowOpen}
                    setEnrollNowOpen={setEnrollNowOpen}
                />
            )}
        </div>
    )
})

export default KeyDetailSidebar
