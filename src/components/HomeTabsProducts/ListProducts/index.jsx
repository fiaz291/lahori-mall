import config from '@/app/config';
import SmallProductCard from '@/components/TKS/SmallProductCad';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Col, Row, Skeleton } from 'antd';
import React from 'react';

export default function ListProducts({ apiUrl, tag, color }) {

  const { isPending, error, data } = useQuery({
    queryKey: [`list_products ${apiUrl}`],
    queryFn: () => fetch(config.url + apiUrl).then((res) => res.json()),
    cacheTime: 0,
    staleTime: 0,
  });

  if (isPending) {
    return (
      <div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div className='col-span-1'>
            <Skeleton active />
          </div>
        ))}
      </div>
    </div>
    );
  }
  if (error) {
    return null;
  }

  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {data?.data?.products?.splice(0,6).map((product) => (
          <div className='col-span-1'>
            <SmallProductCard title={product?.name || ""} product={product} tag={tag} color={color} />
          </div>
        ))}
      </div>
      <button className='w-full bg-[#CD2E3A] text-white pt-[10px] pb-[10px] rounded text-[18px] hover:opacity-80'>See All <ArrowRightOutlined /></button>
      {/* <p>see all</p> */}
    </div>
  )
}