import React from 'react';
import Table from '../table';

type Props = {};

const Overview = (props: Props) => {
  const tableData = [
    { assetName: 'Asset 1', amount: 100, value: 100 },
    { assetName: 'Asset 2', amount: 200, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <div className="w-full h-full flex-1 border-2 border-gray-400 rounded-lg">
        <div className="flex-1 h-[30%]  gap-4  flex flex-row justify-around p-4">
          <div className="flex-1 border-2 border-gray-300 rounded-lg">
            Owner
          </div>
          <div className="flex-1 border-2 border-gray-300 rounded-lg">
            Value
          </div>
          <div className="flex-1 border-2 border-gray-300 rounded-lg">
            Amount
          </div>
        </div>
        <div className="flex-1">Graph</div>
      </div>
      <div className="w-full flex-1">
        <Table data={tableData} />
      </div>
    </div>
  );
};

export default Overview;
