import React, { useContext, useEffect, useState } from 'react';
import SelectTargetChain from '../utils/SelectTargetChain';
import { ChainDeployment, TokenInfoDTO, VaultAssetBalanceDTO } from 'api';
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { VaultV1Facet } from 'abiTypes/contracts/vault/v1/facet/VaultV1Facet.sol/VaultV1Facet';
import { getAddress, isAddress, parseEther } from 'viem';
import { apiClient } from 'api';
import {
  AxelarQueryAPI,
  AxelarQueryAPIFeeResponse,
  Environment,
} from '@axelar-network/axelarjs-sdk';
import { ChainDeployments } from '../../Context';
import { mapEVMChainIdToChain } from '../../../utils';

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
  const [sourceVaultId, setSourceVaultId] = useState<number | null>(null);
  const [targetAddress, setTargetAddress] = useState<string | null>(null);
  const [amount, setAmount] = useState<bigint>(BigInt(0));

  const [feeEstimation, setFeeEstimation] = useState<bigint | null>(null);
  const [vaultBalances, setVaultBalances] = useState<
    VaultAssetBalanceDTO[] | null
  >(null);

  const deployment = useContext(ChainDeployments);

  const handleBackgroundClick = (event: any) => {
    onClose();
  };

  const handleInnerClick = (event: any) => {
    event.stopPropagation();
  };

  useEffect(() => {
    apiClient
      .getVaultAssetBalances(
        nexusContractChainId,
        nexusAddress,
        assetContractChainId,
        tokenInfo.tokenType,
        tokenInfo.tokenIdentifier
      )
      .then((balances) => setVaultBalances(balances));
  }, []);

  useEffect(() => {
    if (targetChain == null) {
      setFeeEstimation(null);
      return;
    }
    if (
      assetContractChainId == nexusContractChainId &&
      targetChain.contractChainId == nexusContractChainId
    ) {
      setFeeEstimation(BigInt(0));
      return;
    }

    const sdk = new AxelarQueryAPI({
      environment: process.env.NEXT_PUBLIC_TESTNET
        ? Environment.TESTNET
        : Environment.MAINNET,
    });

    const sourceChain = deployment.chainDeployment.find(
      (x) => x.contractChainId == nexusContractChainId
    )!;

    sdk
      .estimateGasFee(
        sourceChain.chainName,
        targetChain.chainName,
        mapEVMChainIdToChain(sourceChain.evmChainId).nativeCurrency.symbol,
        1_100_000,
        1.2,
        undefined,
        {
          showDetailedFees: true,
          destinationContractAddress: undefined!,
          sourceContractAddress: undefined!,
          tokenSymbol: undefined!,
        }
      )
      .then((resp) => {
        const response = resp as AxelarQueryAPIFeeResponse;
        const fee =
          BigInt(response.baseFee) +
          BigInt(response.executionFeeWithMultiplier);

        setFeeEstimation(fee);
      });
  }, [targetChain]);

  const sendPaymentWrite = usePrepareContractWrite({
    address: nexusAddress,
    abi: VaultV1Facet,
    functionName: 'sendPayment',
    args: [
      assetContractChainId,
      1,
      sourceVaultId!,
      tokenInfo.tokenType,
      tokenInfo.tokenIdentifier,
      isAddress(targetAddress ?? '') ? getAddress(targetAddress!) : null!,
      amount,
    ],
    value: feeEstimation ?? BigInt(0),
    enabled:
      feeEstimation != null &&
      targetChain?.contractChainId == assetContractChainId,
  });
  const { writeAsync: sendPaymentAsync } = useContractWrite(
    sendPaymentWrite.config
  );

  const mintIOTTokensWrite = usePrepareContractWrite({
    address: nexusAddress,
    abi: VaultV1Facet,
    functionName: 'bridgeOut',
    args: [
      assetContractChainId,
      1,
      sourceVaultId!,
      tokenInfo.tokenType,
      tokenInfo.tokenIdentifier,
      1,
      targetChain?.contractChainId!,
      targetAddress!,
      amount,
    ],
    value: feeEstimation ?? BigInt(0),
    enabled:
      feeEstimation != null &&
      targetChain != null &&
      targetChain.contractChainId != assetContractChainId,
  });

  const { writeAsync: mintIOUTokensAsync } = useContractWrite(
    mintIOTTokensWrite.config
  );

  async function triggerPayment() {
    if (
      targetChain == null ||
      targetAddress == null ||
      amount == BigInt(0) ||
      sourceVaultId == null
    ) {
      return;
    }

    if (targetChain.contractChainId == assetContractChainId) {
      console.log('Triggering payment');
      await sendPaymentAsync?.();
    } else {
      console.log('Triggering mint');
      await mintIOUTokensAsync?.();
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
            htmlFor="from-vault"
          >
            Source Vault Id
          </label>
          <select
            id="from-vault"
            className="block text-gray-700 text-sm font-bold mb-2 rounded-lg p-2 w-full border-gray-300 border"
            onChange={(x) =>
              setSourceVaultId(
                x.target.value == '' ? null : parseInt(x.target.value)
              )
            }
          >
            <option value={''}>-</option>
            {vaultBalances?.map((x) => (
              <option key={x.vaultInfo.vault} value={x.vaultInfo.vaultId}>
                {x.vaultInfo.vaultId}
              </option>
            ))}
          </select>
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
            placeholder="Enter address"
            onChange={(x) => setTargetAddress(x.target.value)}
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
