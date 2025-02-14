"use client";
import { API_URLS } from "@/app/apiUrls";
import config from "@/app/config";
import ScreenLoader from "@/components/ScreenLoader";
import { Button, Checkbox, Dropdown } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import DataTable from "react-data-table-component";

export default function AllProducts() {
  const [data, setData] = useState(null); // Store fetched data
  const [currentPage, setCurrentPage] = useState(null);
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(false);

  const fetchData = useCallback(async (page) => {
    const url = `${config.url + API_URLS.PRODUCT}?page=${page}&limit=10`;
    try {
      const res = await axios.get(url);
      setData(res.data); // Set the fetched data
    } catch (err) {
      console.log({ err });
    }
  }, []);

  const fetchSearchData = useCallback(
    async (page) => {
      const url = `${
        config.url + API_URLS.PRODUCT_SEARCH
      }?page=${page}&limit=10&text=${search}`;
      try {
        const res = await axios.get(url);
        setData(res.data); // Set the fetched data
      } catch (err) {
        console.log({ err });
      }
    },
    [search]
  );

  const updateData = useCallback(async (data) => {
    const url = `${config.url + API_URLS.PRODUCT}`;
    try {
      await axios.patch(url, data);
    } catch (err) {
      console.log({ err });
    }
  }, []);

  const router = useRouter();

  const onActiveChange = async (e, row) => {
    const data = {
      id: row.id,
      isActive: e.target.checked,
    };
    await updateData(data);
    await fetchData(currentPage);
  };

  const handleAll = async () => {
    setReload(true);
    setSearch("");
    await fetchData(1);
    setReload(false);
  };
  const handleSearch = async () => {
    setReload(true);
    setCurrentPage(1);
    await fetchSearchData(1);
    setReload(false);
  };

  const handleDeleteProduct = (row) => {
    console.log({ row });
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name || "--",
    },
    {
      name: "Total Sold",
      selector: (row) => (row?.totalSold ? `${row?.totalSold}` : "--"),
    },
    {
      name: "Price",
      selector: (row) => (row?.price ? `$${row?.price}` : "--"),
    },
    {
      name: "Inventory",
      selector: (row) => `${row?.inventory || "--"}`,
    },
    {
      name: "Is Active",
      selector: (row) => {
        return (
          <Checkbox
            checked={row?.isActive}
            onChange={(e) => onActiveChange(e, row)}
          >
            {row?.isActive ? "Active" : "Disabled"}
          </Checkbox>
        );
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <Dropdown
          trigger="click"
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <Button className="w-[80px]">
                    <Link href={`/admin/edit-product/${row.slug}`}>Edit</Link>
                  </Button>
                ),
              },
              {
                key: "3",
                label: (
                  <Button
                    color="danger"
                    variant="outlined"
                    className="w-[80px]"
                    onClick={() => {
                      handleDeleteProduct(row);
                    }}
                  >
                    Delete
                  </Button>
                ),
              },
            ],
          }}
          placement="bottomLeft"
        >
          <Button>Actions</Button>
        </Dropdown>
      ),
    },
  ];

  const onChangePage = (value) => {
    if (search) {
      fetchSearchData(value);
    } else {
      fetchData(value);
    }
    setCurrentPage(value);
  };

  if (reload) {
    return <ScreenLoader />;
  }

  return (
    <div className="mt-[24px]">
      <p className="text-[24px]">All Products</p>
      <div className="mb-2 mt-2 flex align-center gap-4">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          className="border w-[200px] outline-none pt-2 pb-2 pl-4 pr-4 rounded"
        />
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={handleAll}>Show All</Button>
      </div>
      <DataTable
        paginationServer
        columns={columns}
        data={data?.data?.products || []}
        pagination
        paginationPerPage={10}
        onChangePage={onChangePage}
        paginationTotalRows={data?.data?.pagination?.totalItems}
      ></DataTable>
    </div>
  );
}
