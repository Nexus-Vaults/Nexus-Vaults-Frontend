import { polygon, moonbeam, localhost } from 'wagmi/chains';
export abstract class ApiClient {
  abstract getCatalogAddress(): `0x${string}`;
  abstract getVaults(nexus: Nexus): [Vault];
  abstract getContracts(): ChainDeployment;
}

export type Chain = keyof typeof CHAIN_DEFINITIONS;

export const CHAIN_DEFINITIONS = {
  Localhost: { id: 1337, name: 'localhost', chain: localhost },
  Moonbeam: { id: 1, name: 'moonbeam', chain: moonbeam },
  Polygon: { id: 1, name: 'polygon', chain: polygon },
  Ethereum: { id: 1, name: 'polygon', chain: polygon },
  Ada: { id: 1, name: 'polygon', chain: polygon },
  Binance: { id: 1, name: 'polygon', chain: polygon },
  Bitcoin: { id: 1, name: 'polygon', chain: polygon },
  USDT: { id: 1, name: 'polygon', chain: polygon },
} as const;
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

interface ChainDeployment {
  gatewayAddress: `0x${string}`;
}

class ApiClientMock extends ApiClient {
  getCatalogAddress(): `0x${string}` {
    // @ts-ignore
    return undefined;
  }

  getVaults(nexus: Nexus): [Vault] {
    return [
      {
        balances: [{ token: '', total: 0, liquid: 0 }],
        address: '0x000',
        chain: nexus.chain,
      },
    ];
  }

  getContracts(): ChainDeployment {
    return { gatewayAddress: '0x000' };
  }
}

export const apiClient: ApiClient = new ApiClientMock();
