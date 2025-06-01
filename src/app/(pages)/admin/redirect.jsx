'use client'
import { redirect, useParams, usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
// import { SiteLogo } from "@/components/svg";
import { Loader2 } from "lucide-react";

const Redirect = () => {
//   const pathname = usePathname()
//   const searchParams = useSearchParams()

  useEffect(() => {
    // if (searchParams.get('orderscan')) {
    //   localStorage.setItem("webpath", searchParams.get('orderscan'))
    // }
    redirect('/')
  }, [])


  return (
    <div className=" h-screen flex items-center justify-center flex-col space-y-2">
      {/* <SiteLogo className=" h-13 w-13 text-primary" /> */}
      <span className=" inline-flex gap-1">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </span>
    </div>
  )
}

export default Redirect