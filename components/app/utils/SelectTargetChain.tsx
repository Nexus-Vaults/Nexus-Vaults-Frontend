import React, { useContext, useEffect, useState } from 'react';
import { ChainDeployment } from 'api';
import { ChainDeployments } from '../../ContractsAddressesContext';

type Props = {
  handleTargetChain: (chainDeployment: ChainDeployment | undefined) => void;
};

const SelectTargetChain = ({ handleTargetChain }: Props) => {
  const [selectedItem, setSelectedItem] = useState<ChainDeployment>();
  const { chainDeployment: contractsAddresses } = useContext(ChainDeployments);

  useEffect(() => {
    handleTargetChain(selectedItem);
  }, [selectedItem]);

  const handleItemClick = (item: ChainDeployment) => {
    setSelectedItem(item);
  };

  return (
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
              <img src={`/images/chain/${x.evmChainId}.png`} width={64}></img>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectTargetChain;
