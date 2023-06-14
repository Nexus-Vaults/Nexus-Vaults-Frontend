import React, { useContext, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CryptoList from './CryptoList';
import ViewCozyIcon from '@mui/icons-material/ViewCozy';
import { useRouter } from 'next/router';
import { getEvmChainId } from '../../../utils';
import { ChainDeployments } from '../../Context';
import { Address } from 'viem';

type Props = {
  contractChainId: number;
  vaultId: number;
  address: Address;
  totalAsset: number;
};

const VaultRows = ({
  contractChainId,
  vaultId,
  address,
  totalAsset,
}: Props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const deployment = useContext(ChainDeployments);

  const handleVaultOverviewClick = (event: any) => {
    event.stopPropagation();
    router.push('/app/vaults/vault-overview');
  };

  const router = useRouter();

  return (
    <div
      className={`flex flex-col ${
        expanded && 'bg-blue50 text-white'
      } shadow-md  border border-gray-300 mb-4 rounded-md hover:bg-blue50   hover:shadow-lg hover:border-transparent hover:cursor-pointer`}
    >
      <div
        className="flex items-center px-4 py-2 cursor-pointer justify-between"
        onClick={toggleExpanded}
      >
        <div className="flex flex-row gap-2 items-center">
          <img
            width={32}
            height={32}
            src={`/images/chain/${getEvmChainId(
              deployment.chainDeployment,
              contractChainId
            )}.png`}
          ></img>
          <div className="flex-1 flex flex-row justify-between ml-5">
            <span className="font-mono mr-2">{vaultId}</span>
          </div>
        </div>

        <div className="relative flex flex-row items-center justify-center">
          <span className="font-mono font-bold mr-8">${totalAsset}</span>
        </div>
        <div>
          {address?.slice(0, 12)}
          ...
          {address?.slice(-8)}
        </div>
        <div
          className="flex flex-row items-center  hover:scale-125"
          onClick={handleVaultOverviewClick}
        >
          <ViewCozyIcon />
        </div>
      </div>
      {expanded && (
        <div className="flex flex-col bg-whitesmoke p-4 text-black relative">
          <div className="flex flex-row items-center justify-between">
            <div className="text-xl text-gray-400 font-bold font-sans p-2">
              Gateway: V1
            </div>
            <div className="text-gray-500 cursor-pointer hover:text-blue50 s hover:font-semibold">
              {address}
            </div>
          </div>
          <div className="flex flex-row justify-center absolute bottom-0 left-0 right-0">
            <ExpandLessIcon
              className="cursor-pointer "
              onClick={toggleExpanded}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VaultRows;
