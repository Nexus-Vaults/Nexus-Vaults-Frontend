import React from 'react';
import Table from '../table';
import CardsOverview from './cards-overview';

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
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <CardsOverview></CardsOverview>
      <div className="w-full h-full flex-1 border-2 border-gray-400 bg-white shadow-lg rounded-lg">
        Graph
      </div>
      <div className="w-full flex-1 ">
        <Table data={tableData} />
      </div>
    </div>
  );
};

export default Overview;
