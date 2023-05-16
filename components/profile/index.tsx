import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";

export function Profile() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const { address, connector, isConnected } = useAccount();
  const { chain, chains } = useNetwork();

  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <div className="flex flex-col">
          {address} is connected to {connector?.name}
          {chain && <div>Connected to {chain.name}</div>}
          {chains && (
            <div>Available chains: {chains.map((chain) => chain.name)}</div>
          )}
        </div>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }
  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && "(unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
}
