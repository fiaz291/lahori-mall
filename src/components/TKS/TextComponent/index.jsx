import { Typography } from "antd";
import React from "react";

const { Text } = Typography;

export default function TextComponent({
  children,
  size = 12,
  type = "primary",
  strike = false,
  bold = false,
  weight = 400,
  style = {},
}) {
  return (
    <Text
      delete={strike}
      strong={bold}
      type={type}
      style={{ fontSize: `${size}px`, fontWeight: weight, ...style }}
    >
      {children}
    </Text>
  );
}
