import React from 'react'
import { Element } from 'react-scroll'

import Slugify from '@/helper/slugify'
import CourseCard from '@/components/course-card'
import SectionImage from '@/components/section-image'

const CourseSection = React.memo(
    ({
        courseSectionData,
        listClassName,
        courseRoadMapClassName,
        continueStudy,
    }) => {
        return (
            <div>
                {courseSectionData.map((item, principleIndex) => {
                    const sectionId = Slugify(item.name)

                    return (
                        <Element key={principleIndex} name={sectionId}>
                            <p className="text-foreground font-xl pt-7 leading-none font-semibold">
                                {item.name}
                            </p>

                            {item?.image && (
                                <SectionImage image={item?.image} />
                            )}

                            <p className="text-secondary-foreground pt-4">
                                {item.description}
                            </p>
                            <ul
                                className={`list-disc pl-5 ${listClassName} ${item.description ? 'mt-4' : 'mt-0'}`}
                            >
                                {item?.points?.map((point, pointIndex) => (
                                    <li
                                        key={pointIndex}
                                        className={`${pointIndex === item.points.length - 1 ? 'mb-0' : 'mb-2'}`}
                                    >
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            <CourseCard
                                data={item}
                                courseRoadMapClassName={courseRoadMapClassName}
                                continueStudy={continueStudy}
                            />
                        </Element>
                    )
                })}
            </div>
        )
    }
)

export default CourseSection
