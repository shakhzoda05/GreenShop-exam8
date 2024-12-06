import { useAxios } from "@/hooks/useAxios";
import { AuthType, LoginType } from "@/types";

const axiosInstance = useAxios();

export const register = async (data: AuthType) => {
    const res = await axiosInstance.post('/register', data);
    return res.data;
};

export const verify = async (email: string, code: string) => {
    const res = await axiosInstance.post('/verify', {}, {
        params: { email, code },
    });
    return res.data;
};

export const resetPassword = async (email:string) => {
    const res = await axiosInstance.post(`forgot/${email}`, {});
    return res.data;
}

export const updatePassword = async (data: AuthType) => {
    const res = await axiosInstance.put('/reset-password', data);
    return res.data;
};

export const login = async (data: LoginType) => {
    const res = await axiosInstance.post('/login', data);
    return res.data;
};

