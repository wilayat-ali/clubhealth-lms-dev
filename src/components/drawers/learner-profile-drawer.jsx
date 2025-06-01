'use client'

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer'
import { Accordion } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import CourseItem from '@/components/learner-profile/course-item'
import AssessmentItem from '@/components/learner-profile/assessment-item'
import AchievementItem from '@/components/learner-profile/achievement-item'
import CertificateItem from '@/components/learner-profile/certificate-item'
import AccordionSection from '@/components/learner-profile/accordion-section'
import LearnerProfileHeader from '@/components/learner-profile/learner-profile-header'
import learnerProfileData from '@/data/learner-profile-data.json'

const LearnerProfileDrawer = ({ open, onOpenChange }) => {
    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="right">
            <DrawerContent size="md">
                <div className="h-screen pt-6 pr-6 pl-10">
                    <DrawerHeader className="mb-2">
                        <div className="flex items-center justify-between">
                            <DrawerTitle className="text-xl font-bold">
                                View Profile
                            </DrawerTitle>
                        </div>
                        <DrawerDescription />
                    </DrawerHeader>

                    <div className="w-full pb-6">
                        <LearnerProfileHeader learner={learnerProfileData} />
                        <ScrollArea className="mt-7 max-h-[calc(100vh-162px)] overflow-auto rounded-lg border">
                            <Accordion
                                type="single"
                                collapsible
                                defaultValue="courses"
                                className="overflow-hidden px-3"
                            >
                                <AccordionSection
                                    title="Enrolled Courses"
                                    count={learnerProfileData.courses.length}
                                    value="courses"
                                >
                                    {learnerProfileData.courses.map(
                                        (course, index) => (
                                            <CourseItem
                                                key={index}
                                                course={course}
                                            />
                                        )
                                    )}
                                </AccordionSection>

                                <AccordionSection
                                    title="Assessments"
                                    count={
                                        learnerProfileData.assessments.length
                                    }
                                    value="assessments"
                                >
                                    {learnerProfileData.assessments.map(
                                        (assessment, index) => (
                                            <AssessmentItem
                                                key={index}
                                                assessment={assessment}
                                            />
                                        )
                                    )}
                                </AccordionSection>

                                <AccordionSection
                                    title="Certificates"
                                    count={
                                        learnerProfileData.certificates.length
                                    }
                                    value="certificates"
                                >
                                    {learnerProfileData.certificates.map(
                                        (certificate, index) => (
                                            <CertificateItem
                                                key={index}
                                                certificate={certificate}
                                            />
                                        )
                                    )}
                                </AccordionSection>

                                <AccordionSection
                                    title="Achievements"
                                    count={
                                        learnerProfileData.achievements.length
                                    }
                                    value="achievements"
                                >
                                    {learnerProfileData.achievements.map(
                                        (achievement, index) => (
                                            <AchievementItem
                                                key={index}
                                                achievement={achievement}
                                            />
                                        )
                                    )}
                                </AccordionSection>
                            </Accordion>
                        </ScrollArea>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default LearnerProfileDrawer
