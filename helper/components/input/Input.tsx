"use client";

import React from 'react'
import './style.css';

type InputType = {
    type: "text" | "email" | "password";
    name:string;
    placeholder:string;
    onChange?:(event: React.ChangeEvent<HTMLInputElement>) => void;
    onBLur?:(event: React.ChangeEvent<HTMLInputElement>) => void;
    extraStyle?: string;
    value?: string;
}

const Input:React.FC<InputType> = ({name,placeholder,type,onChange, onBLur, extraStyle,value}) => {
  return (
    <input value={value} autoComplete='off' onBlur={onBLur} className={`input ${extraStyle}`} onChange={onChange}  type={type} name={name} placeholder={placeholder} />
  )
}

export default Input
