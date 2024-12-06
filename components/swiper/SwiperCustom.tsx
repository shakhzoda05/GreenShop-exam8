"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductImg from '../../public/product.png'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.css';

// import Swiper core and required modules
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { ArrowIcon } from '@/public/images/icon';

export default function SwiperCustom() {
  return (
    <section>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={600}
        modules={[Autoplay]}
        className="swiper-home"
      >
        <SwiperSlide className='sm:!p-10 swiper-slide-home'>
          <div className="max-w-[530px]">
            <p className="text-[11px] sm:text-[16px] max-sm:absolute top-2  sm:mb-3 text-[#3D3D3D] font-medium tracking-widest">
              WELCOME TO GREENSHOP
            </p>

            <h2 className="font-extrabold text-[14px] leading-4 sm:text-[28px] sm:leading-[29px] md:text-[40px] md:leading-[44px] lg:text-[55px] lg:leading-[60px] text-gray-800 mb-[3px] sm:mb-2 lg:mb-4">
              LET'S MAKE A
              BETTER <span className="text-green-600">PLANET</span>
            </h2>

            <p className="sm:text-sm text-[12px] max-sm:line-clamp-1 max-md:line-clamp-2 text-gray-600 mb-[10px] sm:mb-4 lg:mb-6">
              We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create a unique Urban Jungle. Order your favorite plants!
            </p>

            <button
              type="button"
              className="text-green-600 text-[9px] sm:text-[16px] hover:text-white bg-transparent border duration-300 border-green-600 hover:bg-green-600 px-2 py-1 sm:px-6 sm:py-3 rounded-md font-medium flex items-center justify-between"
            >SHOP NOW <ArrowIcon />
            </button>
          </div>
          <Image
            className="max-w-[120px] max-sm:h-[120px] sm:max-w-[230px] md:max-w-[330px] h-auto lg:max-w-[430px] xl:max-w-[500px] w-full"
            priority
            src={ProductImg}
            alt="Product img"
          />
        </SwiperSlide>

      </Swiper>
    </section>
  );
}
