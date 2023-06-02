import React, { useContext, useEffect, useState } from 'react';
import { ChainDeployment } from 'api';
import { ChainDeployments } from '../../ContractsAddressesContext';

import fantom from '../../../public/images/chain/4002.png';

type Props = {
  handleTargetChain: (chainDeployment: ChainDeployment | undefined) => void;
};

const TargetChain = ({ handleTargetChain }: Props) => {
  const [selectedItem, setSelectedItem] = useState<ChainDeployment>();

  const { chainDeployment: contractsAddresses } = useContext(ChainDeployments);

  useEffect(() => {
    handleTargetChain(selectedItem);
  }, [selectedItem]);

  const handleItemClick = (item: ChainDeployment) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex flex-col   p-5 gap-y-10">
      <div className="flex flex-col p-5 gap-2">
        <h2 className="text-indigo-900 font-semibold font-mono text-4xl leading-12 text-center ">
          Choose your target chain
        </h2>
        <div className="flex flex-row justify-center">
          <div className="w-[100%] h-[1px] bg-gray-300"></div>
        </div>
        <p className="text-center font-serif">
          This chain is going to reflect where your nexus base is going to be.
        </p>
      </div>
      <div className="flex flex-row justify-center gap-4">
        <div className="flex flex-row justify-center gap-4">
          {contractsAddresses.map((x, key) => {
            return (
              <div
                className="flex flex-row  flex-wrap justify-center gap-6 p-2"
                key={key}
              >
                <div
                  className={`border p-2 rounded-2xl ${
                    selectedItem?.contractChainId === x.contractChainId
                      ? 'bg-indigo-900'
                      : 'hover:bg-indigo-900'
                  }`}
                  onClick={() => handleItemClick(x)}
                >
                  <img
                    src={`../images/chain/${x.evmChainId}.png`}
                    width={64}
                  ></img>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TargetChain;
