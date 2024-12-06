import Image from 'next/image'
import React from 'react'
import { BlogsType } from './OurBlog'
import { ArrowIcon } from '@/public/images/icon'

const BlogItem: React.FC<{ item: BlogsType }> = ({ item }) => {
    return (
        <div className='flex flex-col h-full'>
            <div className='relative w-full aspect-[268/195]'>
                <Image
                    alt='blog images'
                    src={item.img}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className='p-3 bg-[#FBFBFB] flex-grow flex flex-col'>
                <p className='text-xs sm:text-sm text-[#46A358] mb-1'>{item.date}</p>
                <h3 className='text-lg sm:text-xl text-[#3D3D3D] leading-tight mb-1 font-bold'>{item.title}</h3>
                <p className='text-xs sm:text-sm text-[#727272] mb-2 line-clamp-2 flex-grow'>{item.description}</p>
                <button className='flex items-center space-x-2 text-sm sm:text-base hover:text-[#46A358] transition duration-300'>
                    <span>Read More</span>
                    <ArrowIcon />
                </button>
            </div>
        </div>
    )
}

export default BlogItem
