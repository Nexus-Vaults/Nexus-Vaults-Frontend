import React from 'react';
import VaultCardOverview from './VaultCardOverview';
import VaultTable from './VaultTable';

type Props = {};

const VaultsOverview = (props: Props) => {
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
      <h1 className="font-bold text-2xl font-mono text-purple">
        Your Vault Overview
      </h1>
      <VaultCardOverview></VaultCardOverview>

      <div className="w-full flex-1 ">
        <VaultTable data={tableData} />
      </div>
    </div>
  );
};

export default VaultsOverview;
