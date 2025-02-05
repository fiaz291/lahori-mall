"use client";
import { API_URLS } from "@/app/apiUrls";
import config from "@/app/config";
import { Button, Checkbox, Dropdown } from "antd";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import DataTable from "react-data-table-component";

export default function Categories({ params }) {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const fetchData = useCallback(async (page) => {
    const url = `${config.url + API_URLS.ALL_CATEGORIES}?page=${page}&limit=10`;
    // const url = `${config.url + API_URLS.ALL_CATEGORIES}`;
    try {
      const res = await axios.get(url);
      setData(res.data); // Set the fetched data
    } catch (err) {
      console.log({ err });
    }
  }, []);

  const handleDeleteCategory = async (row) => {
    try {
      if (row?.id) {
        await axios.delete(`${config.url}${API_URLS.GET_CATEGORIES}?id=${id}`);
        message.success("Voucher Deleted successfully!");
      }
    } catch (error) {
      console.error("Error DEleting voucher:", error);
      message.error(
        `Error DEleting voucher: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  };

  // Define columns for the monthly finance report
  const columns = [
    {
      name: "Id",
      selector: (row) => row?.id ?? "--",
    },
    {
      name: "Name",
      selector: (row) => row?.name ?? "--",
    },
    {
      name: "Slug",
      selector: (row) => row?.slug ?? "--",
    },

    {
      name: "Image",
      selector: (row) => row?.url ?? "--",
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
                  <Link href={`/admin/edit-category/${row.id}`}>
                    <Button className="w-[80px]">Edit</Button>
                  </Link>
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
                      handleDeleteCategory(row);
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
    fetchData(value);
    setCurrentPage(value);
  };

  return (
    <div className="mt-[24px]">
      <p className="text-[24px]">All Vouchers</p>
      <DataTable
        paginationServer
        columns={columns}
        data={data?.data?.categories || []}
        pagination
        paginationPerPage={10}
        onChangePage={onChangePage}
        paginationTotalRows={data?.data?.pagination?.totalItems}
      ></DataTable>
    </div>
  );
}
