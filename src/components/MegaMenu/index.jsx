"use client";
import { Divider, Flex, List, Typography } from "antd";
import React, { useEffect, useState } from "react";

// const menu = {
//   clothes: {
//     name: "clothes",
//     items: [
//       {
//         name: "winter",
//         subs: [
//           { label: "clothes 1", url: "#" },
//           { label: "item 1", url: "#" },
//           { label: "item 1", url: "#" },
//         ],
//       },
//       {
//         name: "spring",
//         subs: [
//           { label: "clothes 1", url: "#" },
//           { label: "item 1", url: "#" },
//           { label: "item 1", url: "#" },
//         ],
//       },
//       {
//         name: "summer",
//         subs: [
//           { label: "clothes 1", url: "#" },
//           { label: "item 1", url: "#" },
//           { label: "item 1", url: "#" },
//         ],
//       },
//     ],
//   },
//   shoes: {
//     name: "shoes",
//     items: [
//       {
//         name: "winter",
//         subs: [
//           { label: "shoes 1", url: "#" },
//           { label: "item 1", url: "#" },
//           { label: "item 1", url: "#" },
//         ],
//       },
//       //   {
//       //     name: "spring",
//       //     subs: [
//       //       { label: "shoes 1", url: "#" },
//       //       { label: "item 1", url: "#" },
//       //       { label: "item 1", url: "#" },
//       //     ],
//       //   },
//       //   {
//       //     name: "summer",
//       //     subs: [
//       //       { label: "shoes 1", url: "#" },
//       //       { label: "item 1", url: "#" },
//       //       { label: "item 1", url: "#" },
//       //     ],
//       //   },
//     ],
//   },
//   accessories: {
//     name: "accessories",
//     items: [
//       {
//         name: "winter",
//         subs: [
//           { label: "accessories 1", url: "#" },
//           { label: "accessories 1", url: "#" },
//           { label: "item 1", url: "#" },
//         ],
//       },
//       {
//         name: "spring",
//         subs: [
//           { label: "accessories 1", url: "#" },
//           { label: "item 1", url: "#" },
//           { label: "item 1", url: "#" },
//         ],
//       },
//       //   {
//       //     name: "summer",
//       //     subs: [
//       //       { label: "accessories 1", url: "#" },
//       //       { label: "item 1", url: "#" },
//       //       { label: "item 1", url: "#" },
//       //     ],
//       //   },
//     ],
//   },
//   discounts: {
//     name: "discounts",
//     items: [
//       {
//         name: "winter",
//         subs: [
//           { label: "discounts 1", url: "#" },
//           { label: "discounts 1", url: "#" },
//           { label: "discounts 1", url: "#" },
//         ],
//       },
//       {
//         name: "spring",
//         subs: [
//           { label: "discounts 1", url: "#" },
//           { label: "discounts 1", url: "#" },
//           { label: "discounts 1", url: "#" },
//         ],
//       },
//       {
//         name: "summer",
//         subs: [
//           { label: "discounts 1", url: "#" },
//           { label: "item 1", url: "#" },
//           { label: "item 1", url: "#" },
//         ],
//       },
//     ],
//   },
// };

