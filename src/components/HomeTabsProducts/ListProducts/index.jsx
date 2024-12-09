import SmallProductCard from '@/components/TKS/SmallProductCad';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React from 'react';

export default function ListProducts() {
    return (
        <div>
            <Row>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Col span={12}>
                        <SmallProductCard title="Samsung Bey" />
                    </Col>
                ))}
            </Row>
            <button className='w-full bg-[#CD2E3A] text-white pt-[10px] pb-[10px] rounded text-[18px] hover:opacity-80'>See All <ArrowRightOutlined /></button>
            {/* <p>see all</p> */}
        </div>
    )
}