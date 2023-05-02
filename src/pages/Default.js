import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Default() {
  return (
    <div className='h-screen flex justify-center items-center space-x-10 overflow-hidden'>
      <Image 
      src='/images/abstract-dark-background-with-flowing-colouful-waves_1048-13124.avif'
      alt='bg'
      width={100}
      height={100}
      className='absolute w-full overflow-hidden max-h-screen -z-10'
      priority
      />
        <Link className='px-10 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded tracking-wider' href='/auth/login'>Login</Link>
        <Link className='px-10 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded tracking-wider' href='/auth/signup'>Signup</Link>
    </div>
  )
}

export default Default
