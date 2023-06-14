import React, { useContext, useEffect, useState } from 'react';
import { ChainDeployment } from 'api';
import { ChainDeployments } from '../../Context';

type Props = {
  handleTargetChain: (chainDeployment: ChainDeployment | null) => void;
};

const SelectTargetChain = ({ handleTargetChain }: Props) => {
  const [selectedItem, setSelectedItem] = useState<ChainDeployment | null>(
    null
  );
  const { chainDeployment: contractsAddresses } = useContext(ChainDeployments);

  useEffect(() => {
    handleTargetChain(selectedItem);
  }, [selectedItem]);

  const handleItemClick = (item: ChainDeployment) => {
    setSelectedItem(item);
  };

  return (
    <div className="grid grid-cols-3 gap-8">
      {contractsAddresses.map((x, key) => (
        <div className=" flex flex-col" key={key}>
          <div
            className={`border p-2 rounded-2xl w-16 h-16 flex flex-col justify-center items-center ${
              selectedItem?.contractChainId === x.contractChainId
                ? 'bg-indigo-900'
                : 'hover:bg-indigo-900'
            }`}
            onClick={() => handleItemClick(x)}
          >
            <img src={`/images/chain/${x.evmChainId}.png`} width={64}></img>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectTargetChain;
