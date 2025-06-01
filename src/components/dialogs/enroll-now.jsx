'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Check, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogFooter,
} from '@/components/ui/dialog'

const EnrollNow = ({ trigger, setEnrollNowOpen }) => {
    const pathname = usePathname()

    return (
        <Dialog open={trigger} onOpenChange={() => setEnrollNowOpen(false)}>
            <DialogContent
                className="sm:max-w-[512px]"
                aria-describedby={undefined}
            >
                <DialogHeader className="flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                        <DialogTitle className="text-foreground truncate text-lg font-semibold">
                            Enroll in "Treatment Modalities & Basic Principles"
                        </DialogTitle>
                        <span className="text-secondary-foreground mt-4 text-sm">
                            Dive into the fundamentals of healthcare by
                            exploring key treatment modalities and principles.
                            Learn how Club Health strips back the saturated
                            world of healthcare to focus on evidence-based
                            physiotherapy, rehab & conditioning, and clinical
                            pilates—all designed to help patients move well and
                            prevent musculoskeletal conditions.
                        </span>

                        <h3 className="text-foreground mt-4 text-base font-semibold">
                            Access & Benefits:
                        </h3>

                        <div className="border-border text-foreground hover:bg-secondary-background mt-2 flex cursor-default gap-x-2 rounded-lg border p-3">
                            <div>
                                <Check className="text-foreground w-5" />
                            </div>
                            <div className="flex flex-col text-sm">
                                <span className="text-foreground font-medium">
                                    Full Access
                                </span>
                                <span className="text-secondary-foreground">
                                    Enjoy unlimited access to comprehensive
                                    course materials, including video
                                    demonstrations and interactive assessments.
                                </span>
                            </div>
                        </div>

                        <div className="border-border text-foreground hover:bg-secondary-background mt-2 flex cursor-default gap-x-2 rounded-lg border p-3">
                            <div>
                                <Check className="text-foreground w-5" />
                            </div>
                            <div className="flex flex-col text-sm">
                                <span className="text-foreground font-medium">
                                    Practical Learning
                                </span>
                                <span className="text-secondary-foreground">
                                    Gain hands-on skills and practical
                                    techniques that can be applied in real-world
                                    scenarios to improve outcomes.
                                </span>
                            </div>
                        </div>

                        <div className="border-border text-foreground hover:bg-secondary-background mt-2 flex cursor-default gap-x-2 rounded-[8px] border p-3">
                            <div>
                                <Check className="text-foreground w-5" />
                            </div>
                            <div className="flex flex-col text-sm">
                                <span className="text-foreground font-medium">
                                    Certification
                                </span>
                                <span className="text-secondary-foreground">
                                    Earn a certificate of completion to validate
                                    your new competencies and enhance your
                                    professional profile.
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-x-2">
                            <div className="text-muted-foreground">
                                <Info className="h-3 w-3" />
                            </div>
                            <div className="text-foreground text-sm">
                                <span className="text-muted-foreground me-1 font-medium">
                                    Prerequisite:
                                </span>
                                No prior experience required
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end gap-x-2">
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                            <Link href={`${pathname}/slug/learning`}>
                                <Button
                                    type="submit"
                                    variant="default"
                                    className="font-medium"
                                >
                                    Start Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default EnrollNow
