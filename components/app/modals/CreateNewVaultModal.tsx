import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { ChainDeployment, SubChain, VaultInfo } from 'api';
import { ChainDeployments } from '../../Context';
import {
  Address,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { VaultV1Facet } from 'abiTypes/contracts/vault/v1/facet/VaultV1Facet.sol/VaultV1Facet';
import {
  AxelarQueryAPI,
  AxelarQueryAPIFeeResponse,
  Environment,
} from '@axelar-network/axelarjs-sdk';
import {
  bigIntToDecimalAdjustedString,
  getEvmChainId,
  mapEVMChainIdToChain,
} from '../../../utils';
import SelectTargetChain from '../utils/SelectTargetChain';

type Props = {
  nexusContractChainId: number;
  nexusAddress: Address;
  subchains: SubChain[];
  onClose: () => void;
};

const CreateNewVaultModal = ({
  nexusContractChainId,
  nexusAddress,
  subchains,
  onClose,
}: Props) => {
  const [vaultId, setVaultId] = useState<number | null>(null);
  const [targetChain, setTargetChain] = useState<ChainDeployment | null>(null);
  const [feeEstimation, setFeeEstimation] = useState<bigint | null>(null);
  const [error, setError] = useState<string | null>(null);

  const deployment = useContext(ChainDeployments);

  const sourceChain = deployment.chainDeployment.find(
    (x) => x.contractChainId == nexusContractChainId
  )!;
  const destionationChain = deployment.chainDeployment.find(
    (x) => x.contractChainId == targetChain?.contractChainId
  )!;

  const feeAsset = mapEVMChainIdToChain(sourceChain.evmChainId).nativeCurrency;

  const vaultIdAlreadyUsed = subchains
    .flatMap((subchain) =>
      subchain.vaults.map((vault) => {
        return { vaultInfo: vault, chainId: subchain.contractChainId };
      })
    )
    .some(
      (vault) =>
        vault.chainId == targetChain?.contractChainId &&
        vault.vaultInfo.vaultId == vaultId
    );

  useEffect(() => {
    if (vaultIdAlreadyUsed) {
      setError('Vault with that Id already exists on that chain');
    } else if (targetChain == null) {
      setError('Select a target chain');
    } else if (vaultId == null) {
      setError('Set a vault Id');
    } else if (vaultId < 1) {
      setError('Vault Id must be greater than 0');
    } else {
      setError(null);
    }
  }, [targetChain, vaultId]);

  useEffect(() => {
    setFeeEstimation(null);

    if (targetChain == null) {
      return;
    }
    if (nexusContractChainId == targetChain.contractChainId) {
      setFeeEstimation(BigInt(0));
      return;
    }

    const sdk = new AxelarQueryAPI({
      environment: process.env.NEXT_PUBLIC_TESTNET
        ? Environment.TESTNET
        : Environment.MAINNET,
    });

    sdk
      .estimateGasFee(
        sourceChain.chainName,
        destionationChain.chainName,
        mapEVMChainIdToChain(sourceChain.evmChainId).nativeCurrency.symbol,
        800_000,
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

  const createVaultWrite = usePrepareContractWrite({
    address: nexusAddress,
    abi: VaultV1Facet,
    functionName: 'createVaultV1',
    args: [targetChain?.contractChainId!, 1, vaultId!],
    value: feeEstimation ?? BigInt(0),
    enabled:
      !vaultIdAlreadyUsed &&
      vaultId != null &&
      targetChain != null &&
      feeEstimation != null,
  });

  const { write: createVaultAsync } = useContractWrite(createVaultWrite.config);

  function triggerCreateVault() {
    if (
      vaultIdAlreadyUsed ||
      targetChain === null ||
      vaultId == null ||
      vaultId < 1
    ) {
      return;
    }

    if (createVaultAsync == undefined) {
      setError('Call simulation failure');
      return;
    }

    try {
      createVaultAsync();
    } catch (error) {
      console.error('An error occurred while creating new vault:', error);
      setError((error as any).toString());
    }
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
        <h2 className="text-2xl font-bold mb-4">Create a Vault</h2>
        <SelectTargetChain
          handleTargetChain={(chainDeployment) =>
            setTargetChain(chainDeployment)
          }
        ></SelectTargetChain>
        <div>
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
            placeholder="Enter Vault ID"
            onChange={(e) => setVaultId(parseInt(e.target.value))}
          />
        </div>
        Bridging Fee:{' '}
        {targetChain == null || feeAsset == null
          ? 'Idle'
          : feeEstimation == null
          ? 'Estimation is running...'
          : bigIntToDecimalAdjustedString(
              feeEstimation,
              feeAsset.decimals
            )}{' '}
        {feeEstimation != null ? feeAsset?.symbol : ''}
        {error && (
          <p className="text-red-500 text-center font-mono font-bold">
            {error}
          </p>
        )}
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={triggerCreateVault}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewVaultModal;
