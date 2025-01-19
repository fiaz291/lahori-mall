import config from "@/app/config";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function OrdersToDispatch() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);  // Default items per page

  const columns = [
    {
      name: "Order Number",
      selector: (row) => row.id,
    },
    {
      name: "Customer Id",
      selector: (row) => row.userId,
    },
    {
      name: "Order Status",
      cell: (row) => (
        <select
          defaultValue={row.status}
          onChange={(e) => updateOrderStatus(row.id, e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="out_for_delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
          <option value="returned">Returned</option>
          <option value="failed">failed</option>
        </select>
      ),
    },
    {
      name: "Order Placement Date",
      selector: (row) => row.updatedAt,
    },
  ];

  const updateOrderStatus = async (id, status) => {
    try {
      const response = await axios.patch(
        config.url + "/api/admin/order?id=" + id,
        { status }
      );
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error; // Re-throw the error if you want to handle it further up the call stack
    }
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["oredersData"],
    queryFn: async () => {
      const response = await fetch(config.url + "/api/admin/order");
      return await response.json();
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const handlePageChange =(e)=>{
    // setCurrentPage(page);
    // onChangePage(page, perPage);  // Pass to parent if needed
  }

  const handlePerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setPerPage(value);
    setCurrentPage(1);  // Reset to first page when changing perPage
    onChangePage(1, value);
  };

  return (
    <div>
      <DataTable  columns={columns}
        data={data?.data?.orders || []}
        currentPage={currentPage}
        perPage={perPage}
        onChangePage={handlePageChange}/>
    </div>
  );
}
