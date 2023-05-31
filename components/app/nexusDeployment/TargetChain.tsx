import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChainDeployment } from 'api';
import { ChainDeployments } from '../../../pages/app/ContractsAddressesContext';

import fantom from '../../../public/images/chain/1.png';

type Props = {
  handleTargetChain: (chainDeployment: ChainDeployment | undefined) => void;
};

const TargetChain = ({ handleTargetChain }: Props) => {
  const [selectedItem, setSelectedItem] = useState<ChainDeployment>();

  const contractsAddresses = useContext(ChainDeployments);

  useEffect(() => {
    handleTargetChain(selectedItem);
  }, [selectedItem]);

  const handleItemClick = (item: ChainDeployment) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex flex-col   p-5 gap-y-10">
      <div className="flex flex-col p-5 gap-2">
        <h2 className="text-primary font-semibold font-mono text-4xl leading-12 text-center ">
          Choose your target chain
        </h2>
        <div className="flex flex-row justify-center">
          <div className="w-[100%] h-[1px] bg-gray-300"></div>
        </div>
        <p className="text-center font-serif">
          This chain is going to reflect where your nexus base is going to be.
        </p>
      </div>
      {contractsAddresses.map((x, key) => {
        return (
          <div className="flex flex-wrap justify-center gap-6 p-2" key={key}>
            <div
              className={`border p-2 rounded ${
                selectedItem?.contractChainId === x.contractChainId
                  ? 'bg-black'
                  : 'hover:bg-black'
              }`}
              onClick={() => handleItemClick(x)}
            >
              <Image src={fantom} width={32} height={32} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TargetChain;
