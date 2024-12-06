"use client";

import CustomSkeleton from '@/components/CustomSkeleton';
import Button from '@/helper/components/button/Button';
import Modal from '@/helper/components/modal/Modal';
import { useAxios } from '@/hooks/useAxios';
import { EmailIcon, FacebookIcon, LikeIcon, LinkedinIcon, TwitterIcon } from '@/public/images/icon';
import { ProductType } from '@/service/products/Products';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';


type IconType = {
  id: string;
  href: string;
  component: React.ReactNode;
};

const SinglePage = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const [product, setProduct] = useState<ProductType | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [showImg, setShowImg] = useState<boolean>(false);
  const [payModal, setPayModal] = useState<boolean>(false);
  const iconslist: IconType[] = [
    {
      id: 'facebook',
      href: 'https://www.facebook.com',
      component: <FacebookIcon />
    },
    {
      id: 'twitter',
      href: 'https://www.twitter.com',
      component: <TwitterIcon />
    },
    {
      id: 'linkedin',
      href: 'https://www.linkedin.com',
      component: <LinkedinIcon />
    },
    {
      id: 'email',
      href: 'mailto:example@example.com',
      component: <EmailIcon />
    }
  ];
  const [count, setCount] = useState<number>(1)

  async function getData() {
    const response = await axiosInstance.get(`/product/${id}`);
    return response.data;
  }



  const { data, isPending } = useQuery({
    queryKey: ['singlePage', id],
    queryFn: () => getData(),

  });



  async function addCart(): Promise<ProductType> {
    const res = await axiosInstance.post('/basket', {
      productId: id,
    });
    return res.data;
  }

  const AddToCartMutation = useMutation({
    mutationFn: async () => addCart(),
    onSuccess: () => {
      if (data?.basket) {
        toast.error("Product removed from cart");
      }
      else {
        toast.success('Product added to cart!', { duration: 3000 });
      }
      queryClient.invalidateQueries({ queryKey: ['singlePage', id] });
      queryClient.invalidateQueries({ queryKey: ['basket products', id] });
      queryClient.invalidateQueries({ queryKey: ['products', id] });
    },
    onError: () => toast.error('Failed to add product to cart!', { duration: 3000 }),
  })

  async function handleLikeClick(): Promise<ProductType> {
    const res = await axiosInstance.post(`like/${id}`);
    return res.data;
  }

  const LikeMutation = useMutation({
    mutationKey: ['like', id],
    mutationFn: async () => handleLikeClick(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['singlePage', id] }),
    onError: () => toast.error('Failed to like product!', { duration: 3000 }),
  })

  useEffect(() => {
    if (data) {
      setProduct(data)
      setSelectedSize(data.size[0])
    }
  }, [isPending, id, JSON.stringify(data)]);


  useEffect(() => {
    if (showImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showImg])

  function handleOrder(): void {
    toast.success('Order placed successfully!', { duration: 3000 });
    setPayModal(false);
    setCount(1);
  }


  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <div>
        <CustomSkeleton isLoading={isPending} />
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 ">
          <div className='max-lg:w-full lg:w-1/2 bg-[#FBFBFB] rounded-lg relative'>
            <button onClick={() => setShowImg(true)} className='absolute top-4 right-4'>
              <Image
                priority
                src='/search-img.svg'
                alt="search img"
                width={20}
                height={20}
              />
            </button>
            <Image
              priority
              src={product?.image_url ? product.image_url[0] : '/logo.svg'}
              alt="product image"
              width={404}
              height={404}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="w-full lg:w-1/2 lg:max-w-[573px]">
            <h2 className="text-[#3D3D3D] text-2xl lg:text-[28px] font-bold mb-4">
              {product?.product_name}
            </h2>
            <div className="pb-3 border-b border-[#46A35880] flex items-center justify-between mb-4">
              <span className="text-xl lg:text-[22px] text-[#46A358] font-bold">
                ${product?.cost}.00
              </span>
            </div>
            <strong className="text-sm lg:text-[15px] text-[#3D3D3D] mb-2 block">
              Short Description:
            </strong>
            <p className="mb-4 text-sm leading-6 text-[#727272]">
              {product?.short_description}
            </p>
            <strong className="text-sm lg:text-[15px] text-[#3D3D3D] mb-2 block">
              Size:
            </strong>
            <div className="flex items-center space-x-2 mb-4">
              {product?.size?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-7 h-7 rounded-full border ${selectedSize === size
                    ? "border-[#46A358] text-[#46A358]"
                    : "border-[#EAEAEA] text-[#727272]"
                    } text-sm font-bold`}
                >
                  {size.charAt(0)}
                </button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => {
                    if (count > 1) {
                      setCount(count - 1);
                    } else {
                      toast.error('You cannot have less than 1 item in the cart');
                    }
                  }}
                  extraStyle="w-8 h-8 rounded-full font-bold"
                  title="-"
                  type='button'
                />
                <span>{count}</span>
                <Button
                  onClick={() => {
                    if (count < 8) {
                      setCount(count + 1);
                    } else {
                      toast.error('You cannot exceed 10 items in the cart');
                    }
                  }}
                  extraStyle="w-8 h-8 rounded-full font-bold"
                  title="+"
                  type='button'
                />

              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setPayModal(true)}
                  title="BUY NOW"
                  extraStyle="max-sm:text-[13px] w-auto px-4"
                  type='button'
                />

                <Button
                  onClick={() => AddToCartMutation.mutate()}
                  type="button"
                  extraStyle="max-sm:text-[13px] w-auto px-4"
                  title="ADD TO CART"
                />


                <button
                  onClick={() => LikeMutation.mutate()}
                  type="button"
                  className={`p-[7px] border border-[#46A358] rounded-lg   ${product?.liked ? "text-red-500" : "text-[#46A358]"}`}
                >
                  <LikeIcon />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1 mb-4">
              <span className="text-[#727272]/60 text-sm">Tags:</span>
              {product?.tags?.map((tag) => (
                <span key={tag} className="text-[#727272] text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <strong className="text-[#3D3D3D] text-sm">
                Share this product:
              </strong>
              {iconslist.map((icon) => (
                <a
                  key={icon.id}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#46A358] hover:text-[#46A358]/80"
                >
                  {icon.component}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-[92px] mb-[127px]">
          <div className="w-full pb-3 border-b-[1px] border-[#EAEAEA]">
            <p className="text-[17px] relative inline text-[#46A358] font-bold before:bg-[#46A358] before:h-[2px] before:w-full before:absolute before:bottom-[-15px]">
              Product Description
            </p>
          </div>
          <p className="mt-[18px] text-[14px] text-[#727272] leading-6">
            {product?.product_description}
          </p>
        </div>
      </div>
      <Modal openModal={showImg} setOpenModal={setShowImg}>
        <Image
          priority
          style={{ width: "80vh", height: "auto", objectFit: "cover" }}
          src={product?.image_url ? product?.image_url[0] : '/logo.svg'}
          alt="logo img"
          width={404}
          height={404}
        />
      </Modal>
      <Modal openModal={payModal} setOpenModal={setPayModal} extraStyle='max-w-[500px] w-full'>
        <h2 className='font-bold text-[15px] mb-3'>Order Details</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-[1px] border-[#46A35880]">
                <th className="p-3 text-start text-[#3D3D3D] text-[15px]">Product</th>
                <th className="p-3 text-right text-[#3D3D3D] text-[15px]">Qty</th>
                <th className="p-3 text-end text-[#3D3D3D] text-[15px]">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 flex items-center justify-start text-start">
                  <Image
                    priority
                    style={{ width: "48px", height: "48px", objectFit: "cover" }}
                    src={product?.image_url ? product?.image_url[0] : "/logo.svg"}
                    alt="logo img"
                    width={48}
                    height={48}
                  />
                  <span className="ml-3 text-[15px] text-[#3D3D3D]">{product?.product_name}</span>
                </td>
                <td className="p-3 text-right text-[#3D3D3D] text-[15px]">{count}</td>
                <td className="p-3 text-end text-[#3D3D3D] text-[15px]">
                  ${product?.cost ? product.cost * count : 238 * count}.00
                </td>
              </tr>
            </tbody>
          </table>
        <p className='py-4 border-t-[1px] border-[#46A35880] text-[#727272] text-[12px] mb-5 sm:text-[14px]'>Your order is currently being processed. You will receive an order confirmation email shortly with the expected delivery date for your items.</p>
        <div className='flex items-center justify-between'>
          <strong className='text-[#3D3D3D] text-[15px]'>Total <span className='text-[#46A358]'>${product?.cost ? product.cost * count : 238 * count}.00</span></strong>
          <Button onClick={handleOrder} type='button' extraStyle='w-[150px]' title="Track your order" />
        </div>
      </Modal>
    </>
  )
}

export default SinglePage;
