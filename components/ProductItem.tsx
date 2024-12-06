"use client";

import { Context } from '@/context/FilterContext';
import { useAxios } from '@/hooks/useAxios';
import { BasketIcon, LikeIcon } from '@/public/images/icon';
import { ProductType } from '@/service/products/Products'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const ProductItem: React.FC<{ product: ProductType }> = ({ product }) => {
    const router = useRouter();
    const [hover, setHover] = useState<boolean>(false);
    const { accessToken } = useContext(Context)
    const axiosInstance = useAxios();
    const queryClient: QueryClient = useQueryClient();

    async function ClickLiked() {
        if (!accessToken) return toast.error("Please log in first!");
        else {
            const res = await axiosInstance.post(`/like/${product.product_id}`)
            return res.data
        }
    };

    const mutationLike = useMutation({
        mutationKey: ['likeProduct'],
        mutationFn: () => ClickLiked(),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] })
    });


    async function addCart(): Promise<ProductType | null> {
        if(!accessToken){
            toast.error("Please log in first!");
            return null;
        }
        const res = await axiosInstance.post('/basket', {
            productId: product.product_id,
        });
        return res.data;
    }

    const basketMutation = useMutation({
        mutationFn: () => addCart(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['basked products']});
        },
        onError: () => toast.error('Failed to add product to cart!')
    });

    return (
        <>
            <Toaster position='top-center' reverseOrder={false} />
            <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className='md:w-[250px] product-item   sm:w-[180px] w-[160px] rounded-lg overflow-hidden relative' >
                <div onClick={() => router.push(`/shop/${product.product_id}`)} style={{ backgroundColor: "#FBFBFB", }}>
                    <Image priority style={{ width: "100%", height: "auto", objectFit: "cover" }} src={product.image_url ? product.image_url[0] : "/logo.svg"} alt={product.product_name ? product.product_name : "product img"} width={250} height={250} />
                </div>
                <h3 className='mt-[12px] pl-4 text-[16px] text-[#3D3D3D]'>{product.product_name}</h3>
                <div className='flex items-center space-x-4 pl-4 pb-4 mt-[6px]'>
                    <span className='text-[#46A358] text-[18px]'>${product.cost}</span>
                    <span className='text-[#A5A5A5] discount-price text-[18px] line-through'>${Number(product.cost) + Number(product?.discount)}</span>
                </div>
                {hover ? <div className='absolute top-[210px] inset-x-0 mx-auto flex items-center justify-center space-x-[10px]'>
                    <button style={{ color: product.basket ? "#46A358" : "" }} onClick={() => basketMutation.mutate()} className={`p-1 bg-white rounded-lg ${product.basket ? "text-[#46A358]" : "text-[#3D3D3D]"}`}><BasketIcon /></button>
                    <button style={{ color: product.liked ? "red" : "" }} onClick={() => mutationLike.mutate()} className={`p-1 bg-white rounded-lg ${product.liked ? "text-red-500" : "text-[#3D3D3D]"}`}><LikeIcon /></button>
                </div> : null}
            </div>
        </>
    )
}

export default ProductItem
