import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = (props) => {
  return (
    <div>
      <aside className='min-h-screen h-full w-[15rem] bg-[#1F2937] text-white px-8 py-6 flex flex-col space-y-4 fixed left-0 top-0 bottom-0'>
        <Link href={`/${props.role}`} className='flex justify-center items-center'>
          <Image
            className="block h-8 w-auto lg:hidden"
            src="/images/logo.jpeg"
            alt="Your Company"
            height={100}
            width={100}
            priority
          />
          <Image
            className="hidden h-8 w-auto lg:block"
            src="/images/logo.jpeg"
            alt="Your Company"
            height={100}
            width={100}
            priority
          />
        </Link>

        <div className='flex flex-col space-y-8 py-10'>
          <Link href={`/${props.role}/home`}>Home</Link>
          <Link href={`/${props.role}/about`}>about</Link>
          <Link href={`/${props.role}/contact`}>contact</Link>
          <Link href={`/${props.role}/user-details`}>Edit Details</Link>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
