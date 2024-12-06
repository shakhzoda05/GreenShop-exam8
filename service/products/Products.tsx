"use client";

import { useAxios } from '@/hooks/useAxios'
import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import ProductItem from '@/components/ProductItem';
import { Context } from '@/context/FilterContext';
import SortingDropdown from '@/components/SortingDropDown';
import Pagination from '@/components/Pagination';
import { Skeleton } from 'antd';

export type ProductType = {
    basket?: boolean,
    category_id?: string,
    cost: number,
    discount?: number,
    image_url?: string[],
    liked?: boolean,
    product_description?: string,
    product_id: string,
    product_name?: string,
    product_status?: string,
    short_description?: string,
    size?: string[],
    tags?: string[],
    count?: number,
}

type TagsType = {
    href?: string,
    title?: string
}


const Products = () => {
    const axios = useAxios();
    const { categoryId, size, tags, setTags, minPrice, maxPrice, setProducstPrice } = useContext(Context);
    const [products, setProducts] = useState<ProductType[] | []>([])
    const [sortOption, setSortOption] = useState("default");
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState<number>(9);
    const [screenWidth, setScreenWidth] = useState(0);
    const { data = [] } = useQuery({
        queryKey: ['products', categoryId, size, tags, minPrice, maxPrice],
        queryFn: () => axios.get('/products', {
            params: {
                page: 1,
                limit: 100,
                name: null,
                category: categoryId,
                size,
                tags,
                max_price: maxPrice,
                min_price: minPrice,
            }
        }).then(res => res.data.products ? res.data.products : []),
    });
    const totalPages = Math.ceil(products.length / perPage);
    const startIndex = (currentPage - 1) * perPage;
    const currentProducts = products.slice(startIndex, startIndex + perPage);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setScreenWidth(window.innerWidth);

            const handleResize = () => {
                setScreenWidth(window.innerWidth);
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth); 
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (screenWidth <= 768) {
            setPerPage(9);
        }
        else if (screenWidth <= 1075) {
            setPerPage(6);
        }
        else {
            setPerPage(9);
        }
    }, [screenWidth]);

    const tagsList: TagsType[] = [
        {
            title: "All Plants",
            href: "",
        },
        {
            title: "New Arrivals",
            href: "new-arrivals",
        },
        {
            title: "Sale",
            href: "sale",
        },
    ];
    useEffect(() => {
        if (data.length) {
            setProducstPrice({
                min: Math.min(...data.map((product: ProductType) => product.cost)),
                max: Math.max(...data.map((product: ProductType) => product.cost)),
            });
            setProducts(data); 
        }
    }, [JSON.stringify(data)])

    function handeChangeSort(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedOption = event.target.value;
        setSortOption(selectedOption);

        // Ensure we sort only when products exist
        let sortedProducts: ProductType[] = [...products];
        if (selectedOption === "price") {
            sortedProducts.sort((a, b) => (a.cost ?? 0) - (b.cost ?? 0)); // Sort by price (ascending)
        } else if (selectedOption === "name") {
            sortedProducts.sort((a, b) => (a.product_name ?? "").localeCompare(b.product_name ?? "")); // Sort alphabetically
        } else {
            sortedProducts = [...data]; // Reset to the original data
        }

        setProducts(sortedProducts.length > 0 ? sortedProducts : []);
    }
    return (
        <div className='products-part'>
            <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between" }}>
                <div className='tags'>
                    {tagsList.map((item: TagsType) => (
                        <button key={item.href} onClick={() => setTags(item.href)} className={`${tags == item.href ? "text-[#46A358] font-bold before:scale-1" : "text-[#3D3D3D] before:scale-0"} tag-btn  duration-300 text-[14px]`}>{item.title}</button>
                    ))}
                </div>
                <SortingDropdown handleSortChange={handeChangeSort} sortOption={sortOption} />
            </div>
            <div className='products flex  md:!space-x-14 flex-wrap items-center justify-between'>
                {products.length < 0 ? Array(perPage).fill(0).map((_, index) => (
                    <Skeleton key={index} loading active style={{ width: "250px", height: "319px" }} />
                )) : currentProducts.length
                    ? currentProducts.map((product: ProductType, index: number) => (
                        <ProductItem key={index} product={product} />
                    ))
                    : <p className='text-[20px] text-center mt-[20px]'>No Products Found</p>
                }
            </div>
            <Pagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={totalPages} />
        </div>
    )
}

export default Products
