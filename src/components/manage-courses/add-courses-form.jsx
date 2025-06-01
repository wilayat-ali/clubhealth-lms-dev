'use client'

import {
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
} from '@/components/ui/drawer'
import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import FileUpload from '../upload'
import QuillEditor from '../quill-editor'
import CustomSelect from '../custom-select'
import CourseFilterTabs from '../course-filter-tabs'

const AddCourseForm = ({
    form,
    activeTab,
    setActiveTab,
    statusOption,
    prerequisiteOption,
    instructorOption,
    learnerOption,
    certificateOption,
    coursesFilters,
}) => {
    return (
        <div className="flex-1 p-6 pl-10">
            <DrawerHeader className="px-0 pb-6">
                <DrawerTitle className="text-lg font-semibold">
                    Add Course
                </DrawerTitle>
                <DrawerDescription />
            </DrawerHeader>

            <div className="space-y-4">
                {/* Title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <Label className="text-sm font-medium">Title</Label>
                            <FormControl>
                                <Input {...field} placeholder="Title" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Status and Prerequisite */}
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-sm font-medium">
                                    Status
                                </Label>
                                <FormControl>
                                    <CustomSelect
                                        {...field}
                                        className="w-full"
                                        options={statusOption}
                                        placeholder="Select Status"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="prerequisite"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-sm font-medium">
                                    Prerequisite
                                </Label>
                                <FormControl>
                                    <CustomSelect
                                        {...field}
                                        className="w-full"
                                        options={prerequisiteOption}
                                        placeholder="Select Prerequisite"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Short Description */}
                <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                        <FormItem>
                            <Label className="text-sm font-medium">
                                Short Description
                            </Label>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    className="mt-1 min-h-[80px] resize-none"
                                    placeholder="Short Description"
                                    rows={3}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Instructor and Learner Groups */}
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="instructor"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-sm font-medium">
                                    Instructor
                                </Label>
                                <FormControl>
                                    <CustomSelect
                                        {...field}
                                        className="w-full"
                                        options={instructorOption}
                                        placeholder="Select Instructor"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="learnerGroups"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-sm font-medium">
                                    Learner Groups
                                </Label>
                                <FormControl>
                                    <CustomSelect
                                        {...field}
                                        className="w-full"
                                        options={learnerOption}
                                        placeholder="Select Learner Groups"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="timeToComplete"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-sm font-medium">
                                    Time to Complete
                                </Label>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter Time to Complete"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="certificateUponCompletion"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-sm font-medium">
                                    Certificate upon completion
                                </Label>
                                <FormControl>
                                    <CustomSelect
                                        {...field}
                                        className="w-full"
                                        options={certificateOption}
                                        placeholder="Select Certificate"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="file"
                    render={({
                        field: { onChange },
                        fieldState: { error },
                    }) => (
                        <FormItem>
                            <Label className="text-sm font-medium">
                                Cover Image
                            </Label>
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

                {/* Tabs */}
                <div className="space-y-2">
                    <CourseFilterTabs
                        filters={coursesFilters}
                        coursesFilters
                        onFilterChange={(value) => setActiveTab(value)}
                        defaultFilter="OverView"
                        tabsListClassName="bg-muted"
                        tabsTriggerClassName="text-foreground font-semi-bold"
                    />
                </div>

                {/* Rich Text Editor */}
                {activeTab === 'OverView' && (
                    <FormField
                        control={form.control}
                        name="overview"
                        render={({ field }) => (
                            <FormItem>
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
                )}
                {activeTab === "What you'll learn" && (
                    <FormField
                        control={form.control}
                        name="whatYoullLearn"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <QuillEditor
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="What will learners gain..."
                                        className="min-h-[600px]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {activeTab === 'Who should enroll' && (
                    <FormField
                        control={form.control}
                        name="whoShouldEnroll"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <QuillEditor
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Who is this course for?"
                                        className="min-h-[600px]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
            </div>
        </div>
    )
}

export default AddCourseForm
