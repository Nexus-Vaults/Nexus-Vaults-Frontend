import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type Props = {};

const CardsOverview = (props: Props) => {
  return (
    <div className="flex-1 w-full flex flex-col flex-wrap gap-4 ">
      <div className="flex-1 flex flex-row gap-4">
        <div className="flex-1 flex flex-col justify-between border-2 border-gray-400 rounded-lg bg-white shadow-lg p-2">
          <div className="text-primary text-base font-medium font-sans">
            Nexus
          </div>
          <div className="text-primary text-lg font-medium  font-sans">
            Etherum
          </div>
          <div className="flex flex-row gap-2 items-center text-sm font-medium rounded-md  font-sans cursor-pointer hover:bg-gray-200 ">
            0x71C7656EC7ab88b098defB751B7401B5f6d897
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between border-2 border-gray-400 rounded-lg bg-white shadow-lg p-2">
          <div className="text-primary text-base font-medium  font-sans">
            Nexus
          </div>
          <div className="text-primary text-lg font-medium  font-sans">
            Etherum
          </div>
          <div className="text-sm font-medium  font-sans">
            0x71C7656EC7ab88b098defB751B7401B5f6d897
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-row gap-4">
        <div className="flex-1 flex flex-col justify-between border-2 border-gray-400 rounded-lg bg-white shadow-lg p-2">
          <div className="text-primary text-base font-medium  font-sans">
            Value
          </div>
          <div className="text-primary text-lg font-medium  font-sans">
            69420.23 USDT
          </div>
          <div className="flex items-center ">
            <div className=" h-fit  px-1 rounded-md bg-[#d0e2e5] text-[#4caf54] font-semibold">
              +15%
            </div>
            <div className=" text-gray-500 p-2">Since Last Month</div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between border-2 border-gray-400 rounded-lg bg-white shadow-lg p-2">
          <div className="text-primary text-base font-medium  font-sans">
            Amount
          </div>
          <div className="text-primary text-lg font-medium  font-sans">
            42.23 eth
          </div>
          <div className="flex items-center ">
            <div className=" h-fit  px-1 rounded-md bg-[#d0e2e5] text-[#4caf54] font-semibold">
              +15%
            </div>
            <div className=" text-gray-500 p-2">Since Last Month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsOverview;
