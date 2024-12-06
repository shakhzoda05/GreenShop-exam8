"use client";

import React, { SetStateAction } from 'react'
import { Input, type GetProps } from 'antd';
import InputM from '@/helper/components/input/Input'

type VerifyType = {
    setValue: React.Dispatch<SetStateAction<string>>
};
type OTPProps = GetProps<typeof Input.OTP>;

const NewPasswordPart: React.FC<VerifyType> = ({ setValue }) => {
    const onChange: OTPProps['onChange'] = (text) => {
        setValue(text)
    };

    const sharedProps: OTPProps = {
        onChange,
    };
    return (
        <>
            <InputM type='password' name='password' placeholder='Enter New Password' />
            <p className='text-[18px]'>Confirm Code in your email</p>
            <Input.OTP size='large' style={{ marginBottom: "20px" }} formatter={(str) => str.toUpperCase()} {...sharedProps} />
        </>
    )
}

export default NewPasswordPart
