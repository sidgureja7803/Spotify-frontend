"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter()
    useEffect(() => {
        router.replace('/home')
    }, [])
    return (
        <div>Page</div>
    )
}

export default Page
