import React from 'react'
import Input from '@/helper/components/input/Input'

const RegisterPart = () => {
    return (
        <>
            <p className='text-[#3D3D3D] text-[13px]'>Enter your email and password to register.</p>
            <Input type='text' name='username' placeholder='Username' />
            <Input type='email' name='email' placeholder='Enter your email address' />
            <Input type='password' name='password' placeholder='Password' />
            <Input type='password' name='confirmPassword' placeholder='Confirm Password' />
        </>
    )
}

export default RegisterPart
