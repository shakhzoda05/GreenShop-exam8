"use client"

import { SwiperShop } from '@/components/swiperShop/SwiperShop';
import { useAxios } from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React from 'react';

interface ShopLayout {
  children: React.ReactNode;
}

const ShopLayout = ({ children }: ShopLayout) => {
  const pathname = usePathname();
  const axiosInstance = useAxios();

  const { data = [], isPending } = useQuery({
    queryKey: ['products'],
    queryFn: () => axiosInstance.get('/products', {
      params: {
        page: 1,
        limit: 100,
      }
    }).then(res => res.data.products ? res.data.products : []),
  });

  return (
    <div className='max-w-[1200px] mx-auto w-full px-6'>
      <p className='py-[40px]'><strong>Home</strong> / Shop {pathname.includes("shopping-card") ? "/ Shopping Cart" : ""}</p>
      {children}
      <div className='mb-[128px] w-full'>
        <p className='text-[17px] pb-3 mb-[44px] text-[#46A358] border-b-[1px] border-[#46A35880]'>{pathname.includes("shop/") && !pathname.includes("shop/shopping-card")  ? "Releted Products" : "You may be interested in"} </p>
        <SwiperShop products={data} isLoading={isPending}/>
      </div>

    </div>
  )
}

export default ShopLayout
