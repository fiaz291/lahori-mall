import { Col, Flex, Row } from 'antd';
import React from 'react';
import { Tabs } from 'antd';
import "./styles.css";
import SmallProductCard from '../TKS/SmallProductCad';
import ListProducts from './ListProducts';

const items = [
    {
        key: '1',
        label: 'Top of Week',
        children: <ListProducts />,
    },
    {
        key: '2',
        label: 'Free Deliver',
        children: <ListProducts />,
    }
];
const items2 = [
    {
        key: '1',
        label: 'Best Products',
        children: <ListProducts />,
    },
    {
        key: '2',
        label: 'Super Deals',
        children: <ListProducts />,
    }
];

export default function HomeTabsProducts() {
    const onChange = (key) => {
        console.log(key);
    };
    return (
        <div className='outer pt-[20px] pb-[20px] outer-background-2'>
            <div className='inner inner-background'>
                {/* <div
                    className="mr-[10px] hover:text-[rgba(0,0,0,0.7)] mb-[20px]"
                    style={{
                        color: 'black',
                        fontWeight: 400,
                        fontSize: 30,
                    }}
                >
                    💰Discount is a Must!
                </div> */}
                <Flex>
                    <Row className='w-full' gutter={20}>
                        <Col sm={12}><Tabs defaultActiveKey="1" className='tabs-products' items={items} onChange={onChange} /></Col>
                        <Col sm={12}><Tabs defaultActiveKey="1" items={items2} onChange={onChange} /></Col>
                    </Row>
                </Flex>
            </div>
        </div>
    )
}