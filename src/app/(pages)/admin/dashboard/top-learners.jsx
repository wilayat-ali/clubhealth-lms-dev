import TopLearnersTable from '@/components/admin/top-learners-table'
import ContentWrapper from '@/components/page/content-wrapper'

const TopLearners = () => {
    return (
        <div className="flex w-full">
            <ContentWrapper size="admin" className="!p-0">
                <TopLearnersTable />
            </ContentWrapper>
        </div>
    )
}

export default TopLearners
