"use client";

import React from 'react'
import FooterTop from './FooterTop'
import FooterCenter from './FooterCenter'
import FooterBottom from './footerBottom'
import { usePathname } from 'next/navigation'

const Footer: React.FC = () => {
  const pathname = usePathname();

  if (pathname.includes('/profile')) {
    return null;
  }
  return (
    <footer>
      <div className='max-w-[1200px] w-full mx-auto bg-[#FBFBFB] border-b-[#46A35833] border-b-[2px]'>
        <FooterTop />
        <FooterCenter />
        <FooterBottom />
      </div>
      <div className='text-center text-sm text-[#3D3D3D] py-4'>
        © 2021 GreenShop. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
