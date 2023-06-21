import React, { useState } from 'react';
import { Address, getAddress } from 'viem';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { BatchPaymentsV1Facet } from 'abiTypes/contracts/vault/v1/facet/BatchPaymentsV1Facet.sol/BatchPaymentsV1Facet';

type Props = {
  nexusContractChainId: number;
  nexusAddress: Address;
  onClose: () => void;
};

interface ChainBatchPayment {
  destinationChainId: number;
  transmitUsingGatewayId: number;
  gasFeeAmount: bigint;
  vaultPayments: VaultBatchPayment[];
}
interface VaultBatchPayment {
  vaultId: number;
  tokenPayments: TokenBatchPayment[];
}
interface TokenBatchPayment {
  tokenType: number;
  tokenIdentifier: string;
  payments: Payment[];
}
interface Payment {
  target: Address;
  amount: bigint;
}

const BatchPaymentModal = ({
  nexusContractChainId,
  nexusAddress,
  onClose,
}: Props) => {
  const [error, setError] = useState<string | null>(null);

  const [paymentsTable, setPaymentsTable] = useState<
    ChainBatchPayment[] | null
  >(null);

  function parsePaymentsTable(input: string) {
    const lines = input.split('\n');

    lines.map((line) => {
      const parts = line.split(',');

      return {
        targetChainId: parseInt(parts[0]),
        transmitUsingGatewayId: 1,
        vaultId: parseInt(parts[1]),
        tokenType: parseInt(parts[2]),
        tokenIdentifier: parts[3],
        target: getAddress(parts[4]),
        amount: BigInt(parts[5]),
      };
    });

    return [] as ChainBatchPayment[];
  }

  const batchPaymentsWriteConfig = usePrepareContractWrite({
    abi: BatchPaymentsV1Facet,
    address: nexusAddress,
    functionName: 'batchSendPayment',
    args: [paymentsTable!],
    enabled: paymentsTable != null,
    value: (paymentsTable ?? []).reduce(
      (prev, curr) => prev + curr.gasFeeAmount,
      BigInt(0)
    ),
  });
  const { writeAsync: sendBatchPaymentAsync } = useContractWrite(
    batchPaymentsWriteConfig.config
  );

  async function triggerBatchPayment() {
    await sendBatchPaymentAsync?.();
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 grid grid-cols-1 gap-4 min-w-[30%]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold">Paste Payment CSV</h2>
        <textarea
          className="bg-slate-200 p-2 rounded-md text-sm"
          onChange={(e) =>
            setPaymentsTable(parsePaymentsTable(e.target.value ?? null))
          }
        ></textarea>
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
            onClick={triggerBatchPayment}
          >
            Go to Overview
          </button>
        </div>{' '}
      </div>
    </div>
  );
};

export default BatchPaymentModal;
