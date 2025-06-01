import React from 'react'
import { Link } from 'react-scroll'

import Slugify from '@/helper/slugify'

const CourseTabs = React.memo(
    ({ courseTabsData, handleTabClick, activeTab }) => {
        return (
            <div>
                {courseTabsData.map((item, index) => {
                    const sectionId = Slugify(item.name)
                    const isActive = activeTab === item.name

                    return (
                        <Link
                            key={index}
                            to={sectionId}
                            containerId="scroll-container"
                            smooth={true}
                            duration={500}
                            offset={-110}
                            className={`text-sm font-medium ${isActive ? 'bg-primary text-background' : 'text-foreground hover:bg-muted'} mx-2 cursor-pointer rounded-md px-3 py-2`}
                            onClick={() => handleTabClick(item.name)}
                        >
                            {item.name}
                        </Link>
                    )
                })}
            </div>
        )
    }
)

export default CourseTabs
