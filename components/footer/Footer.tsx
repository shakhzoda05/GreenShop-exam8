"use client";

import React from 'react'
import Footer1 from './Footer1'
import Footer2 from './Footer2'
import Footer3 from './footer3'
import { usePathname } from 'next/navigation'

const Footer: React.FC = () => {
  const pathname = usePathname();

  if (pathname.includes('/profile')) {
    return null;
  }
  return (
    <footer>
      <div className='max-w-[1200px] w-full mx-auto bg-[#FBFBFB] border-b-[#46A35833] border-b-[2px]'>
        <Footer1 />
        <Footer2 />
        <Footer3 />
      </div>
      <div className='text-center text-sm text-[#3D3D3D] py-4'>
        © 2021 GreenShop. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
