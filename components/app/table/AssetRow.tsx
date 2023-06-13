import { TokenInfoDTO } from 'api';
import React, { useContext } from 'react';
import { getEvmChainId, mapEVMChainIdToChain } from '../../../utils';
import { ChainDeployments } from '../../ContractsAddressesContext';

interface Props {
  assetContractChainId: number;
  asset: TokenInfoDTO;
  balance: number;
}

const AssetRow = ({ assetContractChainId, asset, balance }: Props) => {
  const deployment = useContext(ChainDeployments);

  return (
    <>
      <td className="whitespace-nowrap px-6 py-4 font-medium">
        <img
          src={`/images/chain/${getEvmChainId(
            deployment.chainDeployment,
            assetContractChainId
          )}.png`}
          width={64}
        />
      </td>
      <td>
        {asset.tokenType == 1
          ? mapEVMChainIdToChain(
              getEvmChainId(deployment.chainDeployment, assetContractChainId)
            ).nativeCurrency.symbol
          : 'Other'}
      </td>
      <td>{balance}</td>
      <td>
        <button className="bg-purple hover:bg-purple text-white font-bold py-1 px-2 rounded-lg">
          Send
        </button>
      </td>
    </>
  );
};

export default AssetRow;
