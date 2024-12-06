import { EmailIcon, LocationIcon, TelIcon } from '@/public/images/icon'
import Image from 'next/image'
import React from 'react'

const FooterCenter = () => {
    return (
        <div className='py-4 md:py-[22px] px-4 md:px-[25px] bg-[#46A3581A] flex flex-col md:flex-row items-center md:items-start lg:items-center justify-between space-y-4 md:space-y-0'>
        <Image 
          priority 
          src='/logo.svg' 
          alt='Logo icon' 
          width={150} 
          height={34} 
          className='w-[120px] md:w-[150px] h-auto'
        />
        
        <div className='flex flex-col md:flex-row items-center md:items-start lg:items-center space-y-4 md:space-y-0 md:space-x-4 lg:space-x-8'>
          <ContactItem 
            icon={<LocationIcon />}
            text="70 West Buckingham Ave. Farmingdale, NY 11735"
          />
          
          <ContactItem 
            icon={<EmailIcon />}
            text="contact@greenshop.com"
            href="mailto:contact@greenshop.com"
          />
          
          <ContactItem 
            icon={<TelIcon />}
            text="+88 01911 717 490"
            href="tel:+8801911717490"
          />
        </div>
      </div>
  
    )
}

export default FooterCenter

interface ContactItemProps {
    icon: React.ReactNode
    text: string
    href?: string
}

function ContactItem({ icon, text, href }: ContactItemProps) {
    const content = (
        <>
            {icon}
            <p className='text-sm md:text-[14px] leading-[22px] text-[#3D3D3D]'>{text}</p>
        </>
    )

    return (
        <div className='flex items-center space-x-2 max-w-[200px] md:max-w-none'>
            {href ? (
                <a href={href} className='flex items-center space-x-2'>
                    {content}
                </a>
            ) : (
                content
            )}
        </div>
    )
}
