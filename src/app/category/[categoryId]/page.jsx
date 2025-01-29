"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "antd";
import ProductsPage from "./ProductsPage";
import config from "@/app/config";
import { API_URLS } from "@/app/apiUrls";

export default function SingleCategory({ params }) {
  const { categoryId } = params;
  const [pageCount, setPageCount] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page");
  const title = searchParams.get("title");
  useEffect(() => {
    async function fetchData(page) {
      setloading(true);
      try {
        const response = await axios.get(
          `${config.url}${API_URLS.PRODUCT_CATEGORY}?categoryId=${categoryId}${
            page ? `&page=${page}` : ""
          }`
        );
        if (
          response?.data?.data?.products &&
          response?.data?.data?.products.length > 0
        ) {
          setData(response?.data?.data?.products);
          setPageCount(response?.data?.data?.pagination?.totalPages);
        } else {
          setError("No Producs Found");
        }
      } catch (error) {
        setError("No Producs Found");
      } finally {
        setloading(false);
      }
    }
    if (categoryId) {
      fetchData(page);
    }
  }, [page, categoryId]);

  const handlePageCount = (isNext) => {
    if (isNext) {
        if (!page) {
            router.push(`/category/${categoryId}?page=2`);
        } else {
            router.push(`/category/${categoryId}?page=${Number(page) + 1}`);
        }
    } else {
        router.push(`/category/${categoryId}?page=${Number(page) - 1}`);
    }
}
  return (
    <div>
      <Navbar hideSlider={true} />
      <ProductsPage
        data={data || []}
        isPending={loading}
        error={error}
        title={title ?? "Title"}
      />
      <div className="flex gap-3 justify-center">
        {pageCount && (
          <>
            <Button
              onClick={() => {
                handlePageCount(false);
              }}
              size="large"
              color="danger"
              variant="outlined"
              disabled={!page || Number(page) < 2}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                handlePageCount(true);
              }}
              size="large"
              color="danger"
              variant="outlined"
              disabled={Number(page) === Number(pageCount)}
            >
              Next
            </Button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
