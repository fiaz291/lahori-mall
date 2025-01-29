'use client'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function SellWithUs() {
    const router = useRouter();
    const handleRedirect = (redirectTo) => {
        router.push(redirectTo);
    };

    return (
        <div>
            <Navbar hideSlider topbar />
            <div className='flex justify-center mt-10'>
                <img
                    src="/logo-dark.png"
                    className="w-[300px] h-[150px] cursor-pointer hover:opacity-80"
                    onClick={() => {
                        handleRedirect("/");
                    }}
                />
            </div>
            <div className="flex justify-center">
                <div className="flex flex-col items-center w-full max-w-[1200px] mt-4 mx-14 gap-5 ">
                    <h1 className='text-center text-[42px]'>Sell with Us</h1>
                    <img src="/coming-soon.png" className='max-w-[600px] w-full mt-4' alt="TKS" />
                </div>
            </div>
            <Footer />
        </div>
    )
}