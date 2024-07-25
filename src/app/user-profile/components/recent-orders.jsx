import React from "react";

export default function RecentOrders(props) {
  const tableHeader = ["Order #", "Placed On", "Items", "Total", "Status"];
  const orders = [...props.orders];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[15px]">Recent Orders</h3>
      <div className="grid items-center grid-cols-[1.7fr_1.2fr_3.5fr_1.5fr_1.5fr] gap-6 bg-[#007a3b] p-2">
        {tableHeader.map((heading) => (
          <div key={heading} className="font-bold text-left text-[12px]">
            {heading}
          </div>
        ))}
      </div>
      <div className="max-h-[220px] overflow-y-auto">
        {orders.map((order) => (
          <div
            key={order.id}
            className="grid items-center grid-cols-[1.7fr_1.2fr_3.5fr_1.5fr_1.5fr] text-left gap-6 border-b border-[#4a4a4a] p-2 pb-4 text-[12px]"
          >
            <div>{order.id}</div>
            <div>{order.date}</div>
            <div className="flex items-center gap-2 overflow-x-scroll hidden_scroll_bar">
              {order.items.map((item, index) => (
                <img
                  className="w-12 h-12 cursor-pointer"
                  key={index}
                  src={item.image}
                  alt={item.name}
                />
              ))}
            </div>
            <div>Rs. {order.total}</div>
            <div
              className={`${
                order.status === "Delivered"
                  ? "text-green-600"
                  : "text-orange-600"
              }`}
            >
              {order.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
