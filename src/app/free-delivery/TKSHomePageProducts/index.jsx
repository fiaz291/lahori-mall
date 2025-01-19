"use client";
import React, { useEffect } from "react";
import './styles.css'
import { Col, Row, Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "@/app/apiUrls";
import config from "@/app/config";
import MediumProductCard from "@/components/TKS/MediumProductCard";

export default function TKSHomePageProducts({ title, categoryId, page, setPageCount }) {
  const { isPending, error, data } = useQuery({
    queryKey: [`free-delivery`, categoryId, page],
    queryFn: () => {
      // Construct the API URL with categoryId if available
      const url = new URL(config.url + API_URLS.PRODUCT_FREE_DELIVERY);
      if (categoryId) {
        url.searchParams.append("categoryId", categoryId);
      }
      if (page) {
        url.searchParams.append("page", page);
      }
      return fetch(url.toString()).then((res) => res.json());
    },
    cacheTime: 0,
    staleTime: 0,
  });
  useEffect(() => {
    if (typeof setPageCount === 'function' && data?.data?.pagination?.totalPages) {
      setPageCount(data?.data?.pagination?.totalPages)
    }
  }, [data])
  if (isPending) {
    return (
      <div className={`outer pt-[20px] pb-[20px] ${!title ? "outer-background" : ""}`}>
        <div className="inner">
          {!title &&
            <div
              className="mr-[10px] hover:text-[rgba(0,0,0,0.7)] mb-[20px]"
              style={{
                color: 'white',
                fontWeight: 400,
                fontSize: 30,
              }}
            >
              ⚡️SUPER DEALS!
            </div>
          }

          <Row gutter={[16, 16]}>
            {[...Array(6)].map((_, index) => (
              <Col
                key={index}
                sm={12}
                md={8}
                lg={6}
              >
                <Skeleton active />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    )
  }

  if (error) {
    return null;
  }

  return (
    <div className={`outer pt-[20px] pb-[20px] ${!title ? "outer-background" : ""}`}>
      <div className="inner">
        {!title &&
          <div
            className="mr-[10px] hover:text-[rgba(0,0,0,0.7)] mb-[20px]"
            style={{
              color: 'white',
              fontWeight: 400,
              fontSize: 30,
            }}
          >
            ⚡️SUPER DEALS!
          </div>
        }
        {title &&
          <div
            className="mr-[10px] hover:text-[rgba(0,0,0,0.7)] mb-[20px]"
            style={{
              color: 'black',
              fontWeight: 400,
              fontSize: 30,
            }}
          >
            ⚡️{title}
          </div>
        }

        <Row gutter={[16, 16]}>
          {data?.data?.products?.map((item, index) => (
            <Col
              key={index}
              sm={12}
              md={8}
              lg={6}
            >
              <MediumProductCard item={item} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
