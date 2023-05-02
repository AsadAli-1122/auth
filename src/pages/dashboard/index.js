import React from 'react'
import Layout from '../../components/layout/layout'
import Image from 'next/image'

const Index = () => {
  return (
    <div>
      <Layout>
        <Image
        src='/images/abstract-dark-background-with-flowing-colouful-waves_1048-13124.avif'
        alt='Abstract'
        width={100}
        height={100}
        className='w-full'
        priority
        />
      </Layout>
    </div>
  )
}

export default Index
