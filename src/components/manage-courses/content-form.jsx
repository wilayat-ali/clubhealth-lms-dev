import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import FileUpload from '../upload'
import QuillEditor from '../quill-editor'

const ContentForm = ({ form, onSubmit }) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="headline"
                    render={({ field }) => (
                        <FormItem>
                            <div className="x flex justify-between text-sm">
                                <div className="text-foreground font-medium">
                                    Headline
                                </div>
                                <div className="text-secondary-foreground">
                                    Optional
                                </div>
                            </div>
                            <FormControl>
                                <Input
                                    placeholder="Treatment Modalities & Basic Principles"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="photo"
                    render={({
                        field: { onChange },
                        fieldState: { error },
                    }) => (
                        <FormItem>
                            <div className="x flex justify-between text-sm">
                                <div className="text-foreground font-medium">
                                    Photo
                                </div>
                                <div className="text-secondary-foreground">
                                    Optional
                                </div>
                            </div>
                            <FormControl>
                                <FileUpload
                                    onFileSelect={onChange}
                                    error={!!error}
                                    showPreview={false}
                                    accept={{
                                        'image/png': [],
                                        'image/jpeg': [],
                                        'image/jpg': [],
                                        'image/gif': [],
                                    }}
                                    multiple={false}
                                    maxSize={5 * 1024 * 1024}
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
                                <QuillEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Dive into the fundamentals..."
                                    className="min-h-[600px]"
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

export default ContentForm
