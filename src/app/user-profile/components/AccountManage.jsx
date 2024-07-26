import React from "react";

export default function ManageAccComponent(props) {
  const name = "Abdul Saboor";
  const address = [
    "House no 5, street no 2, Siraj Park, Shahdara Town, Lahore",
    "Punjab - Lahore - Shahdra - Shahdra Town",
  ];
  const contact = "(+01) 2233334444";
  const email = "abd@gmail.com";

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-lg sm:text-xl md:text-2xl">Manage My Account</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-4 bg-[#080808] p-4 border border-[#3a3a3a] hover:bg-[#0e0e0ed6] cursor-pointer flex-1">
          <h3 className="text-sm sm:text-base">Personal Profile</h3>
          <div className="flex flex-col gap-1">
            <p className="text-[#dadada]">{name}</p>
            <p className="text-[#dadada]">{email}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 bg-[#080808] p-4 border border-[#3a3a3a] hover:bg-[#0e0e0ed6] cursor-pointer flex-1">
          <div className="flex flex-col gap-4 md:flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base">Address Book</h3>
              <div className="w-px bg-[#3a3a3a] h-6 md:h-10"></div>
              <button className="border-0 text-xs sm:text-sm text-blue-500">
                Edit
              </button>
            </div>
            <p className="text-[#bbbbbb] text-xs font-light">
              DEFAULT SHIPPING ADDRESS
            </p>
            <div className="flex flex-col gap-1">
              <p className="font-bold">{name}</p>
              <p className="font-extralight">{address[0]}</p>
              <p className="font-extralight">{address[1]}</p>
              <p className="font-extralight">{contact}</p>
            </div>
          </div>
          <div className="w-px bg-[#3a3a3a] hidden md:block"></div>
          <div className="flex flex-col gap-4 md:flex-1">
            <h3 className="text-sm sm:text-base">{"\u00A0"}</h3>
            <p className="text-[#bbbbbb] text-xs font-light">
              DEFAULT SHIPPING ADDRESS
            </p>
            <div className="flex flex-col gap-1">
              <p className="font-bold">{name}</p>
              <p className="font-extralight">{address[0]}</p>
              <p className="font-extralight">{address[1]}</p>
              <p className="font-extralight">{contact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
