import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  isOpened: boolean;
};

const Sidebar = ({ isOpened }: Props) => {
  const router = useRouter();

  return (
    <div
      className={`bg-blue100 overflow-hidden shadow-lg  ${
        isOpened ? 'w-[15vw]' : 'w-[0vw]'
      }`}
    >
      <div className="flex flex-col gap-2  mb-10 ">
        <div className="text-center text-gray-300">Logo of chain</div>
        <div>
          <div className="text-center text-gray-300">Name</div>
          <div className="text-center text-gray-300">Address</div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="w-[80%] h-[1px] bg-gray-300"></div>
        </div>
      </div>
      <div className=" flex-1 flex flex-col justify-between gap-2">
        <div className="flex-1" onClick={() => router.push('/app/overview')}>
          <h1 className="cursor-pointer text-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ">
            Overview
          </h1>
        </div>
        <div className="flex-1">
          <h1 className=" text-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ">
            Vaults
          </h1>
        </div>
        <div className="flex-1">
          <h1 className="text-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ">
            Transactors
          </h1>
        </div>
        <div className="flex-1">
          <h1 className="text-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ">
            Extensions
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
