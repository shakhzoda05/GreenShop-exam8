import { AuthType } from '@/types'; 
import { useAxios } from './useAxios';
import { SetStateAction } from 'react';


export const useAsyncFnPostRequest = async (path: string, data: AuthType, setIsLoading:React.Dispatch<SetStateAction<boolean>>) => {
    setIsLoading(true);
    try {
        await useAxios().post(`${path}`, data);
        setIsLoading(false);
        return { status: 'success', message: 'Request sent successfully' };
    }
    catch (err) {
        setIsLoading(false);
        return { status: 'error', message: 'Failed to send request' };
    }

}

