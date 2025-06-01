import Image from 'next/image'
import { Download } from 'lucide-react'
import { DynamicIcon } from 'lucide-react/dynamic'
import React from 'react'

const CourseCard = ({
    data,
    courseRoadMapClassName,
    continueStudy = false,
}) => {
    return (
        <div>
            {data?.courseOutline?.map((course, outlineIndex) => (
                <div
                    key={outlineIndex}
                    className={`bg-background hover:bg-secondary-background flex cursor-pointer gap-x-3 rounded-lg p-4 shadow-sm ${
                        outlineIndex === data.courseOutline.length - 1
                            ? 'mb-0'
                            : courseRoadMapClassName
                              ? 'my-7'
                              : 'mb-4'
                    }`}
                >
                    <div>
                        {course?.icon && (
                            <DynamicIcon
                                name={course?.icon}
                                className="text-foreground h-6 w-6"
                            />
                        )}
                        {course?.url && (
                            <Image
                                src={course?.url}
                                alt="url"
                                width={50}
                                height={50}
                            />
                        )}
                    </div>

                    <div className="flex items-start justify-between">
                        <div className="flex flex-col">
                            <h5 className="text-md text-foreground font-medium">
                                {course.name}
                            </h5>
                            <p
                                className={`font-normal ${courseRoadMapClassName}`}
                            >
                                {course.description}
                            </p>
                            <div className="mt-[10px] flex items-center gap-x-3">
                                <p className="text-secondary-foreground text-sm">
                                    {course.module}
                                </p>

                                {course?.circleIcon && (
                                    <DynamicIcon
                                        name={course?.circleIcon}
                                        className="text-foreground h-2 w-2"
                                    />
                                )}

                                <p className="text-secondary-foreground text-sm">
                                    {course.duration}
                                </p>
                            </div>
                        </div>

                        {continueStudy && (
                            <Download className="text-muted-foreground mt-1 size-5" />
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CourseCard
