"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import config from "../config";
import { API_URLS } from "../apiUrls";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "antd";
import ProductsPage from "./ProductsPage";

export default function SearchPage() {
  const [pageCount, setPageCount] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page");
  const text = searchParams.get("text");
  useEffect(() => {
    async function fetchData(text, page) {
      setloading(true);
      try {
        const response = await axios.get(
          `${config.url}${API_URLS.PRODUCT_SEARCH}?text=${text}&page=${page}`
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
    if (text && page) {
      fetchData(text, page);
    }
  }, [text, page]);
  const handlePageCount = (isNext) => {
    if (isNext) {
      if (!page) {
        router.push(`/search?page=2&text=${text}`);
      } else {
        router.push(`/search?page=${Number(page) + 1}&text=${text}`);
      }
    } else {
      router.push(`/search?page=${Number(page) - 1}&text=${text}`);
    }
  };
  return (
    <div>
      <Navbar hideSlider={true} />
      <ProductsPage
        data={data || []}
        title={`You searched: ${text}`}
        isPending={loading}
        error={error}
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
