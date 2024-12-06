"use client";

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './style.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { ProductType } from '@/service/products/Products';
import Image from 'next/image';
import { Skeleton } from 'antd';
import { useRouter } from 'next/navigation';

export const SwiperShop: React.FC<{ products: ProductType[], isLoading: boolean }> = ({ products, isLoading }) => {
    const router = useRouter();
    const noProduct: number[] = [1, 2, 3, 4];
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    '@0.75': {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    '@1.00': {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    '@1.50': {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination]}
                className="swiper-shop"
            >
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <SwiperSlide key={index} className="swiper-slide-shop">
                            <div>
                                <Skeleton.Image style={{ width: 216, height: 243 }} />
                                <div className="mt-3">
                                    <Skeleton active title={false} paragraph={{ rows: 2, width: ['60%', '40%'] }} />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : products.length > 0 ?
                    products.map((product, index) => (
                        <SwiperSlide onClick={() => product ? router.push(`/shop/${product.product_id}`) : {}} key={index} className='swiper-slide-shop'>
                            <div>
                                <div className=' p-4 bg-[#FBFBFB] rounded-lg'><Image style={{ width: "190px", height: "243px" }} src={product.image_url ? product.image_url[0] : "/logo.svg"} alt={product.product_name ? product.product_name : "product img"} width={190} height={243} /></div>
                                <h2 className='text-[15px] text-[#3D3D3D] mt-3 mb-[5px]'>{product ? product.product_name : "No Product avaliable"}</h2>
                                <strong className='text-[16px] text-[#46A358]'>${product ? product.cost : "000.00"}</strong>
                            </div>
                        </SwiperSlide>
                    )) :
                    noProduct.map((item: number) => (
                        <SwiperSlide key={item} className='swiper-slide-shop'>
                            <div>
                                <div className='p-4 bg-[#FBFBFB] rounded-lg'><Image src={"/logo.svg"} style={{width:"190px", height:"2443", objectFit:"contain"}} alt={"product img"} width={190} height={243} /></div>
                                <h2 className='text-[15px] text-[#3D3D3D] mt-3 mb-[5px]'>No Product avaliable</h2>
                                <strong className='text-[16px] text-[#46A358]'>$000.00</strong>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    );
}
