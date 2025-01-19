import config from "@/app/config";
import React from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function OrdersToDispatch() {
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

  const data1 = [
    {
      id: 1,
      orderNumber: "ORD1001",
      customerName: "John Doe",
      orderStatus: "Pending",
      orderDate: "2024-12-10",
    },
    {
      id: 2,
      orderNumber: "ORD1002",
      customerName: "Sarah Lee",
      orderStatus: "In Progress",
      orderDate: "2024-12-09",
    },
    {
      id: 3,
      orderNumber: "ORD1003",
      customerName: "Mark Smith",
      orderStatus: "Dispatched",
      orderDate: "2024-12-08",
    },
    {
      id: 4,
      orderNumber: "ORD1004",
      customerName: "Emily Davis",
      orderStatus: "Delivered",
      orderDate: "2024-12-07",
    },
    {
      id: 5,
      orderNumber: "ORD1005",
      customerName: "Michael Brown",
      orderStatus: "Cancelled",
      orderDate: "2024-12-06",
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
  return (
    <div>
      <DataTable columns={columns} data={data?.data?.orders || []} />
    </div>
  );
}
