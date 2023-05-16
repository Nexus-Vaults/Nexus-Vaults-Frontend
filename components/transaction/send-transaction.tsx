import * as React from "react";
import { useDebounce } from "use-debounce";
import { parseEther } from "viem";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";

export function SendTransaction() {
  const [to, setTo] = React.useState("");

  const [amount, setAmount] = React.useState<number>(0);

  const { config } = usePrepareSendTransaction({
    to: to,
    value: amount ? parseEther(amount as any) : undefined,
  });

  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendTransaction?.();
      }}
    >
      <input
        aria-label="Recipient"
        onChange={(e) => setTo(e.target.value)}
        value={to}
        placeholder="0xA0Cf…251e"
      />
      <input
        aria-label="Amount (ether)"
        onChange={(e) => setAmount(e.target.value as any)}
        value={amount}
        placeholder="0.05"
      />
      <button disabled={isLoading || !sendTransaction || !to || !amount}>
        {isLoading ? "Sending..." : "Send"}
      </button>
      {isSuccess && (
        <div>
          Successfully sent {amount} ether to {to}
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </form>
  );
}
