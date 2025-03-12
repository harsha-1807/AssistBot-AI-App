import Link from 'next/link'
import React from 'react'
import Avatar from './Avatar'
import { SignedIn, SignedOut, SignInButton, UserButton, UserProfile } from '@clerk/nextjs'

function Header() {
  return (
    <header className='bg-white shadow-sm text-gray-800 flex justify-between items-center p-4'>
        <Link href="/" className='flex items-center text-lg font-thin' >
        {/* <Avatar seed='AI assistBot cool' className='rounded-2xl'/> */}
        <Avatar seed='Christopher'/>
            <div >
            <h1>AI AssistBot</h1>
            <h2 className='text-sm'>Customize your own AI Assist Bot</h2>
            </div>
        </Link>
        <div>
            <SignedIn  >
                <UserButton/>
            </SignedIn>
            <SignedOut>
                <SignInButton/>
            </SignedOut>
        </div>
    </header>
  )
}

export default Header