import Button from '@/helper/components/button/Button';
import Input from '@/helper/components/input/Input';
import { FooterFirstIcon, FooterSecondIcon, FooterThirdIcon } from '@/public/images/icon'
import React from 'react'

interface FooterTopCard {
    id: number;
    icon: React.ReactElement;
    title: string;
    description: string;
}

const FooterTop: React.FC = () => {
    const cardsList: FooterTopCard[] = [
        {
            id: 1,
            icon: <FooterFirstIcon />,
            title: "Garden Care",
            description: "We are an online plant shop offering a wide range of cheap and trendy plants."
        },
        {
            id: 2,
            icon: <FooterSecondIcon />,
            title: "Plant Renovation",
            description: "We are an online plant shop offering a wide range of cheap and trendy plants."
        },
        {
            id: 3,
            icon: <FooterThirdIcon />,
            title: "Watering Graden",
            description: "We are an online plant shop offering a wide range of cheap and trendy plants."
        },
    ]

    return (
        <div className='flex flex-col lg:flex-row flex-wrap gap-8 items-start justify-between p-4 md:p-6 lg:p-[30px]'>
            {cardsList.map((item: FooterTopCard) => (
                <FooterCard key={item.id} {...item} />
            ))}
            <NewsletterSignup />
        </div>
    )
}

const FooterCard: React.FC<FooterTopCard> = ({ icon, title, description }) => (
    <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[204px]">
        <div className="relative">
            {icon}
            <span className='w-[74px] h-[74px] bg-[#46A35821] top-[25px] left-[-10px] rounded-full absolute'></span>
        </div>
        <h3 className='text-[17px] text-[#3D3D3D] font-bold mt-[17px] mb-2'>{title}</h3>
        <p className='text-[14px] text-[#727272] leading-[22px]'>{description}</p>
    </div>
)

const NewsletterSignup: React.FC = () => (
    <div className='w-full lg:w-[354px]'>
        <h3 className='text-[18px] font-bold text-[#3D3D3D] mb-[18px]'>Would you like to join newsletters?</h3>
        <form className='flex items-center w-full justify-between rounded-lg overflow-hidden'>
            <Input
                name='email'
                placeholder='enter your email address...'
                type='email'
                extraStyle='w-[75%] text-[12px] !rounded-r-none rounded-l-lg'
            />
            <Button
                title="Join"
                extraStyle='w-[25%] !py-[14px] !rounded-l-none rounded-r-lg font-bold'
                type='submit'
            />
        </form>
        <p className='text-[13px] text-[#727272] mt-[17px]'>
            We usually post offers and challenges in newsletter. We're your online houseplant destination. We offer a wide range of houseplants and accessories shipped directly from our (green)house to yours!
        </p>
    </div>
)

export default FooterTop
