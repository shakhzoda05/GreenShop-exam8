"use client"

import React, { ReactNode } from 'react'
import './style.css';

type Buttontype = {
  title: string | ReactNode ,
  extraStyle: string,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  type: "submit" | "button" | "reset",
  rightIcon?: ReactNode,
  leftIcon?: ReactNode,
}

const Button: React.FC<Buttontype> = ({ title, extraStyle, onClick, type, leftIcon, rightIcon }) => {
  return (
    <button type={type} onClick={onClick} className={`public-button ${extraStyle}`}>
      {leftIcon && leftIcon}
      {title}
      {rightIcon && rightIcon}
    </button>
  )
}

export default Button
