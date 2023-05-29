import {
  polygon,
  moonbeam,
  hardhat,
  polygonMumbai,
  moonbaseAlpha,
} from 'wagmi/chains';
export abstract class ApiClient {
  abstract getCatalogAddress(): `0x${string}`;
  abstract getVaults(nexus: Nexus): [Vault];
  abstract getContracts(): ChainDeployment;
}

export type Chain = keyof typeof CHAIN_DEFINITIONS;

export const CHAIN_DEFINITIONS = {
  Hardhat: { id: 31337, name: 'HardHat', chain: hardhat },
  Moonbeam: { id: 1287, name: 'Moonbase Alpha', chain: moonbaseAlpha },
  Polygon: { id: 80001, name: 'Polygon Mumbai', chain: polygonMumbai },
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
    return process.env.NEXT_PUBLIC_CATALOG_ADD;
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
