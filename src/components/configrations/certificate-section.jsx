'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from '@/components/ui/form'
import FileUpload from '@/components/upload'

const CertificateSection = ({ form }) => {
    return (
        <section className="bg-background mb-7 w-full rounded-lg p-10 shadow-sm xl:max-w-xl 2xl:max-w-2xl">
            <div className="text-foreground mb-4 text-lg font-semibold">
                Certificate Information
            </div>
            <div className="mt-6 space-y-6">
                <div className="space-y-2">
                    <Label className="text-foreground text-sm font-medium">
                        Content
                    </Label>
                    <div className="border-border text-foreground mt-3 rounded-md border px-3 py-2 text-sm">
                        This certificate acknowledges that you have completed
                        the course "{'{Course Title}'}" and demonstrated a solid
                        understanding of the core principles and techniques.
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="authorisedBy"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Authorised by</Label>
                                <FormControl>
                                    <Input
                                        className="mt-2"
                                        {...field}
                                        placeholder="Authorised by"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="designation"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Designation</Label>
                                <FormControl>
                                    <Input
                                        className="mt-2"
                                        {...field}
                                        placeholder="Designation"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="signature"
                    render={({
                        field: { onChange },
                        fieldState: { error },
                    }) => (
                        <FormItem>
                            <Label className="mb-2">Signature</Label>
                            <FormControl>
                                <FileUpload
                                    onFileSelect={onChange}
                                    showPreview
                                    error={!!error}
                                    accept={{
                                        'image/png': [],
                                        'image/jpeg': [],
                                    }}
                                    multiple={false}
                                    maxSize={5 * 1024 * 1024}
                                    fallbackImage="/icons/signature.svg"
                                    helperText="To achieve the best results, please upload a transparent PNG image."
                                    helperTextClassName="text-muted-foreground mt-3 text-[13px]"
                                    helperTextIcon={false}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </section>
    )
}

export default CertificateSection
