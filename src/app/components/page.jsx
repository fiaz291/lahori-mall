"use client";
import MegaMenu from "@/components/MegaMenu";
import MediumProductCard from "@/components/TKS/MediumProductCard";
import SmallProductCard from "@/components/TKS/SmallProductCad";
import { Button } from "antd";
import React, { useState } from "react";

export default function Components() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative m-16">
        <Button onClick={() => setOpen(!open)}>adasdasd</Button>
        <div>asdasdas</div>
        <MegaMenu
          open={open}
          defaultOpen={false}
          top="31px"
          left="unset"
          defaultSelected={false}
        />
      </div>
      <MediumProductCard />

      <SmallProductCard
        title="Samsung Bespoke Grande AI One Body WF2520HCEED Detergent Automatic
              25KG+20KG Washer Dryer Gray"
      />
      <SmallProductCard title="Samsung Bey" />

      {/* 
      <div className="relative m-16">
        <div>asdasdas</div>
        <MegaMenu
          open={open}
          defaultOpen={true}
          top="31px"
          left="unset"
        />
      </div> */}
    </>
  );
}
