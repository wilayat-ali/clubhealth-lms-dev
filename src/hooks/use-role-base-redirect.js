'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const useRoleBaseRedirect = (expectedRoles) => {
    const router = useRouter()

    useEffect(() => {
        const email = localStorage.getItem('userEmail')
        const role = localStorage.getItem('userRole')

        if (!email || !role) {
            router.replace('/login')
            return
        }

        if (expectedRoles && !expectedRoles.includes(role)) {
            router.replace('/login')
        }
    }, [expectedRoles, router])
}
