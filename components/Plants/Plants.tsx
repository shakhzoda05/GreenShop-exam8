import React from 'react'
import PlantsCard from './PlantsCard'

export default function Plants() {
    return (
        <section className='mt-8 md:mt-16 lg:mt-[100px] flex flex-col lg:flex-row items-center justify-between mb-8 md:mb-12 lg:mb-[138px] space-y-8 lg:space-y-0 lg:space-x-4'>
            <PlantsCard
                image="/plant.png"
                alt="plant img"
                title="Summer cactus & succulents"
                description="We are an online plant shop offering a wide range of cheap and trendy plants"
            />
            <PlantsCard
                image="/styling.png"
                alt="styling img"
                title="Styling Trends & much more"
                description="We are an online plant shop offering a wide range of cheap and trendy plants"
            />
        </section>
    )
}



