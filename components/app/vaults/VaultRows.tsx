import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CryptoList from './CryptoList';
import ViewCozyIcon from '@mui/icons-material/ViewCozy';
import { useRouter } from 'next/router';

type Props = {
  logo: StaticImageData;
  vaultId: number;
  address: `0x${string}`;
  totalAsset: number;
};

const VaultRows = ({ logo, vaultId, address, totalAsset }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const coins = [
    { id: 1, name: 'USDC', amount: 2.5, amountUSD: 125000 },
    { id: 2, name: 'USDT', amount: 10, amountUSD: 30000 },
    { id: 3, name: 'ETH', amount: 100, amountUSD: 5000 },
  ];

  const handleVaultOverviewClick = (event: any) => {
    event.stopPropagation();
    router.push('/app/vaults/vault-overview');
  };

  const router = useRouter();

  return (
    <div
      className={`flex flex-col ${
        expanded && 'bg-blue50 text-white'
      } shadow-md  border border-gray-300 mb-4 rounded-md hover:bg-blue50  hover:text-white hover:shadow-lg hover:border-transparent hover:cursor-pointer hover:scale-105`}
    >
      <div
        className="flex items-center px-4 py-2 cursor-pointer justify-between"
        onClick={toggleExpanded}
      >
        <div className="flex flex-row gap-2 items-center">
          <Image src={logo} width={32} height={32} alt="" />
          <div className="flex-1 flex flex-row justify-between ml-5">
            <span className="font-mono mr-2">{vaultId}</span>
          </div>
        </div>

        <div className="relative flex flex-row items-center justify-center">
          <span className="font-mono font-bold mr-8">${totalAsset}</span>
          <div
            className="absolute left-14 flex flex-row items-center  hover:scale-125"
            onClick={handleVaultOverviewClick}
          >
            <ViewCozyIcon />
          </div>
        </div>
      </div>
      {expanded && (
        <div className="flex flex-col bg-whitesmoke p-4 text-black relative">
          <div className="flex flex-row items-center justify-between">
            <div className="text-xl text-gray-400 font-bold font-sans p-2">
              Gateway: V1
            </div>
            <div className="text-gray-500 cursor-pointer hover:text-blue50 s hover:font-semibold">
              {address.slice(0, 12)}
              ...
              {address.slice(-8)}
            </div>
          </div>
          <CryptoList coins={coins} />
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
