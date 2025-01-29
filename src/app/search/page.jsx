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
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page");
  const text = searchParams.get("text");
  useEffect(() => {
    async function fetchData(text, page) {
      const data = {
        text: text,
      };
      const response = await axios.post(
        `${config.url}${API_URLS.PRODUCT_SEARCH}`,
        data
      );
      console.log({ response });
    }
    if (text && page) {
      fetchData(text);
    }
  }, [text, page]);
  const handlePageCount = (isNext) => {
    if (isNext) {
      if (!page) {
        router.push(`/searc?page=2&text=${text}`);
      } else {
        router.push(`/searc?page=${Number(page) + 1}&text=${text}`);
      }
    } else {
      router.push(`/searc?page=${Number(page) - 1}&text=${text}`);
    }
  };
  return (
    <div>
      <Navbar hideSlider={true} />
      <ProductsPage data={[]} title="Title" />
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
