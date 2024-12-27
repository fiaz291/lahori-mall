'use client'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import TKSHomePageProducts from '@/components/TKSHomePageProducts';
import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const titles = [
    {
        title: "Super Deals",
        key: "deals",
    },
    {
        title: "Best Minishops",
        key: "minishops",
    },
    {
        title: "Best Seller By Region",
        key: "region",
    }
]
const category = [
    "ALL",
    "Apparel",
    "Acc./Shoes",
    "Beauty",
    "Baby/Maternity",
    "Food",
    "Furniture/Bedding",
    "Home/Health",
    "Sports/Motors",
    "Electronics",
    "Books/Music",
    "Stationery/Hobbies"
]
export default function SuperDeals() {
    const [title, setTitle] = useState('deals')
    return (
        <div>
            <Navbar hideSlider={true} />
            <div className='outer'>
                <div className='inner mt-3 mb-3'>
                    {/* <div className='text-[24px]'>
                        {title}
                    </div> */}
                    <div className='flex'>
                        {category.map((item, index) => (
                            <div key={item} className='pr-[10px] pl-[10px] clickable' style={index + 1 !== category.length ? { borderRight: '1px solid black' } : {}}>{item}</div>
                        ))}
                    </div>
                </div>
            </div>
            <TKSHomePageProducts title="All Products" />
            <Footer />
        </div>
    )
}