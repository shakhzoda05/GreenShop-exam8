"use client";

import { Context } from '@/context/Context';
import Modal from '@/helper/components/modal/Modal';
import { LogIcon } from '@/public/images/icon'
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

const ProfilePage = () => {
  const router = useRouter();
  const { userInfo, setAccessToken, setRefreshToken } = useContext(Context);
  const [logOutModal, setLogOutModal] = useState<boolean>(false);

  function handleClearFunction(): void {
    setLogOutModal(false);
    setAccessToken('');
    setRefreshToken('');
    localStorage.clear();
    router.push('/');
  }

  return (
    <>
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-8 p-4">
        <div className="w-full md:w-64 flex-shrink-0">
          <h2 className="text-xl font-semibold mb-6">My Account</h2>
          <nav className="space-y-1">
            <button
              onClick={() => setLogOutModal(true)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-[#46A358] w-full hover:bg-gray-50"
            >
              <LogIcon />
              Logout
            </button>
          </nav>
        </div>

        <div className="flex-grow bg-white rounded-lg p-6">
          <div className="max-w-2xl">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Personal Information
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1 text-gray-900">{userInfo?.last_name}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <div className="mt-1 text-gray-900">{userInfo?.bio ? userInfo?.bio : "-"}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 text-gray-900">{userInfo?.email}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1 text-gray-900">{userInfo?.phone_number ? userInfo?.phone_number : "-"}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <div className="mt-1 text-gray-900">{userInfo?.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal openModal={logOutModal} setOpenModal={setLogOutModal} extraStyle='max-w-[400px] w-full'>
          <h2 className='text-center text-[22px] font-semibold mb-4'>Are you sure to Log out ?</h2>
          <div className='flex justify-center gap-4'>
            <button onClick={() => setLogOutModal(false)} className='border-2 border-gray-400 px-4 py-2 rounded-lg text-sm hover:bg-[#000]/20 duration-300'>No</button>
            <button onClick={handleClearFunction} className='border-2 border-[#46A358] px-4 py-2 rounded-lg text-sm hover:bg-[#000]/20 duration-300'>Yes</button>
          </div>
      </Modal>
    </>
  )
}

export default ProfilePage
