import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from '../ui/button'
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { get } from 'http';
import { redirect } from 'next/navigation';


const Navbar = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  return (
    <nav className="py-5 flex items-center justify-between">
      <div className='flex items-center gap-6'>
          <Link href="/">
            <h1 className='text-3xl font-semibold'>Blog<span className='text-blue-500'>Board</span></h1>
          </Link>
          <div className='hidden sm:flex items-center gap-6'>
            <Link href="/" className='text-md font-medium hover:text-blue-500 transition-colors'>
                Home 
            </Link>
            <Link href="/dashboard" className='text-md font-medium hover:text-blue-500 transition-colors'>
                Dashboard 
            </Link>
          </div>
      </div>
      {
        !user ? (
        <div className='flex items-center gap-4'>
          <LoginLink className={buttonVariants()}>Login</LoginLink>
          <RegisterLink className={buttonVariants({variant : "secondary"})}>Sign up</RegisterLink>
        </div>
        ) : (
          <div className='flex items-center gap-4'>
            <p>{user.given_name}</p>
            <LogoutLink className={buttonVariants({variant : "secondary"})}>Logout</LogoutLink>
          </div>
        )
      }
    </nav>
  )
}

export default Navbar