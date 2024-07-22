import React from "react";

export default function ManageAccComponent(props) {
  var name = "Abdul Saboor";
  var address = [
    "House no 5, street no 2, Siraj Park, Shahdara Town, Lahore",
    "Punjab - Lahore - Shahdra - Shahdra Town",
  ];
  var contact = "(+01) 2233334444";
  var email = "abd@gmail.com";

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[18px]">Manage My Account</h1>
      <div className="grid gap-4 max-h-[500px] overflow-hidden lg:grid-cols-[1fr_2fr] grid-cols-0">
        <div className="flex flex-col gap-4 bg-[#080808] p-4 border border-[#3a3a3a] hover:bg-[#0e0e0ed6] cursor-pointer">
          <h3 className=" text-[17px]">Personal Profile</h3>
          <div className="flex flex-col gap-1">
            <p className="text-[#dadada]">{name}</p>
            <p className="text-[#dadada]">{email}</p>
          </div>
        </div>

        <div className="flex gap-8 justify-between bg-[#080808]  p-4 border border-[#3a3a3a] hover:bg-[#0e0e0ed6] cursor-pointer ">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <h3 className=" text-[17px]">Address Book</h3>
              <div className="w-[1px] bg-[#3a3a3a] h-[70%] self-center "></div>
              <button className="border-0 text-[14px] pt-1 text-blue-500 ">
                Edit
              </button>
            </div>
            <p className="text-[#bbbbbb] text-[11px] font-light">
              DEFAULT SHIPPING ADDRESS
            </p>
            <div className="flex flex-col gap-[3px]">
              <p className="font-bold">{name}</p>
              <p className="font-extralight ">{address[0]}</p>
              <p className="font-extralight">{address[1]}</p>
              <p className="font-extralight">{contact}</p>
            </div>
          </div>
          <div className="w-[2px] bg-[#3a3a3a]  "></div>
          <div className="flex flex-col gap-4 ">
            <h3 className=" text-[17px]">{"\u00A0"}</h3>
            <p className="text-[#bbbbbb] text-[11px] font-light">
              DEFAULT SHIPPING ADDRESS
            </p>
            <div className="flex flex-col gap-[3px]">
              <p className="font-bold">{name}</p>
              <p className="font-extralight ">{address[0]}</p>
              <p className="font-extralight">{address[1]}</p>
              <p className="font-extralight">{contact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
