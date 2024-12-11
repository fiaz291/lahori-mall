import React from "react";
import DataTable from "react-data-table-component";

export default function OrdersToDispatch() {
  const columns = [
    {
      name: "Order Number",
      selector: (row) => row.orderNumber,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customerName,
    },
    {
      name: "Order Status",
      cell: (row) => (
        <select
          defaultValue={row.orderStatus}
          onChange={(e) =>
            console.log(
              `Order ${row.orderNumber} status changed to`,
              e.target.value
            )
          }
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      ),
    },
    {
      name: "Order Placement Date",
      selector: (row) => row.orderDate,
    },
  ];

  const data = [
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

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
