'use client'
import { API_URLS } from "@/app/apiUrls";
import config from "@/app/config";
import { Button, Checkbox, Dropdown } from "antd";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import DataTable from "react-data-table-component";

export default function Users({ params }) {
  const [data, setData] = useState(null); // Store fetched data
  const [currentPage, setCurrentPage] = useState(null);

  const fetchData = useCallback(async (page) => {
    // const url = `${config.url + API_URLS.VOUCHERS}?page=${page}&limit=10`;
    const url = `${config.url + API_URLS.VOUCHERS}`;
    try {
      const res = await axios.get(url);
      setData(res.data); // Set the fetched data
    } catch (err) {
      console.log({ err })
    }
  }, [])

  const updateData = useCallback(async (data) => {
    console.log({data})
    const url = `${config.url + API_URLS.VOUCHERS}?id=${data.id}`;
    try {
      await axios.put(url, data);
    } catch (err) {
      console.log({ err })
    }
  }, [])

  const onActiveChange = async (e, row) => {
    // console.log({row})
    const data = {
      id: row.id,
      isActive: e.target.checked,
    }
    await updateData(data)
    await fetchData(currentPage);
    // console.log({ value: e.target.checked })
  }

  const handleDeleteVoucher = (row) => {
    console.log({ row })
  }

  
  // Define columns for the monthly finance report
  const columns = [
    {
      name: "Id",
      selector: (row) => row?.id ?? "--",
    },
    {
      name: "Amount",
      selector: (row) => row?.amount ?? "--",
    },
    {
      name: "Code",
      selector: (row) => row?.code ?? "--",
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
      name: "Store Id",
      selector: (row) => row?.storeId ?? "--",
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
                label: <Button color="danger" variant="outlined" className="w-[80px]" onClick={() => { handleDeleteVoucher(row) }}>Delete</Button>,
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
      <p className="text-[24px]">All Vouchers</p>
      <DataTable paginationServer columns={columns} data={data?.data || []} pagination paginationPerPage={10} onChangePage={onChangePage} paginationTotalRows={data?.data?.pagination?.totalItems}
      ></DataTable>
    </div>
  );
}
