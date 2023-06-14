import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { apiClient, ChainDeployment } from 'api';
import { ChainDeployments } from '../../Context';
import { Address, isAddress } from 'viem';
import SelectTargetChain from '../utils/SelectTargetChain';

type Props = {
  onClose: () => void;
};

const AccessNexusModal = ({ onClose }: Props) => {
  const [nexusAddress, setNexusAddress] = useState<Address | null>(null);
  const [chainDeployment, setChainDeployment] =
    useState<ChainDeployment | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const validAddress = nexusAddress != null && isAddress(nexusAddress);

  function handleAddressChange(event: any) {
    setNexusAddress(event.target.value);

    if (!isAddress(event.target.value)) {
      setError('Invalid address format');
    } else {
      setError(null);
    }
  }

  async function goToNexusOverview() {
    if (chainDeployment == null) {
      setError('No chain selected');
      return;
    }

    if (!validAddress) {
      return;
    }

    const response = await apiClient.getNexusExistence(
      chainDeployment.contractChainId,
      nexusAddress
    );

    if (!response) {
      setError('Nexus not found');
      return;
    }

    router.push(
      '/app/chain/' +
        chainDeployment.contractChainId +
        '/nexus/' +
        nexusAddress +
        '/'
    );
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 grid grid-cols-1 gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold">Enter the Nexus Information</h2>

        <div>
          <label className="font-bold text-sm">
            Which chain is the nexus on?
          </label>
          <SelectTargetChain
            handleTargetChain={(deployment) => setChainDeployment(deployment)}
          ></SelectTargetChain>
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Nexus Address
          </label>
          <input
            className="border rounded-md py-2 px-3 w-full"
            id="address"
            type="text"
            placeholder="Enter Address"
            onChange={handleAddressChange}
          />
        </div>

        {error != null && (
          <p className="text-red-600 text-center font-mono font-bold">
            {error}
          </p>
        )}

        <div className="flex justify-between font-bold text-white">
          <button
            className="bg-red-500 py-2 px-4 rounded-md hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={goToNexusOverview}
          >
            Go to Overview
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessNexusModal;
