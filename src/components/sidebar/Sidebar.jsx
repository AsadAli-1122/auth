import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div>
      <aside className='min-h-screen h-full w-[15rem] bg-[#1F2937] text-white px-8 py-6 flex flex-col space-y-4 fixed left-0 top-0 bottom-0'>
        <Link href='/dashboard' className='flex justify-center items-center'>
                  <Image
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                    height={100}
                    width={100}
                    priority
                  />
                  <Image
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                    height={100}
                    width={100}
                    priority
                  />
        </Link>

<div className='flex flex-col space-y-8 py-10'>
        <Link href='/dashboard/home'>Home</Link>
        <Link href='/dashboard/about'>about</Link>
        <Link href='/dashboard/contact'>contact</Link>
        <Link href='/dashboard/user-details'>Edit Details</Link>

</div>
      </aside>
    </div>
  )
}

export default Sidebar
