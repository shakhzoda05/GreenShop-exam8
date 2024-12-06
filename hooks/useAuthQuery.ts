import { login, register, resetPassword, updatePassword, verify } from "@/api/auth"
import { AuthType, LoginType } from "@/types"
import { useMutation } from "@tanstack/react-query";


export const RegisterMutation = () => {
    return useMutation({
        mutationFn: (data: AuthType) => register(data),
    })
}

export const VerifyMutation = () => {
    return useMutation({
        mutationFn: ({ email, code }: { email: string, code: string }) => verify(email, code),
    })
}

export const ResetPasswordMutation = () => {
    return useMutation({
        mutationFn: (email: string) => resetPassword(email),
    })
}

export const UpdatePasswordMutation = () => {
    return useMutation({
        mutationFn: (data: AuthType) => updatePassword(data),
    });
}

export const LoginMutation = () => {
    return useMutation({
        mutationFn: (data: LoginType) => login(data),
    })
}
