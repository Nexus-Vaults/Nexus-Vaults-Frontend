export abstract class ApiClient {
  abstract getCatalogAddress(): `0x${string}`;
  abstract getVaults(nexus: Nexus): [Vault];
  abstract getContracts(): ChainDeployment;
}

export enum Chain {
  lol,
  elias,
  stinkt,
}
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
        balances: [{ token: "", total: 0, liquid: 0 }],
        address: "0x000",
        chain: Chain.lol,
      },
    ];
  }

  getContracts(): ChainDeployment {
    return { gatewayAddress: "0x000" };
  }
}

export const apiClient: ApiClient = new ApiClientMock();
