"use client";

import { Context } from '@/context/Context';
import Button from '@/helper/components/button/Button';
import Modal from '@/helper/components/modal/Modal';
import { useAxios } from '@/hooks/useAxios'
import { DeleteIcon } from '@/public/images/icon';
import { ProductType } from '@/service/products/Products';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const ShoppingCard = () => {
  const router = useRouter();
  const queryClient: QueryClient = useQueryClient();
  const { accessToken } = useContext(Context)
  const axiosInstance = useAxios();
  const [payModal, setPayModal] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductType[] | []>([]);
  const { data: BaskedProducts, isPending } = useQuery({
    queryKey: ['basked products'],
    queryFn: () => axiosInstance.get('/basket', {
      params: {
        page: 1,
        limit: 100
      }
    }).then(res => res.data.ProductId),
    enabled: !!accessToken,
  });
  const total: number = products.length
    ? products.reduce((acc, product: ProductType) => acc + (product.cost * (product.count || 1)), 0)
    : 0;

  useEffect(() => {
    if (BaskedProducts?.length > 0) {
      setProducts(BaskedProducts.map((item: ProductType) => ({
        ...item,
        count: 1
      })))
    }
    else {
      setProducts([]);
    }
  }, [BaskedProducts]);

  useEffect(() => {
    if (payModal) {
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = 'auto';
    }
  }, [payModal])


  async function addCart(id: string): Promise<ProductType> {
    const res = await axiosInstance.post('/basket', {
      productId: id,
    });
    return res.data;
  }

  const basketMutation = useMutation({
    mutationFn: (id: string) => addCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basked products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => toast.error('Failed to add product to cart!')
  });

  function handleMinusCLick(item: ProductType): void {
    if (item?.count && item?.count <= 1) {
      return basketMutation.mutate(item.product_id)
    }
    setProducts(products.map(p => p.product_id === item.product_id ? { ...p, count: p.count ? p.count - 1 : 1 } : p))
  }

  function handlePlusClick(item: ProductType): void {
    if (item?.count && item?.count >= 8) {
      toast.error('You can not add more than 8 items to the cart!')
      return;
    }
    setProducts(products.map(p => p.product_id === item.product_id ? { ...p, count: p.count ? p.count + 1 : 1 } : p))
  }

  function handleOrder(): void {
    toast.success('Order placed successfully!', { duration: 3000 });
    setPayModal(false);
    products.map(p => {
      basketMutation.mutate(p.product_id)
    })
  }


  if (!isPending && products.length == 0) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-center text-2xl font-semibold">
          Your shopping cart is empty!
        </div>
      </div>
    )
  }

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-grow lg:h-[494px] lg:overflow-y-auto overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-normal text-gray-500">Products</th>
                <th className="text-left py-4 px-4 font-normal text-gray-500">Price</th>
                <th className="text-left py-4 px-4 font-normal text-gray-500">Quantity</th>
                <th className="text-left py-4 px-4 font-normal text-gray-500">Total</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: ProductType) => (
                <tr
                  key={product.product_id}
                  className={`border-b-[#FBFBFB] border-b-[1px]`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-[70px] h-[70px] flex-shrink-0">
                        <Image
                          src={product.image_url ? product.image_url[0] : '/logo.svg'}
                          alt={product.product_name || "product img"}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <h3 className="font-medium text-gray-900">{product.product_name}</h3>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-900">${product.cost.toFixed(2)}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMinusCLick(product)}
                        className="h-8 w-8 rounded-full border border-[#46A358] text-[#46A358] flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{product.count}</span>
                      <button
                        onClick={() => handlePlusClick(product)}
                        className="h-8 w-8 rounded-full border border-[#46A358] text-[#46A358] flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[#46A358] font-medium">
                      ${(product.cost * (product.count || 1)).toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button onClick={() => basketMutation.mutate(product.product_id)} className="text-gray-400">
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cart Totals */}
        <div className="lg:w-[320px] flex-shrink-0">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Coupon Apply</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code here..."
                    className="sm:flex-grow w-full px-3 py-2 border rounded-md"
                  />
                  <button className="sm:px-4 px-2 py-1 sm:py-2 bg-[#46A358] text-white rounded-md hover:bg-[#46A358]/90">
                    Apply
                  </button>
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${total - 16}.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Coupon Discount</span>
                  <span className="font-medium">(-) 00.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <div className="text-right">
                    <span className="font-medium block">$16.00</span>
                    <p className="text-sm text-[#46A358]">View shipping charge</p>
                  </div>
                </div>
                <div className="flex justify-between pt-4 border-t">
                  <span className="text-gray-900 font-medium">Total</span>
                  <span className="text-[#46A358] font-bold text-xl">${total}.00</span>
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <button onClick={() => setPayModal(true)} className="w-full py-2 bg-[#46A358] text-white rounded-md hover:bg-[#46A358]/90">
                  Proceed to Checkout
                </button>
                <button onClick={() => router.push('/')} className="w-full py-2 border border-[#46A358] text-[#46A358] rounded-md hover:bg-gray-50">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal openModal={payModal} setOpenModal={setPayModal} extraStyle='max-w-[500px]  w-full'>
        <h2 className='font-bold text-[15px] mb-3'>Order Details</h2>
        <div className='w-full !h-[400px] overflow-y-auto'>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-[1px] border-[#46A35880]">
                <th className="p-3 text-start text-[#3D3D3D] text-[15px]">Product</th>
                <th className="p-3 text-right text-[#3D3D3D] text-[15px]">Qty</th>
                <th className="p-3 text-end text-[#3D3D3D] text-[15px]">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: ProductType) => (
                <tr key={product.product_id} className='border-b-[#FBFBFB] border-b-[1px]'>
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
                  <td className="p-3 text-right text-[#3D3D3D] text-[15px]">{product.count}</td>
                  <td className="p-3 text-end text-[#3D3D3D] text-[15px]">
                    ${(product.cost * (product.count || 1)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className='py-4 border-t-[1px] border-[#46A35880] text-[#727272] text-[12px] mb-5 sm:text-[14px]'>Your order is currently being processed. You will receive an order confirmation email shortly with the expected delivery date for your items.</p>
        <div className='flex items-center justify-between'>
          <div className='flex items-start space-y-2 flex-col'>
            <strong className='text-[#3D3D3D] text-[15px] block'>Shipping: <span className='text-[#46A358]'>${total - 16}.00</span></strong>
            <strong className='text-[#3D3D3D] text-[15px]'>Total: <span className='text-[#46A358]'>${total}.00</span></strong>
          </div>
          <Button onClick={handleOrder} type='button' extraStyle='w-[150px]' title="Track your order" />
        </div>
      </Modal>
    </>
  )
}

export default ShoppingCard
