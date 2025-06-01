'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from '@/components/ui/form'

const HelpSupportSection = ({ form }) => {
    return (
        <section className="bg-background mb-7 w-full rounded-lg p-6 shadow-sm xl:max-w-xl 2xl:max-w-2xl">
            <div className="text-foreground mb-4 text-lg font-semibold">
                Help & Support
            </div>

            <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="col-span-1">
                    <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-foreground text-sm font-medium">
                                    Contact Email
                                </Label>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Contact Email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-1">
                    <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-foreground text-sm font-medium">
                                    Contact Phone
                                </Label>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Contact Phone"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </section>
    )
}

export default HelpSupportSection
