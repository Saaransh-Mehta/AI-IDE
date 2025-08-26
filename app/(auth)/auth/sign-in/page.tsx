import SignInFormClient from '@/module/auth/components/sign-in-form-client'
import Image from 'next/image'
import React from 'react'

const Page = () => {
  return (
    <>
     <Image src={"/public/login.svg"} alt='login Img' height={300} width={300} className='object-cover'/>
     <SignInFormClient/>
    </>
  )
}

export default Page
