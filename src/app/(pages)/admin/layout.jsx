'use client'

import { useRoleBaseRedirect } from '@/hooks/use-role-base-redirect'

const AdminLayout = ({ children }) => {
    const loading = useRoleBaseRedirect(['admin'])

    if (loading) return null

    return <>{children}</>
}
export default AdminLayout
