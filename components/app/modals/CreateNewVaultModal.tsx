import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { ChainDeployment, apiClient } from 'api';
import { ChainDeployments } from '../../../pages/app/ContractsAddressesContext';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { NexusFactory } from 'abiTypes/contracts/nexus/NexusFactory.sol/NexusFactory';
import { VaultV1Facet } from 'abiTypes/contracts/vault/v1/facet/VaultV1Facet.sol/VaultV1Facet';

type Props = {
  onClose: () => void;
};

const CreateNewVaultModal = ({ onClose }: Props) => {
  const [vaultId, setVaultId] = useState<number>();
  const [selectedItem, setSelectedItem] = useState<ChainDeployment>();

  const { config: configNexus, error: errorName } = usePrepareContractWrite({
    address: '0x3F564D53550B86e41840b1D0135790D3BeEedA1f',
    abi: VaultV1Facet,
    functionName: 'createVaultV1',
    args: [selectedItem?.contractChainId!, 1, vaultId!],
    value: BigInt(0),
  });

  console.log(errorName);

  const { write: writeNexus, data: dataNexus } = useContractWrite(configNexus);
  const transaction = useWaitForTransaction({ hash: dataNexus?.hash });

  const [error, setError] = useState('');

  const { chainDeployment: contractsAddresses } = useContext(ChainDeployments);

  const handleItemClick = (item: ChainDeployment) => {
    setSelectedItem(item);
  };

  const router = useRouter();

  const handleBackgroundClick = (event: any) => {
    onClose();
  };

  const handleInnerClick = (event: any) => {
    event.stopPropagation();
  };

  const handleAddressChange = (event: any) => {
    setVaultId(event.target.value);
    setError(event.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (selectedItem === undefined) {
      setError('Chain ID cannot be empty');
      return;
    }

    if (vaultId === 0) {
      setError('Vault ID cannot be empty');
      return;
    }
    try {
      writeNexus?.();
      setSelectedItem(undefined);
      setError('');
      setError('');
    } catch (error) {
      console.error('An error occurred while creating new vault:', error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-lg p-6" onClick={handleInnerClick}>
        <h2 className="text-2xl font-bold mb-4">Enter the Nexus Information</h2>
        <form onSubmit={handleSubmit}>
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

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Vault ID:
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full"
              id="address"
              type="number"
              value={vaultId}
              placeholder="Enter Vault ID"
              onChange={handleAddressChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              type="submit"
            >
              Submit
            </button>
          </div>
          {error && (
            <p className="text-red text-center pt-10 font-mono font-bold">
              {error}
            </p>
          )}
        </form>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateNewVaultModal;
