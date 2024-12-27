import SmallProductCard from '@/components/TKS/SmallProductCad';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React from 'react';

export default function ListProducts() {
    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div className='col-span-1'>
                        <SmallProductCard title="Samsung Bey" />
                    </div>
                ))}
            </div>
            <button className='w-full bg-[#CD2E3A] text-white pt-[10px] pb-[10px] rounded text-[18px] hover:opacity-80'>See All <ArrowRightOutlined /></button>
            {/* <p>see all</p> */}
        </div>
    )
}