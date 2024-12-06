import React from 'react'
import Input from '../../helper/components/input/Input'


const LoginPart:React.FC<{onReset:React.MouseEventHandler<HTMLButtonElement>}> = ({onReset}) => {
    return (
        <>
            <p className='text-[#3D3D3D] text-[13px]'>Enter your username and password to login.</p>
            <Input   type='email' name='email' placeholder='almamun_uxui@outlook.com' />
            <Input  type='password' name='password' placeholder='***********' />
            <button onClick={onReset} type='button' className='text-[#46A358] block cursor-pointer text-end text-[14px]'>Forgot Password?</button>
        </>
    )
}

export default LoginPart
