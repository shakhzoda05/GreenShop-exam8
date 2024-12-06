import Button from '@/helper/components/button/Button'
import { ArrowIcon } from '@/public/images/icon'
import Image from 'next/image'
import React from 'react'

interface CardProps {
    image: string
    alt: string
    title: string
    description: string
}

const PlantsCard:React.FC<CardProps> = ({ image, alt, title, description }) => {
    return (
        <div className='w-full lg:max-w-[49%] relative bg-[#FBFBFB] rounded-lg flex flex-col lg:flex-row items-center lg:items-end lg:justify-end p-4 lg:p-0 lg:pr-[30px]'>
            <Image
                className='lg:absolute left-0 bottom-0 w-[292px] h-[292px] max-lg:object-contain rounded-t-lg lg:rounded-none'
                priority
                src={image}
                alt={alt}
                width={292}
                height={292}
            />
            <div className='w-full lg:w-[292px] flex flex-col items-center lg:items-end text-center lg:text-end mt-4 lg:mt-0 lg:pb-[46px] lg:pt-[37px]'>
                <h2 className='text-[18px] w-full lg:w-[170px] line-clamp-1 uppercase font-bold text-[#3D3D3D] mb-2 sm:mb-4'>{title}</h2>
                <p className='text-[14px] text-[#727272] mb-4 line-clamp-2'>
                    {description}
                </p>
                <Button title="Find More" type='button' rightIcon={<ArrowIcon />} extraStyle='sm:w-[140px] w-full' />
            </div>
        </div>
    )
}

export default PlantsCard
