import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PrivacyPolicy from '@/components/PrivacyPolicy'
import React from 'react'

export default function page() {
    return (
        <div className='px-5 py-4 md:px-10 md:py-8'>
            <Header />
            {/* <Hero/> */}
            <PrivacyPolicy />
        </div>
    )
}
