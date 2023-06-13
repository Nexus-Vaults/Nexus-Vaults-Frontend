import React from 'react';
import { TokenInfoDTO } from 'api';
import AssetRow from './AssetRow';
import { Address } from 'wagmi';

export interface AssetBalance {
  assetContractChainId: number;
  token: TokenInfoDTO;
  balance: number;
}

interface TableProps {
  nexusContractChainId: number;
  nexusAddress: Address;
  data: AssetBalance[];
}

const Table: React.FC<TableProps> = ({
  nexusContractChainId,
  nexusAddress,
  data,
}) => {
  return (
    <div
      className="w-full border-sold bg-white shadow-lg border-2 border-gray-400 rounded-lg h-[30vh] overflow-y-auto  px-6"
      style={{ scrollbarWidth: 'thin' }}
    >
      <style>
        {`
    .overflow-y-auto::-webkit-scrollbar {
      width: 0.5rem; /* Adjust as needed */
    }
  
    .overflow-y-auto::-webkit-scrollbar-track {
      background-color: transparent;
    }
  
    .overflow-y-auto::-webkit-scrollbar-thumb {
      background-color: transparent;
    }
    `}
      </style>
      <table className="w-full min-w-full text-left text-sm font-light sticky top-0">
        <thead className="sticky top-0 bg-white  border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              Chain
            </th>
            <th scope="col" className="px-6 py-4">
              Token
            </th>
            <th scope="col" className="px-6 py-4">
              Amount
            </th>
            <th scope="col" className="px-6 py-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b dark:border-neutral-500">
              <AssetRow
                nexusContractChainId={nexusContractChainId}
                nexusAddress={nexusAddress}
                asset={item.token}
                balance={item.balance}
                assetContractChainId={item.assetContractChainId}
              ></AssetRow>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
