export interface NavListType  { id: number; title: string; href: string, isActive: boolean };
export interface AuthType { email: string, password?: string, firstName?: string, lastName?: string };
export interface LoginType {usernameoremail:string, password:string,}

export interface UserInfoType {
    accessToken?:string;
    bio?:string;
    email?: string;
    id?:string;
    image_url?:string;
    last_name?:string;
    phone_number?:string;
    refresh_token?:string;
    role?:string;
}
