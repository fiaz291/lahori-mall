'use client'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from 'antd';
import ProductsPage from './ProductsPage';
import config from '@/app/config';
import { API_URLS } from '@/app/apiUrls';

export default function SingleCategory({params}) {
    const {categoryId } = params;
    const [pageCount, setPageCount] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const page = searchParams.get("page");

    useEffect(() => {
      async function fetchData(categoryId) {
        const response = await axios.get(
          `${config.url}${API_URLS.PRODUCT_CATEGORY}/${categoryId}`,
        );
        console.log({ response });
      }
      if (categoryId) {
        fetchData(categoryId);
      }
    }, [categoryId]);

    const handlePageCount = (isNext) => {
        if (isNext) {
            if (!page) {
                router.push(`/super-deals?page=2`);
            } else {
                router.push(`/super-deals?page=${Number(page) + 1}`);
            }
        } else {
            router.push(`/super-deals?page=${Number(page) - 1}`);
        }
    }
    return (
        <div>
            <Navbar hideSlider={true} />
            <ProductsPage data={[]} title="Title" />
            <div className='flex gap-3 justify-center'>
                {pageCount &&
                    <>
                        <Button onClick={() => { handlePageCount(false) }} size="large" color="danger" variant="outlined" disabled={!page || Number(page) < 2}>Previous</Button>
                        <Button onClick={() => { handlePageCount(true) }} size="large" color="danger" variant="outlined" disabled={Number(page) === Number(pageCount)}>Next</Button>
                    </>
                }
            </div>
            <Footer />
        </div>
    )
}