import React, { useState } from 'react';
import SelectTargetChain from '../utils/SelectTargetChain';
import { ChainDeployment, TokenInfoDTO } from 'api';
import { Address, usePrepareContractWrite } from 'wagmi';
import { VaultV1Facet } from 'abiTypes/contracts/vault/v1/facet/VaultV1Facet.sol/VaultV1Facet';
import { parseEther } from 'viem';

type Props = {
  nexusContractChainId: number;
  nexusAddress: Address;
  assetContractChainId: number;
  tokenInfo: TokenInfoDTO;
  onClose: () => void;
};

const SendPaymentModal = ({
  nexusContractChainId,
  nexusAddress,
  assetContractChainId,
  tokenInfo,
  onClose,
}: Props) => {
  const [targetChain, setTargetChain] = useState<ChainDeployment | null>(null);
  const [targetAddress, setTargetAddress] = useState<Address | null>(null);
  const [amount, setAmount] = useState<bigint>(BigInt(0));

  const handleBackgroundClick = (event: any) => {
    onClose();
  };

  const handleInnerClick = (event: any) => {
    event.stopPropagation();
  };

  usePrepareContractWrite({
    address: nexusAddress,
    abi: VaultV1Facet,
    functionName: 'sendPayment',
    args: [
      assetContractChainId,
      1,
      1,
      tokenInfo.tokenType,
      tokenInfo.tokenIdentifier,
      targetAddress!,
      amount,
    ],
    value: BigInt(0),
  });

  usePrepareContractWrite({
    address: nexusAddress,
    abi: VaultV1Facet,
    functionName: 'bridgeOut',
    args: [
      assetContractChainId,
      1,
      1,
      tokenInfo.tokenType,
      tokenInfo.tokenIdentifier,
      targetChain?.contractChainId!,
      '0x',
      targetAddress!,
      amount,
    ],
    value: BigInt(0),
  });

  async function triggerPayment() {
    if (targetChain == null || targetAddress == null || amount == BigInt(0)) {
      return;
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-lg p-6 w-80" onClick={handleInnerClick}>
        <h2 className="text-xl font-bold mb-4">Send Modal</h2>
        <SelectTargetChain
          handleTargetChain={(x) => setTargetChain(x)}
        ></SelectTargetChain>
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
            placeholder="Enter address"
            value={''}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="amount"
          >
            Amount:
          </label>
          <input
            className="border rounded-md py-2 px-3 w-full"
            id="amount"
            type="number"
            placeholder="Enter amount"
            min={0}
            defaultValue={0}
            onChange={(x) => setAmount(parseEther(x.target.value as any))}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={triggerPayment}
          >
            Sent
          </button>
        </div>

        <button
          className="absolute top-2 right-2 text-white hover:text-gray-200"
          onClick={onClose}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SendPaymentModal;
