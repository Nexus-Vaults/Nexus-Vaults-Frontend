import '../styles/global.css';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode, useEffect } from 'react';
import type { NextPage } from 'next';
import '@rainbow-me/rainbowkit/styles.css';
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  polygon,
  fantom,
  polygonMumbai,
  moonbeam,
  hardhat,
} from 'wagmi/chains';
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
import { ChainDeployments } from './app/ContractsAddressesContext';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const defaultCains: Chain[] = process.env.NEXT_PUBLIC_TESTNET
  ? [polygonMumbai, hardhat]
  : [polygon, fantom, moonbeam];
const { chains, publicClient } = configureChains(defaultCains, [
  // @ts-ignore
  alchemyProvider({ apiKey: alchemyId }),
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

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const [ deployment, setDeployment ] = useState<ChainDeployment[]>([]);

  useEffect(() => {
    apiClient.getContractsAddresses()
    .then(deployment => {
      setDeployment(deployment);
      console.log(deployment);
    } );
  }, [])

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ChainDeployments.Provider value={deployment}>
          {(deployment.length > 0) ? getLayout(<Component {...pageProps} />) : 'Loading...'}
        </ChainDeployments.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
