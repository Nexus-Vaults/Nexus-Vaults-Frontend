import { hardhat, polygonMumbai, moonbaseAlpha } from 'wagmi/chains';
export abstract class ApiClient {
  abstract getFeatures(
    chainId: number,
    catalogAddress: `0x${string}`
  ): Feature[];
  abstract getVaults(nexus: Nexus): [Vault];
  abstract getContractsAddresses(): ChainDeployment[];
}

export type Chain = number;

interface TokenBalance {
  token: string;
  total: number;
  liquid: number;
}

interface Vault {
  balances: [TokenBalance];
  address: `0x${string}`;
  chain: Chain;
}

interface Nexus {
  name: string;
  address: `0x${string}`;
  chain: Chain;
}

export interface ChainDeployment {
  chainName: string;
  evmChainId: number;
  contractChainId: number;
  nexusFactoryAddress: `0x${string}`;
  publicCatalogAddress: [`0x${string}`];
}

export interface Feature {
  name: string;
  address: `0x${string}`;
  description: string;
  feeTokenSymbol: string;
  feeTokenAddress: `0x${string}`;
  feeTokenAmount: number;
  isBasic: boolean;
  catalogAddress: `0x${string}`;
}

class ApiClientMock extends ApiClient {
  getVaults(nexus: Nexus): [Vault] {
    return [
      {
        balances: [{ token: '', total: 0, liquid: 0 }],
        address: '0x000',
        chain: nexus.chain,
      },
    ];
  }

  getFeatures(chainId: number, address: `0x${string}`): Feature[] {
    return [
      {
        name: 'Card 1',
        address: '0x000',
        description: 'Description of Card 1',
        feeTokenAddress: '0x00',
        feeTokenSymbol: 'usdt',
        feeTokenAmount: 5,
        isBasic: true,
        catalogAddress: address,
      },
      {
        name: 'Card 1',
        address: '0x000',
        description: 'Description of Card 1',
        feeTokenAddress: '0x00',
        feeTokenSymbol: 'usdt',
        feeTokenAmount: 5,
        isBasic: false,
        catalogAddress: address,
      },
    ];
  }

  getContractsAddresses(): ChainDeployment[] {
    return [
      {
        chainName: 'bnb',
        evmChainId: 4,
        contractChainId: 3,
        nexusFactoryAddress: '0x0000',
        publicCatalogAddress: ['0x0000'],
      },
    ];
  }
}

export const apiClient: ApiClient = new ApiClientMock();
