import Footer from '@/module/home/components/Footer'
import {Header} from '@/module/home/components/Header'
import { Metadata } from 'next'
import React from 'react'
import { cn } from '@/lib/utils'
export const metaData :Metadata={
    title:"Home Page",
    description:"This is home page",
}
const HomeLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
<div
        className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
        />
        <Header/>
    <main className='z-20 relative w-full pt-0'>
        {
            children
        }
    </main>
    <Footer/>

    </>
  )
}

export default HomeLayout
