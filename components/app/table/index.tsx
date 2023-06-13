import React, { useContext } from 'react';
import { TokenInfoDTO, VaultInfo } from 'api';
import { ChainDeployments } from '../../ContractsAddressesContext';
import { getEvmChainId, mapEVMChainIdToChain } from '../../../utils';

export interface AssetBalance {
  assetContractChainId: number;
  token: TokenInfoDTO;
  balance: number;
}

interface TableProps {
  data: AssetBalance[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const { chainDeployment } = useContext(ChainDeployments);

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
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                <img
                  src={`/images/chain/${getEvmChainId(
                    chainDeployment,
                    item.assetContractChainId
                  )}.png`}
                  width={64}
                />
              </td>
              <td>
                {item.token.tokenType == 1
                  ? 'Native'
                  : mapEVMChainIdToChain(
                      getEvmChainId(chainDeployment, item.assetContractChainId)
                    ).nativeCurrency.symbol}
              </td>
              <td>{item.balance}</td>
              <td>{item.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
