import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const CourseFilterTabs = ({
    filters = [],
    defaultFilter = '',
    onFilterChange,
    tabsListClassName = '',
    tabsTriggerClassName = '',
}) => {
    return (
        <Tabs onValueChange={onFilterChange} defaultValue={defaultFilter}>
            <TabsList
                className={`bg-border grid grid-cols-3 ${tabsListClassName}`}
            >
                {filters.map((filter) => (
                    <TabsTrigger
                        key={filter}
                        value={filter}
                        className={`text-secondary-foreground text-sm ${tabsTriggerClassName}`}
                    >
                        {filter}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}

export default CourseFilterTabs
