import { CircleAlert, Handshake, AppWindow, Mail, Phone } from 'lucide-react'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function SupportDialog({ trigger, setOpen }) {
    return (
        <Dialog open={trigger} onOpenChange={() => setOpen(false)}>
            <DialogContent className="sm:max-w-[520px]">
                <DialogHeader className="flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                        <div className="text-foreground text-lg font-semibold">
                            Help & Support
                        </div>
                        <DialogTitle />
                        <span className="text-secondary-foreground mt-4 text-sm font-normal tracking-normal">
                            Need assistance? Our support team is here to help
                            you with any questions or issues you encounter.
                        </span>
                        <p className="text-foreground mt-4 text-base font-semibold">
                            How can we help you today?
                        </p>
                        <div className="text-foreground mt-4 flex gap-x-2">
                            <div>
                                <CircleAlert className="text-foreground size-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                    General Inquiries
                                </span>
                                <span className="text-secondary-foreground text-sm font-normal">
                                    Course information, account questions, or
                                    platform guidance
                                </span>
                            </div>
                        </div>

                        <div className="text-foreground mt-4 flex gap-x-2">
                            <div>
                                <AppWindow className="text-foreground size-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                    Technical Support
                                </span>
                                <span className="text-secondary-foreground text-sm font-normal">
                                    Login issues, site errors, or feature
                                    assistance
                                </span>
                            </div>
                        </div>

                        <div className="text-foreground mt-4 flex gap-x-2">
                            <div>
                                <Handshake className="text-foreground size-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                    Feedback & Suggestions
                                </span>
                                <span className="text-secondary-foreground text-sm font-normal">
                                    Share ideas to improve your learning
                                    experience
                                </span>
                            </div>
                        </div>

                        <p className="text-foreground mt-4 text-base font-semibold">
                            Contact Us
                        </p>

                        <div className="border-border text-foreground mt-2 flex gap-x-2 rounded-[8px] border p-3">
                            <div>
                                <Mail className="text-foreground size-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                    Email
                                </span>
                                <a
                                    href="mailto:support@clubhealth.uk"
                                    className="text-primary text-sm font-medium underline"
                                >
                                    support@clubhealth.uk
                                </a>
                            </div>
                        </div>

                        <div className="border-border text-foreground mt-2 flex gap-x-2 rounded-[8px] border p-3">
                            <div>
                                <Phone className="text-foreground size-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                    Phone
                                </span>
                                <a
                                    href="tel:+447392477708"
                                    className="text-primary text-sm font-medium"
                                >
                                    +44 (0) 7392 477 708
                                </a>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-10 w-17 cursor-pointer"
                                >
                                    Close
                                </Button>
                            </DialogClose>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
