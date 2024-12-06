import React from 'react'
import BlogItem from './BlogItem'

export interface BlogsType {
    id: number
    img: string
    date: string
    title: string
    description: string
}

const OurBlog = () => {
    const blogsData: BlogsType[] = [
        {
            id: 1,
            img: '/blog-img1.png',
            date: "September 12  I Read in 6 minutes",
            title: 'Cactus & Succulent Care Tips',
            description: 'Cacti are succulents are easy care plants for any home or patio.'
        },
        {
            id: 2,
            img: '/blog-img2.png',
            date: "September 13  I Read in 2 minutes",
            title: "Top 10 Succulents for Your Home",
            description: 'Cacti are succulents are easy care plants for any home or patioBest in hanging baskets. Prefers medium to high light.'
        },
        {
            id: 3,
            img: '/blog-img3.png',
            date: "September 15  I Read in 3 minutes",
            title: "Cacti & Succulent Care Tips",
            description: "Cacti and succulents thrive in containers and because most are.."
        },
        {
            id: 4,
            img: '/blog-img4.png',
            date: "September 15  I Read in 2 minutes",
            title: "Best Houseplants Room by Room",
            description: 'The benefits of houseplants are endless. In addition to..'
        }
    ]
    return (
        <section className='mb-8 md:mb-16 lg:mb-[100px] px-0 hover:shadow-lg'>
            <h2 className='text-center text-2xl md:text-[30px] font-bold text-[#3D3D3D] mb-2 sm:mb-[15px]'>Our Blog Posts</h2>
            <p className='text-sm md:text-[14px] mb-6 md:mb-[35px] text-center text-[#727272] leading-6 max-w-2xl mx-auto'>
                We are an online plant shop offering a wide range of cheap and trendy plants.
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
                {blogsData.map((item: BlogsType) => (
                    <BlogItem key={item.id} item={item} />
                ))}
            </div>
        </section>
    )
}

export default OurBlog
