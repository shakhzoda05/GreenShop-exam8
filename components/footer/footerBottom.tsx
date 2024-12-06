import { FacebookIcon, InstagramIcon, LinkedinIcon, UnionIcon } from '@/public/images/icon'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FooterBottom = () => {
    const footerSections = [
        {
            title: "My Account",
            links: [
                { name: "My Account", href: "#" },
                { name: "Our stores", href: "#" },
                { name: "Contact us", href: "#" },
                { name: "Career", href: "#" },
                { name: "Specials", href: "#" },
            ],
        },
        {
            title: "Help & Guide",
            links: [
                { name: "Help Center", href: "#" },
                { name: "How to Buy", href: "#" },
                { name: "Shipping & Delivery", href: "#" },
                { name: "Product Policy", href: "#" },
                { name: "How to Return", href: "#" },
            ],
        },
        {
            title: "Categories",
            links: [
                { name: "House Plants", href: "#" },
                { name: "Potter Plants", href: "#" },
                { name: "Seeds", href: "#" },
                { name: "Small Plants", href: "#" },
                { name: "Accessories", href: "#" },
            ],
        },
    ]
    const socialLinks = [
        { name: "Facebook", icon: <FacebookIcon />, href: "https://facebook.com" },
        { name: "Instagram", icon: <InstagramIcon />, href: "https://instagram.com" },
        { name: "LinkedIn", icon: <LinkedinIcon />, href: "https://linkedin.com" },
        { name: "YouTube", icon: <UnionIcon />, href: "https://youtube.com" },
    ]

    return (
        <div className="px-4 py-8 md:py-7">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                {footerSections.map((section) => (
                    <div key={section.title} className="space-y-4">
                        <strong className="text-base font-medium">{section.title}</strong>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            {section.links.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-[#46A358] duration-300">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div className="space-y-4">
                    <h3 className="text-base font-medium">Social Media</h3>
                    <div className="flex space-x-4">
                        {socialLinks.map((social) => (
                            <Link target='_blank' key={social.name} href={social.href} className="p-1 border border-[#46A35833] rounded-lg flex items-center justify-center hover:bg-[#46A35833] duration-300">
                                {social.icon}
                            </Link>
                        ))}
                    </div>
                    <div className="mt-6">
                        <h4 className="mb-4 text-sm font-medium">We accept</h4>
                        <Image priority style={{ width: 'auto', height: "auto" }} src={'/payment.png'} alt={'payment images'} width={224} height={26} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterBottom
