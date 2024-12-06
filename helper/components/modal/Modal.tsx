"use client";

import { CloseIcon } from '@/public/images/icon';
import React, { ReactNode, SetStateAction } from 'react';
import "./style.css";

type ModalType = {
    openModal:boolean;
    setOpenModal:React.Dispatch<SetStateAction<boolean>>;
    extraStyle?:string;
    children:ReactNode
}

const Modal:React.FC<ModalType> = ({openModal, setOpenModal, extraStyle,children}) => {
  return (
    <div onClick={(e) => (e.target as HTMLDivElement).id === "wrapper"  ? setOpenModal(false) : ""} id='wrapper' className={`modal-outer   ${openModal ? "open" : ""}`}>
      <div className={`p-4 bg-white shadow-lg relative  ${extraStyle} modal-inner`}>
        <button onClick={() => setOpenModal(false)} className='close-btn'><CloseIcon/></button>
        {children}
      </div>
    </div>
  )
}

export default Modal
