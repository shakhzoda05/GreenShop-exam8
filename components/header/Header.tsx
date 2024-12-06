"use client"

import Image from 'next/image'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import Button from '../../helper/components/button/Button';
import { BasketIcon, FilterIcon, LogIcon, LogoIcon } from '@/public/images/icon';
import Modal from '../../helper/components/modal/Modal';
import { usePathname, useRouter } from 'next/navigation';
import RegisterPart from '../auth/RegisterPart';
import { useAxios } from '@/hooks/useAxios';
import VerifyPart from '../auth/VerifyPart';
import LoginPart from '../auth/LoginPart';
import './style.css';
import ResetPasword from '../auth/ResetPasword';
import NewPasswordPart from '../auth/NewPasswordPart';
import { Context } from '@/context/FilterContext';
import Input from '@/helper/components/input/Input';
import Menubtn from '../MenuBtn/Menubtn';
import { AuthType, NavListType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';



const Header = () => {
    const fetching = useAxios();
    const pathname = usePathname();
    const router = useRouter();
    const [basketCount, setBasketCount] = useState<number>(0);
    const [isMenuBtnOpen, setIsMenuBtnOpen] = useState<boolean>(false);
    const [saveEmail, setSaveEmail] = useState<string | undefined>("")
    const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
    const [verifyValue, setVerifyValue] = useState<string>("");
    const [selectedAuth, setSelectedAuth] = useState<"login" | "register" | "verify" | "resetPassword" | "newPassword">('login');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { accessToken, setAccessToken, setRefreshToken, setUserInfo } = useContext(Context)
    const navList: NavListType[] = [
        {
            id: 1,
            title: "Home",
            href: "/",
            isActive: pathname == "/"
        },
        {
            id: 2,
            title: "Shop",
            href: "/shop",
            isActive: pathname.includes("shop")
        },
        {
            id: 3,
            title: "Plant Care",
            href: "/plant-care",
            isActive: pathname == "/plant-care"
        },
        {
            id: 4,
            title: "Blogs",
            href: "/blogs",
            isActive: pathname == "/blogs"
        }
    ];

    function handleSubmit(e: React.MouseEvent<HTMLFormElement>) {
        e.preventDefault();
        if (selectedAuth === "register") {
            const data: AuthType = {
                email: (e.target as HTMLFormElement).email.value,
                password: (e.target as HTMLFormElement).password.value,
                firstName: (e.target as HTMLFormElement).username.value,
                lastName: (e.target as HTMLFormElement).username.value
            }
            setIsLoading(true);
            fetching.post('/register', data).then(() => {
                setSaveEmail(data.email)
                setSelectedAuth('verify')
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
                console.log(err.message);
            });
        }
        else if (selectedAuth === "verify") {
            setIsLoading(true);
            fetching.post('/users/verify', {}, {
                params: { email: saveEmail, code: verifyValue }
            }).then(() => {
                setSelectedAuth("login")
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
                console.log(err.message);
            });
        }
        else if (selectedAuth === "resetPassword") {
            setIsLoading(true);
            fetching.post(`forgot/${(e.target as HTMLFormElement).email.value}`, {}).then(() => {
                setSelectedAuth('newPassword');
                setSaveEmail((e.target as HTMLFormElement).email.value)
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
                console.log(err.message);
            });
        }
        else if (selectedAuth === "newPassword") {
            setIsLoading(true);
            const data = { email: saveEmail, new_password: (e.target as HTMLFormElement).password.value, otp: verifyValue }
            fetching.put(`/reset-password`, data).then(() => {
                setSelectedAuth('login');
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
                console.log(err.message);
            });
        }
        else {
            setIsLoading(true);
            const data = { usernameoremail: (e.target as HTMLFormElement).email.value, password: (e.target as HTMLFormElement).password.value }
            fetching.post('/login', data).then(res => {
                setOpenLoginModal(false);
                setIsLoading(false);
                setAccessToken(res.data.access_token);
                setRefreshToken(res.data.refresh_token);
                setUserInfo(res.data);
                localStorage.setItem('token', JSON.stringify(res.data));
                localStorage.setItem('refresh_token', res.data.refresh_token);
            }).catch(err => {
                setIsLoading(false);
                console.log(err.message);
            });
        }
        (e.target as HTMLFormElement).reset();
    }

    const { data: BaskedProducts = [] } = useQuery({
        queryKey: ['basked products'],
        queryFn: () => fetching.get('/basket', {
            params: {
                page: 1,
                limit: 100
            }
        }).then(res => res.data.ProductId),
        enabled: !!accessToken,
    })

    useEffect(() => {
        setBasketCount(BaskedProducts.length)
    }, [BaskedProducts]);


    useEffect(() => {
        document.body.style.overflow = isMenuBtnOpen ? 'hidden' : 'auto';
    }, [isMenuBtnOpen])

    function handleCLickedProfileOrLogin(): void {
        if (accessToken) {
            router.push('/profile')
            setIsMenuBtnOpen(false);
        }
        else {
            setIsMenuBtnOpen(false);
            setOpenLoginModal(true);
        }
    }

    return (
        <>
            <header className="flex items-center  border-b border-gray-200 px-4 md:px-6 py-4 max-w-[1200px] w-full mx-auto justify-between">
                <div className="flex items-center space-x-0 md:space-x-4">
                    <Link className='cursor-pointer hidden lg:inline-block' href={'/'}>
                        <Image
                            priority
                            style={{ width: "150px", height: "34px" }}
                            alt="logo img"
                            src="/logo.svg"
                            width={150}
                            height={34}
                        />
                    </Link>
                    <button onClick={() => setIsMenuBtnOpen(true)} className='md:hidden'><Menubtn /></button>
                </div>
                <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-12">
                    {navList.map((item: NavListType) => (
                        <Link
                            className={`text-sm lg:text-base relative leading-5 text-gray-700 
                before:h-0.5 before:absolute before:w-full before:bg-green-600 
                lg:before:bottom-[-28px] before:bottom-[-30px]  before:duration-500 duration-200 
                ${item.isActive ? "before:scale-100 font-bold" : "before:scale-0"}`}
                            key={item.id}
                            href={item.href}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                <div className="flex max-md:w-full items-center gap-4 md:gap-6">
                    <label
                        htmlFor="search"
                        className="relative flex items-center w-full md:w-auto ml-4"
                    >
                        <Image
                            className="absolute right-4 scale-[0.7] sm:scale-80 inset-y-0  my-auto"
                            priority
                            style={{ width: "20px", height: "20px" }}
                            alt="Search img"
                            src="/search-img.svg"
                            width={20}
                            height={20}
                        />
                        <Input
                            extraStyle="w-full max-md:max-w-full md:w-auto"
                            name="search"
                            placeholder="Find your plants"
                            type="text"
                        />
                    </label>

                    <button onClick={() => {
                        if(!accessToken || BaskedProducts.length == 0){
                            setBasketCount(0); 
                            toast.error("Your cart is empty");
                            return;
                        }
                        router.push('/shop/shopping-card')
                    }} className="hidden md:flex relative p-2 hover:bg-gray-900/20 duration-300 rounded-full">
                        <BasketIcon />
                        <span className="text-xs absolute top-0 right-0 pb-0.5 px-1.5 text-white bg-green-600 rounded-full">
                            {basketCount}
                        </span>
                    </button>

                    {accessToken ? (
                        <button
                            className="hidden md:flex items-center justify-center"
                            onClick={() => router.push('/profile')}
                        >
                            <Image
                                priority
                                style={{ width: "20px", height: "20px" }}
                                alt="user icon img"
                                src="/user.jpg"
                                width={20}
                                height={20}
                            />
                        </button>
                    ) : (
                        <Button
                            leftIcon={<LogIcon />}
                            extraStyle=" max-md:!hidden w-24"
                            onClick={() => setOpenLoginModal(true)}
                            title="Login"
                            type="button"
                        />
                    )}
                </div>
            </header>
            <Modal openModal={openLoginModal} setOpenModal={setOpenLoginModal} extraStyle='max-w-[500px] w-full'>
                <ul className='flex cursor-pointer items-center gap-[27px] justify-center mb-[40px] pt-[50px]'>
                    {selectedAuth == "verify" ? <li className={`text-[#46A358] text-[16px] leading-5 hover:opacity-70 duration-200 font-medium`}>Verify</li> : <><li onClick={() => setSelectedAuth("login")} className={`${selectedAuth == 'login' ? "text-[#46A358]" : "text-[#3D3D3D]"}  text-[16px] font-medium relative hover:opacity-70 duration-200 leading-5 after:w-[1px] after:h-4 after:bg-[#3D3D3D] after:absolute after:right-[-12px] after:bottom-0 `}>Login</li>
                        <li onClick={() => setSelectedAuth("register")} className={`${selectedAuth == 'register' ? "text-[#46A358]" : "text-[#3D3D3D]"} text-[16px] leading-5 hover:opacity-70 duration-200 font-medium`}>Register</li></>}
                </ul>
                <form onSubmit={handleSubmit} className='w-[300px] mx-auto space-y-5'>
                    {selectedAuth == "login" && <LoginPart onReset={() => setSelectedAuth("resetPassword")} />}
                    {selectedAuth == "register" && <RegisterPart />}
                    {selectedAuth == "verify" && <VerifyPart setValue={setVerifyValue} />}
                    {selectedAuth == "resetPassword" && <ResetPasword />}
                    {selectedAuth == "newPassword" && <NewPasswordPart setValue={setVerifyValue} />}
                    <Button type='submit' onClick={() => { }} extraStyle='w-[300px] !py-[15px]' title={isLoading ? <span className="loader"></span> : selectedAuth === "register" ? "Register" : selectedAuth === "verify" ? "Verify" : selectedAuth === "resetPassword" ? "Send Code" : selectedAuth === "newPassword" ? "Reset Password" : "Login"} />
                </form>
            </Modal>
            <Modal extraStyle='h-full w-[70%] !absolute left-0' openModal={isMenuBtnOpen} setOpenModal={setIsMenuBtnOpen}>
                <Link onClick={() => setIsMenuBtnOpen(false)} className='cursor-pointer' href={'/'}>
                    <Image
                        priority
                        style={{ maxWidth: "150px", width: "100%", height: "34px" }}
                        alt="logo img"
                        src="/logo.svg"
                        width={150}
                        height={34}
                    />
                </Link>
                <div className='flex flex-col mt-6 items-center space-y-3'>
                    {navList.map((item: NavListType) => (
                        <Link
                            onClick={() => setIsMenuBtnOpen(false)}
                            className={` duration-300 text-[14px] ${item.isActive ? "text-green-600 font-bold" : ""}`}
                            key={item.id}
                            href={item.href}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
                <Button
                    extraStyle='!max-w-full mt-4 w-full'
                    title={accessToken ? "Profile" : "Login"}
                    type='button'
                    onClick={handleCLickedProfileOrLogin}
                />
            </Modal>
        </>
    )
}

export default Header
