import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="flex flex-col h-screen  w-[20%] border-outline bg-blue100">
      <div className="flex-1">
        <h1 className="text-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ">
          My Nexuses
        </h1>
      </div>
      <div className="flex-1">
        <h1 className=" text-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ">
          My Vaults
        </h1>
      </div>
    </div>
  );
};

export default Sidebar;
