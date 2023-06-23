import React, { useState } from 'react';
import { Address, getAddress } from 'viem';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

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

    const decodedPayments = lines.map((line) => {
      const parts = line.split(',');

      try {
        return {
          targetChainId: parseInt(parts[0]),
          transmitUsingGatewayId: 1,
          vaultId: parseInt(parts[1]),
          tokenType: parseInt(parts[2]),
          tokenIdentifier: parts[3],
          target: getAddress(parts[4]),
          amount: BigInt(parts[5]),
        };
      } catch (error) {
        return null;
      }
    });

    if (decodedPayments.includes(null)) {
      setError('Invalid CSV format');
      return;
    }

    setError(null);

    const payments = decodedPayments
      .map((x) => x!)
      .reduce((acc, payment) => {
        const {
          targetChainId,
          vaultId,
          tokenType,
          tokenIdentifier,
          target,
          amount,
        } = payment;

        var chainBatch = acc.find(
          (x) => x.destinationChainId == targetChainId
        )!;
        if (chainBatch == null) {
          chainBatch = {
            destinationChainId: targetChainId,
            transmitUsingGatewayId: 1,
            gasFeeAmount: BigInt(0),
            vaultPayments: [],
          };
          acc.push(chainBatch);
        }

        var vaultBatch = chainBatch.vaultPayments.find(
          (x) => x.vaultId == vaultId
        )!;
        if (vaultBatch == null) {
          vaultBatch = {
            vaultId: vaultId,
            tokenPayments: [],
          };
          chainBatch.vaultPayments.push(vaultBatch);
        }

        var tokenBatch = vaultBatch.tokenPayments.find(
          (x) =>
            x.tokenType == tokenType && x.tokenIdentifier == tokenIdentifier
        )!;
        if (tokenBatch == null) {
          tokenBatch = {
            tokenType: tokenType,
            tokenIdentifier: tokenIdentifier,
            payments: [],
          };
          vaultBatch.tokenPayments.push(tokenBatch);
        }

        tokenBatch.payments.push({
          target: target,
          amount: amount,
        });

        return acc;
      }, [] as ChainBatchPayment[]);

    return payments;
  }

  const batchPaymentsWriteConfig = usePrepareContractWrite({
    abi: BatchPaymentsV1Facet,
    address: nexusAddress,
    functionName: 'batchSendV1',
    args: [null!],
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
        <p>Format: ChainId,VaultId,TokenType,TokenIdentifier,Target,Amount</p>
        <textarea
          className="bg-slate-200 p-2 rounded-md text-sm"
          onChange={
            (e) => setPaymentsTable(null) //parsePaymentsTable(e.target.value ?? null))
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
