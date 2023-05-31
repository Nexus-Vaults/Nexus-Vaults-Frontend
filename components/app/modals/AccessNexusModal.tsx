import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { apiClient } from 'api';
import { ChainDeployments } from '../../../pages/app/ContractsAddressesContext';

type Props = {
  onClose: () => void;
};

const AccessNexusModal = ({ onClose }: Props) => {
  const [chainId, setChainId] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const contractsAddresses = useContext(ChainDeployments);

  const router = useRouter();

  const handleBackgroundClick = (event: any) => {
    onClose();
  };

  const handleInnerClick = (event: any) => {
    event.stopPropagation();
  };

  const handleChainIdChange = (event: any) => {
    setChainId(event.target.value);
  };

  const handleAddressChange = (event: any) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (chainId.trim() === '') {
      setError('Chain ID cannot be empty');
      return;
    }

    if (address.trim() === '') {
      setError('Address cannot be empty');
      return;
    }

    try {
      const response = await fetch(`/app/${chainId}/${address}`);
      if (response.ok) {
        console.log('URL exists');
        router.push(`/app/${chainId}/${address}`);
      } else {
        setError('URL does not exist');
        return;
      }
    } catch (error) {
      console.error('An error occurred while checking URL existence:', error);
    }

    setChainId('');
    setAddress('');
    setError('');
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-lg p-6" onClick={handleInnerClick}>
        <h2 className="text-2xl font-bold mb-4">Enter the Nexus Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="chainId"
            >
              Chain ID:
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full"
              id="chainId"
              type="text"
              placeholder="Enter Chain ID"
              onChange={handleChainIdChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address:
            </label>
            <input
              className="border rounded-md py-2 px-3 w-full"
              id="address"
              type="text"
              placeholder="Enter Address"
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

export default AccessNexusModal;
