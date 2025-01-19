"use client";
import { API_URLS } from "@/app/apiUrls";
import config from "@/app/config";
import { Divider, Flex, List, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";


// const menu = {
//   fashion: {
//     name: "fashion",
//     items: [
//       {
//         name: "clothing",
//         url: "",
//       },
//       {
//         name: "footwear",
//         url: "",
//       },
//     ],
//   },
//   accessories: {
//     name: "accessories",
//     items: [
//       {
//         name: "jewelry",
//         subs: [
//           { label: "necklaces", url: "#" },
//           { label: "bracelets", url: "#" },
//           { label: "rings", url: "#" },
//         ],
//       },
//       {
//         name: "bags",
//         subs: [
//           { label: "handbags", url: "#" },
//           { label: "backpacks", url: "#" },
//           { label: "wallets", url: "#" },
//         ],
//       },
//     ],
//   },
//   beauty: {
//     name: "beauty",
//     items: [
//       {
//         name: "skincare",
//         subs: [
//           { label: "moisturizers", url: "#" },
//           { label: "serums", url: "#" },
//           { label: "cleansers", url: "#" },
//         ],
//       },
//       {
//         name: "makeup",
//         subs: [
//           { label: "lipstick", url: "#" },
//           { label: "mascara", url: "#" },
//           { label: "eyeshadow", url: "#" },
//         ],
//       },
//     ],
//   },
//   computers: {
//     name: "computers",
//     items: [
//       {
//         name: "laptops",
//         subs: [
//           { label: "gaming laptops", url: "#" },
//           { label: "business laptops", url: "#" },
//           { label: "ultrabooks", url: "#" },
//         ],
//       },
//       {
//         name: "desktops",
//         subs: [
//           { label: "all-in-one", url: "#" },
//           { label: "gaming desktops", url: "#" },
//           { label: "custom builds", url: "#" },
//         ],
//       },
//     ],
//   },
//   digital: {
//     name: "digital",
//     items: [
//       {
//         name: "cameras",
//         subs: [
//           { label: "DSLR", url: "#" },
//           { label: "mirrorless", url: "#" },
//           { label: "point and shoot", url: "#" },
//         ],
//       },
//       {
//         name: "smartphones",
//         subs: [
//           { label: "smartphones 1", url: "#" },
//           { label: "smartphones 2", url: "#" },
//           { label: "smartphones 3", url: "#" },
//         ],
//       },
//     ],
//   },
//   home_appliances: {
//     name: "home appliances",
//     items: [
//       {
//         name: "kitchen",
//         subs: [
//           { label: "refrigerators", url: "#" },
//           { label: "microwaves", url: "#" },
//           { label: "blenders", url: "#" },
//         ],
//       },
//       {
//         name: "laundry",
//         subs: [
//           { label: "washing machines", url: "#" },
//           { label: "dryers", url: "#" },
//           { label: "irons", url: "#" },
//         ],
//       },
//     ],
//   },
//   sports_health_rentals: {
//     name: "sports, health, rentals",
//     items: [
//       {
//         name: "sportswear",
//         subs: [
//           { label: "activewear", url: "#" },
//           { label: "sports shoes", url: "#" },
//           { label: "track pants", url: "#" },
//         ],
//       },
//       {
//         name: "fitness",
//         subs: [
//           { label: "gym equipment", url: "#" },
//           { label: "swimming gear", url: "#" },
//           { label: "yoga mats", url: "#" },
//         ],
//       },
//       {
//         name: "rentals",
//         subs: [
//           { label: "car rentals", url: "#" },
//           { label: "bike rentals", url: "#" },
//           { label: "tool rentals", url: "#" },
//         ],
//       },
//     ],
//   },
//   automotive_tools: {
//     name: "automotive & tools",
//     items: [
//       {
//         name: "car accessories",
//         subs: [
//           { label: "car covers", url: "#" },
//           { label: "seat cushions", url: "#" },
//           { label: "car chargers", url: "#" },
//         ],
//       },
//       {
//         name: "tools",
//         subs: [
//           { label: "power tools", url: "#" },
//           { label: "hand tools", url: "#" },
//           { label: "garden tools", url: "#" },
//         ],
//       },
//     ],
//   },
//   travel_books_ecoupons: {
//     name: "travel · books · e-coupons",
//     items: [
//       {
//         name: "travel",
//         subs: [
//           { label: "airline ticket", url: "#" },
//           { label: "hotel", url: "#" },
//           { label: "tours/tickets", url: "#" },
//           { label: "rental car", url: "#" },
//           { label: "overseas package", url: "#" },
//           { label: "domestic package", url: "#" },
//           { label: "theme travel", url: "#" },
//         ],
//       },
//       {
//         name: "books",
//         subs: [
//           { label: "domestic books", url: "#" },
//           { label: "foreign books", url: "#" },
//           { label: "infants and children", url: "#" },
//           { label: "learning/education", url: "#" },
//           { label: "album (K-POP)", url: "#" },
//         ],
//       },
//       {
//         name: "e-coupons",
//         subs: [
//           { label: "e-coupon", url: "#" },
//           { label: "gift certificate", url: "#" },
//         ],
//       },
//     ],
//   },
// };


const inlineStyles = {
  zIndex: 1,
  maxHeight: 400,
  overflow: 'scroll'
};
export default function MegaMenu({
  open,
  defaultSelected = false,
  defaultOpen,
  top,
  left,
}) {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get(`${config.url + API_URLS.GET_CATEGORIES}?menu=true`);
        setMenu(response.data.data)
      }
      catch (err) {
        console.log({ err })
      }
    }
    getCategories();
  }, [])
  // useEffect(() => {
  //   if (defaultSelected) {
  //     setSelectedMenu(Object.values(menu)?.[0]);
  //     setSelectedLabel(Object.keys(menu)?.[0]);
  //   }
  // }, [defaultSelected]);
  if (!defaultOpen && !open) {
    return <></>;
  }
  return (
    <span onMouseLeave={() => {
      if (defaultSelected) return;
      setSelectedMenu(null);
      setSelectedLabel(null);
    }}>
      <div
        className="absolute"
        style={
          !!top && !!left
            ? { top: top, left: left, ...inlineStyles }
            : { ...inlineStyles }
        }
        onMouseLeave={() => {
          // if (defaultSelected) return;
          // setSelectedMenu(null);
          // setSelectedLabel(null);
        }}
      >
        {!!menu &&
          <List
            className="w-[185px]"
            style={{ borderRadius: "unset", background: "white" }}
            bordered
            dataSource={menu}
            renderItem={(item) => (
              <List.Item
                style={selectedLabel === item ? { background: "red" } : {}}
                className="clickable"
                onMouseEnter={() => {
                  setSelectedMenu(item.subCategories);
                  setSelectedLabel(item.name);
                }}
              >
                <Typography.Text>{item.name}</Typography.Text>
              </List.Item>
            )}
          />
        }
      </div>
      {!!selectedMenu && (
        <Flex
          className="absolute left-[215px] top-[60px] p-2 min-h-[367px] max-h-[367px] bg-white min-w-[300px]"
          style={{ borderRight: "1px solid rgba(0,0,0,0.4)", borderLeft: "none", zIndex: 100 }}
          gap={4}
        >
          <div>

            {(selectedMenu || [])
              .map((item, index) => (
                <React.Fragment key={index}>
                  <div className="w-[300px]">
                    <div className="text-[14px] mb-[10px]">{item?.name || ""}</div>
                  </div>
                </React.Fragment>
              ))}
          </div>
        </Flex>
      )}
    </span>
  );
}
