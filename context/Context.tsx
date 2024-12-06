"use client";

import { ProductType } from "@/service/products/Products";
import { UserInfoType } from "@/types";
import { createContext, ReactNode, SetStateAction, useEffect, useState } from "react";

interface ProductsPriceType {
    max: number | null,
    min: number | null,
}
interface ContextType {
    categoryId: string,
    setCategoryId: React.Dispatch<SetStateAction<string>>,
    size: string | null,
    setSize: React.Dispatch<SetStateAction<string | null>>,
    tags: string | undefined,
    setTags: React.Dispatch<SetStateAction<string | undefined>>,
    minPrice: number | null,
    setMinPrice: React.Dispatch<SetStateAction<number | null>>,
    maxPrice: number | null,
    setMaxPrice: React.Dispatch<SetStateAction<number | null>>,
    prductsPrice: ProductsPriceType,
    setProducstPrice: React.Dispatch<SetStateAction<ProductsPriceType>>,
    products: ProductType[] | [],
    setProducts: React.Dispatch<SetStateAction<ProductType[] | []>>,
    accessToken: string | null,
    setAccessToken: React.Dispatch<SetStateAction<string | null>>,
    refreshToken: string | null,
    setRefreshToken: React.Dispatch<SetStateAction<string | null>>,
    userInfo: UserInfoType | null,
    setUserInfo: React.Dispatch<SetStateAction<UserInfoType | null>>,
}


export const Context = createContext<ContextType>({
    categoryId: '',
    setCategoryId: () => "",
    size: "",
    setSize: () => "",
    tags: "",
    setTags: () => "",
    minPrice: null,
    setMinPrice: () => null,
    maxPrice: null,
    setMaxPrice: () => null,
    prductsPrice: { max: null, min: null },
    setProducstPrice: () => ({ max: null, min: null }),
    products: [],
    setProducts: () => [],
    accessToken: null,
    setAccessToken: () => null,
    refreshToken: null,
    setRefreshToken: () => null,
    userInfo: null,
    setUserInfo: () => null,
});

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [categoryId, setCategoryId] = useState<string>("");
    const [size, setSize] = useState<string | null>("");
    const [tags, setTags] = useState<string | undefined>("");
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [prductsPrice, setProducstPrice] = useState<ProductsPriceType>({ max: null, min: null });
    const [products, setProducts] = useState<ProductType[] | []>([]);
    const [accessToken, setAccessToken] = useState<string | null>("");
    const [refreshToken, setRefreshToken] = useState<string | null>("");
    const [userInfo, setUserInfo] = useState<null | UserInfoType>(null);


    const fetchToken = () => {
        try {
            const storedToken = localStorage.getItem('token');
            const token = storedToken ? JSON.parse(storedToken) : null;

            if (token && token.access_token) {
                setAccessToken(token.access_token);
                setUserInfo(token);
            } else {
                console.log('No valid token found');
            }
        } catch (error) {
            console.log('Error fetching token:', error);
            localStorage.removeItem('token');
        }
    };

    const feychRefreshToken = async () => {
        try {
            const token = await Promise.resolve(localStorage.getItem('refresh_token'));
            if (token) {
                setRefreshToken(token);
            }
        } catch (error) {
            console.log('Error fetching refresh token:', error);
        }
    };

    useEffect(() => {
        fetchToken();
        feychRefreshToken();
    }, []);

    return (
        <Context.Provider value={{ userInfo, setUserInfo, refreshToken, setRefreshToken, products, setProducts, prductsPrice, accessToken, setAccessToken, setProducstPrice, maxPrice, setMaxPrice, minPrice, setMinPrice, tags, setTags, categoryId, setCategoryId, size, setSize }}>
            {children}
        </Context.Provider>
    );
}