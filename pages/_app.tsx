import "../styles/global.css";
import { AppProps } from "next/app";
import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import { goerli, polygon } from "viem/chains";

/**
 * Configures the chains and providers to be used by the application. Add a new chain to the list to enable it [mainnet, ... ].
 */
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, goerli],
  [publicProvider()]
);

/**
 * Manages wallet connection state and configuration.
 * @param autoConnect Enables reconnecting to last used connector on mount.
 * @param connectors Connectors to be used by the application. Add a new connector to the list to enable it.
 * @param publicClient  Like the ethers providers - should be used to access block-chain info (transactions, block numbers, balance, etc…).
 * @param webSocketPublicClient WebSocketProvider: connects to a JSON-RPC API via a WebSocket.
 */
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
