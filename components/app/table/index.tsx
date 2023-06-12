import React from 'react';
import { TokenInfoDTO, VaultInfo } from 'api';

export interface AssetBalance {
  assetContractChainId: number;
  token: TokenInfoDTO;
  balance: number;
}

interface TableProps {
  data: AssetBalance[];
}

const Table: React.FC<TableProps> = ({ data }) => {
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
              Address
            </th>
            <th scope="col" className="px-6 py-4">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {item.assetContractChainId}
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {item.token.tokenType == 1 ? 'Native Asset' : 'Other'}
              </td>
              <td>{item.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
