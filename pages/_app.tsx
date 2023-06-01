import '../styles/global.css';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode, useEffect } from 'react';
import type { NextPage } from 'next';
import '@rainbow-me/rainbowkit/styles.css';
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  Config,
  configureChains,
  createConfig,
  PublicClient,
  WagmiConfig,
  WebSocketPublicClient,
} from 'wagmi';
import * as supportedChains from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { Chain } from '@wagmi/chains';
import {
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  phantomWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { apiClient, ChainDeployment } from 'api';
import React, { useContext, useState } from 'react';
import { ChainDeployments } from '../components/ContractsAddressesContext';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

function mapEVMChainIdToChain(evmChainId: number) {
  for (const chain of Object.values(supportedChains)) {
    if ('id' in chain) {
      if (chain.id === evmChainId) {
        return chain;
      }
    }
  }

  throw 'Unsupported Chain';
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const [deployment, setDeployment] = useState<ChainDeployment[]>([]);
  const [address, setAddress] = useState<`0x${string}`>();
  const [chainId, setChainId] = useState<number>();

  const handleAddress = (add: `0x${string}`) => {
    setAddress(add);
  };

  const handleChainId = (nr: number) => {
    setChainId(nr);
  };

  const [wagmiConfig, setWagmiConfig] =
    useState<Config<PublicClient, WebSocketPublicClient>>();

  useEffect(() => {
    apiClient.getContractsAddresses().then((deployment) => {
      setDeployment(deployment);

      const defaultCains: Chain[] = deployment.map((x) =>
        mapEVMChainIdToChain(x.evmChainId)
      );

      const { chains, publicClient } = configureChains(defaultCains, [
        // @ts-ignore
        // alchemyProvider({ apiKey: alchemyId }),
        publicProvider(),
      ]);

      const connectors = connectorsForWallets([
        {
          groupName: 'Recommended',
          wallets: [
            injectedWallet({ chains }),
            rainbowWallet({ projectId, chains }),
            walletConnectWallet({ projectId, chains }),
            metaMaskWallet({ projectId, chains }),
            ledgerWallet({ projectId, chains }),
            phantomWallet({ chains }),
            safeWallet({ chains }),
          ],
        },
      ]);

      const config = createConfig({
        autoConnect: true,
        connectors,
        publicClient,
      });

      setWagmiConfig(config as any);
    });
  }, []);

  return (
    <>
      {wagmiConfig == undefined ? (
        'Loading...'
      ) : (
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            modalSize="compact"
            chains={deployment.map((x) => mapEVMChainIdToChain(x.evmChainId))}
          >
            <ChainDeployments.Provider
              value={{
                chainDeployment: deployment,
                updatedAddress: handleAddress,
                chainId,
                address,
                updatedChainId: handleChainId,
              }}
            >
              {getLayout(<Component {...pageProps} />)}
            </ChainDeployments.Provider>
          </RainbowKitProvider>
        </WagmiConfig>
      )}
    </>
  );
}
