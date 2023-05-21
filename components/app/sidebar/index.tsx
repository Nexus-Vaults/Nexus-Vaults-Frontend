import React from "react";

type Props = {
  isOpened: boolean;
};

const Sidebar = ({ isOpened }: Props) => {
  return (
    <div
      className={`bg-blue100 overflow-hidden  ${
        isOpened ? "w-[20vw]" : "w-[0vw]"
      }`}
    >
      <div className="  ">
        <h1 className="text-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ">
          Logo
        </h1>
      </div>
      <div className=" flex-1 flex flex-col justify-between">
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
    </div>
  );
};

export default Sidebar;
