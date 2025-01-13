import { Col, Flex, Row } from 'antd';
import React from 'react';
import { Tabs } from 'antd';
import "./styles.css";
import SmallProductCard from '../TKS/SmallProductCad';
import ListProducts from './ListProducts';
import { API_URLS } from '@/app/apiUrls';

const items = [
    {
        key: '1',
        label: 'Top of Week',
        children: <ListProducts apiUrl={API_URLS.PRODUCT_TOP_OF_WEEK} />,
    },
    {
        key: '2',
        label: 'Free Deliver',
        children: <ListProducts apiUrl={API_URLS.PRODUCT_FREE_DELIVERY} />,
    }
];
const items2 = [
    {
        key: '1',
        label: 'Best Products',
        children: <ListProducts apiUrl={API_URLS.PRODUCT_BEST_SELLING} />,
    },
    {
        key: '2',
        label: 'Super Deals',
        children: <ListProducts apiUrl={API_URLS.PRODUCT_SUPER_DEALS} />,
    }
];

export default function HomeTabsProducts() {
    const onChange = (key) => {
        console.log(key);
    };
    return (
        <div className='outer pt-[20px] pb-[20px] outer-background-2'>
            <div className='inner inner-background flex justify-center w-100'>
                    <Row gutter={20}>
                        <Col className='prods-columns'><Tabs defaultActiveKey="1" className='tabs-products' items={items} onChange={onChange} /></Col>
                        <Col className='prods-columns'><Tabs defaultActiveKey="1" items={items2} onChange={onChange} /></Col>
                    </Row>
            </div>
        </div>
    )
}