const menu = {
    fashion: {
      name: "fashion",
      items: [
        {
          name: "clothing",
          subs: [
            { label: "clothing 1", url: "#" },
            { label: "clothing 2", url: "#" },
            { label: "clothing 3", url: "#" },
          ],
        },
        {
          name: "footwear",
          subs: [
            { label: "shoes 1", url: "#" },
            { label: "shoes 2", url: "#" },
            { label: "shoes 3", url: "#" },
          ],
        },
      ],
    },
    accessories: {
      name: "accessories",
      items: [
        {
          name: "jewelry",
          subs: [
            { label: "necklaces", url: "#" },
            { label: "bracelets", url: "#" },
            { label: "rings", url: "#" },
          ],
        },
        {
          name: "bags",
          subs: [
            { label: "handbags", url: "#" },
            { label: "backpacks", url: "#" },
            { label: "wallets", url: "#" },
          ],
        },
      ],
    },
    beauty: {
      name: "beauty",
      items: [
        {
          name: "skincare",
          subs: [
            { label: "moisturizers", url: "#" },
            { label: "serums", url: "#" },
            { label: "cleansers", url: "#" },
          ],
        },
        {
          name: "makeup",
          subs: [
            { label: "lipstick", url: "#" },
            { label: "mascara", url: "#" },
            { label: "eyeshadow", url: "#" },
          ],
        },
      ],
    },
    computers: {
      name: "computers",
      items: [
        {
          name: "laptops",
          subs: [
            { label: "gaming laptops", url: "#" },
            { label: "business laptops", url: "#" },
            { label: "ultrabooks", url: "#" },
          ],
        },
        {
          name: "desktops",
          subs: [
            { label: "all-in-one", url: "#" },
            { label: "gaming desktops", url: "#" },
            { label: "custom builds", url: "#" },
          ],
        },
      ],
    },
    digital: {
      name: "digital",
      items: [
        {
          name: "cameras",
          subs: [
            { label: "DSLR", url: "#" },
            { label: "mirrorless", url: "#" },
            { label: "point and shoot", url: "#" },
          ],
        },
        {
          name: "smartphones",
          subs: [
            { label: "smartphones 1", url: "#" },
            { label: "smartphones 2", url: "#" },
            { label: "smartphones 3", url: "#" },
          ],
        },
      ],
    },
    home_appliances: {
      name: "home appliances",
      items: [
        {
          name: "kitchen",
          subs: [
            { label: "refrigerators", url: "#" },
            { label: "microwaves", url: "#" },
            { label: "blenders", url: "#" },
          ],
        },
        {
          name: "laundry",
          subs: [
            { label: "washing machines", url: "#" },
            { label: "dryers", url: "#" },
            { label: "irons", url: "#" },
          ],
        },
      ],
    },
    sports_health_rentals: {
      name: "sports, health, rentals",
      items: [
        {
          name: "sportswear",
          subs: [
            { label: "activewear", url: "#" },
            { label: "sports shoes", url: "#" },
            { label: "track pants", url: "#" },
          ],
        },
        {
          name: "fitness",
          subs: [
            { label: "gym equipment", url: "#" },
            { label: "swimming gear", url: "#" },
            { label: "yoga mats", url: "#" },
          ],
        },
        {
          name: "rentals",
          subs: [
            { label: "car rentals", url: "#" },
            { label: "bike rentals", url: "#" },
            { label: "tool rentals", url: "#" },
          ],
        },
      ],
    },
    automotive_tools: {
      name: "automotive & tools",
      items: [
        {
          name: "car accessories",
          subs: [
            { label: "car covers", url: "#" },
            { label: "seat cushions", url: "#" },
            { label: "car chargers", url: "#" },
          ],
        },
        {
          name: "tools",
          subs: [
            { label: "power tools", url: "#" },
            { label: "hand tools", url: "#" },
            { label: "garden tools", url: "#" },
          ],
        },
      ],
    },
    travel_books_ecoupons: {
      name: "travel · books · e-coupons",
      items: [
        {
          name: "travel",
          subs: [
            { label: "airline ticket", url: "#" },
            { label: "hotel", url: "#" },
            { label: "tours/tickets", url: "#" },
            { label: "rental car", url: "#" },
            { label: "overseas package", url: "#" },
            { label: "domestic package", url: "#" },
            { label: "theme travel", url: "#" },
          ],
        },
        {
          name: "books",
          subs: [
            { label: "domestic books", url: "#" },
            { label: "foreign books", url: "#" },
            { label: "infants and children", url: "#" },
            { label: "learning/education", url: "#" },
            { label: "album (K-POP)", url: "#" },
          ],
        },
        {
          name: "e-coupons",
          subs: [
            { label: "e-coupon", url: "#" },
            { label: "gift certificate", url: "#" },
          ],
        },
      ],
    },
  };

  
const inlineStyles = {
  zIndex: 100,
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

  useEffect(() => {
    if (defaultSelected) {
      setSelectedMenu(Object.values(menu)?.[0]);
      setSelectedLabel(Object.keys(menu)?.[0]);
    }
  }, [defaultSelected]);
  if (!defaultOpen && !open) {
    return <></>;
  }
  return (
    <div
      className="absolute"
      style={
        !!top && !!left
          ? { top: top, left: left, ...inlineStyles }
          : { ...inlineStyles }
      }
      onMouseLeave={() => {
        if (defaultSelected) return;
        setSelectedMenu(null);
        setSelectedLabel(null);
      }}
    >
      <List
        className="w-[170px]"
        style={{ borderRadius: "unset", background: "white" }}
        bordered
        dataSource={Object.keys(menu)}
        renderItem={(item) => (
          <List.Item
            style={selectedLabel === item ? { background: "red" } : {}}
            className="clickable"
            onMouseEnter={() => {
              setSelectedMenu(menu?.[item]);
              setSelectedLabel(item);
            }}
          >
            <Typography.Text>[ITEM]</Typography.Text> {item}
          </List.Item>
        )}
      />
      {!!selectedMenu && (
        <Flex
          className="absolute left-[170px] top-0 p-2 h-[187px]"
          style={{ border: "1px solid rgba(0,0,0,0.4)", borderLeft: "none" }}
          gap={4}
        >
          {(selectedMenu?.items || [])
            .concat(
              new Array(
                Math.max(3 - (selectedMenu?.items?.length || 0), 0)
              ).fill({})
            )
            .map((item, index) => (
              <React.Fragment key={index}>
                <div className="w-[100px]">
                  <div>{item?.name || ""}</div>
                  {item?.subs?.map((sub, subIndex) => (
                    <div key={subIndex}>{sub.label}</div>
                  ))}
                </div>
                {index < 2 && <Divider type="vertical" />}
              </React.Fragment>
            ))}
        </Flex>
      )}
    </div>
  );
}
