import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import FileUpload from '../upload'

const DocumentForm = ({ form, onSubmit }) => {
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-6 space-y-6"
            >
                <FormField
                    control={form.control}
                    name="file"
                    render={({
                        field: { onChange },
                        fieldState: { error },
                    }) => (
                        <FormItem>
                            <FormControl>
                                <FileUpload
                                    onFileSelect={onChange}
                                    error={!!error}
                                    showPreview={false}
                                    accept={{
                                        'application/pdf': [],
                                        'application/msword': [],
                                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                                            [],
                                        'application/vnd.ms-powerpoint': [],
                                        'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                                            [],
                                    }}
                                    multiple={false}
                                    maxSize={10 * 1024 * 1024}
                                    helperText="Supported: PDF, DOC, DOCX, PPT, PPTX."
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <div className="x flex justify-between text-sm">
                                <div className="text-foreground font-medium">
                                    Document Title
                                </div>
                                <div className="text-secondary-foreground">
                                    Optional
                                </div>
                            </div>
                            <FormControl>
                                <Input
                                    placeholder="Details about the document..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                        <FormItem>
                            <div className="x flex justify-between text-sm">
                                <div className="text-foreground font-medium">
                                    Details
                                </div>
                                <div className="text-secondary-foreground">
                                    Optional
                                </div>
                            </div>
                            <FormControl>
                                <Textarea
                                    className="min-h-20"
                                    placeholder="Course Outline"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default DocumentForm
