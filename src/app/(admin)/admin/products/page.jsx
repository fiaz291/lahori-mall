'use client'
import { API_URLS } from "@/app/apiUrls";
import config from "@/app/config";
import { Button, Checkbox, Dropdown } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import DataTable from "react-data-table-component";

export default function AllProducts() {

  const [data, setData] = useState(null); // Store fetched data
  const [currentPage, setCurrentPage] = useState(null);

  const fetchData = useCallback(async (page) => {
    const url = `${config.url + API_URLS.PRODUCT}?page=${page}&limit=10`;
    try {
      const res = await axios.get(url);
      setData(res.data); // Set the fetched data
    } catch (err) {
      console.log({ err })
    }
  }, [])


  const updateData = useCallback(async (data) => {
    const url = `${config.url + API_URLS.PRODUCT}`;
    try {
      await axios.patch(url, data);
    } catch (err) {
      console.log({ err })
    }
  }, [])


  const router = useRouter();

  const onActiveChange = async (e, row) => {
    const data = {
      id: row.id,
      isActive: e.target.checked,
    }
    await updateData(data)
    await fetchData(currentPage);
    console.log({ value: e.target.checked })
  }

  const handleDeleteProduct = (row) => {
    console.log({ row })
  }
  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name || "--",
    },
    {
      name: "Total Sold",
      selector: (row) => row?.totalSold ? `${row?.totalSold}` : "--",
    },
    {
      name: "Price",
      selector: (row) => row?.price ? `$${row?.price}` : "--",
    },
    {
      name: "Inventory",
      selector: (row) => `${row?.inventory || "--"}`,
    },
    {
      name: "Is Active",
      selector: (row) => {
        return (
          <Checkbox checked={row?.isActive} onChange={(e) => onActiveChange(e, row)}>{row?.isActive ? "Active" : "Disabled"}</Checkbox>
        )
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
                label: <Button className="w-[80px]"><Link href={`/admin/edit-product/${row.slug}`}>Edit</Link></Button>,
              },
              {
                key: "3",
                label: <Button color="danger" variant="outlined" className="w-[80px]" onClick={() => { handleDeleteProduct(row) }}>Delete</Button>,
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
    fetchData(value)
    setCurrentPage(value);
  }

  return (
    <div className="mt-[24px]">
      <p className="text-[24px]">All Products</p>
      <DataTable paginationServer columns={columns} data={data?.data?.products || []} pagination paginationPerPage={10} onChangePage={onChangePage} paginationTotalRows={data?.data?.pagination?.totalItems}
      ></DataTable>
    </div>
  );
}
