'use client'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import config from '../config';
import { API_URLS } from '../apiUrls';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from 'antd';
import TKSHomePageProducts from './TKSHomePageProducts';

export default function BestSellers() {
    const [menu, setMenu] = useState(null);
    const [catId, setCatId] = useState(null);
    const [pageCount, setPageCount] = useState(null);
    const searchParams = useSearchParams();
    const page = searchParams.get("page");
    const router = useRouter();
    useEffect(() => {
        async function getCategories() {
            try {
                const response = await axios.get(`${config.url + API_URLS.GET_CATEGORIES}?menu=true`);
                let menuObj = { all: { id: 'all', name: 'All' } };
                response.data.data.forEach((men) => {

                    menuObj = { ...menuObj, [men.id]: { ...men } }
                })
                setMenu(menuObj);
            }
            catch (err) {
                console.log({ err })
            }
        }
        getCategories();
    }, [])
    const handleCategorySearch = (id) => {
        if (id !== 'all') {
            setCatId(id);
        } else {
            setCatId(null)
        }
    }
    const returnTitle = useCallback(() => {
        if (catId) {
            return menu[catId].name;
        } else {
            return "All Products"
        }
    }, [catId, menu])


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
            <div className='outer'>
                <div className='inner mt-3 mb-3'>
                    <div className='flex overflow-scroll scrollbar-none'>
                        {menu && Object.values(menu).map((item, index) => (
                            <div onClick={() => { handleCategorySearch(item.id) }} key={item} className='pr-[10px] pl-[10px] clickable min-w-fit' style={index + 1 !== Object.values(menu).length ? { borderRight: '1px solid black' } : {}}>{item.name}</div>
                        ))}
                    </div>
                </div>
            </div>
            <TKSHomePageProducts title={returnTitle()} categoryId={catId} page={page} setPageCount={setPageCount} />
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