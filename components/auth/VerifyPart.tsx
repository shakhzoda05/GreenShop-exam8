"use client";

import React, { SetStateAction } from 'react'
import { Input, type GetProps } from 'antd';

type VerifyType = {
    setValue: React.Dispatch<SetStateAction<string>>
};
type OTPProps = GetProps<typeof Input.OTP>;

const VerifyPart: React.FC<VerifyType> = ({ setValue }) => {

    const onChange: OTPProps['onChange'] = (text) => {
        setValue(text)
    };

    const sharedProps: OTPProps = {
        onChange,
    };
    return (
        <Input.OTP size='large' style={{ marginBottom: "20px" }} formatter={(str) => str.toUpperCase()} {...sharedProps} />
    )
}

export default VerifyPart
