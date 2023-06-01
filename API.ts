export abstract class ApiClient {
  abstract getFeatures(
    chainId: number,
    catalogAddress: `0x${string}`
  ): Promise<Feature[]>;
  abstract getContractsAddresses(): Promise<ChainDeployment[]>;
  abstract getNexusOverview(
    contractChainId: number,
    nexusAddress: `0x${string}`
  ): Promise<Nexus>;
  abstract getVaultOverview(
    nexusContractChainId: number,
    nexusAddress: `0x${string}`,
    vaultContractChainId: number,
    vaultId: `0x${string}`
  ): Promise<Vault>;
}

interface TokenBalance {
  token: string;
  total: number;
  liquid: number;
}

export interface Vault {
  balances: [TokenBalance];
  address: `0x${string}`;
}

export interface VaultInfo {
  address: `0x${string}`;
  vaultId: number;
}

export interface Nexus {
  nexusId: `0x${string}`;
  name: string;
  owner: `0x${string}`;
  subchains: SubChain[];
}

export interface SubChain {
  contractChainId: number;
  vaults: VaultInfo[];
  acceptedGatewayIds: number[];
}

export interface ChainDeployment {
  chainName: string;
  evmChainId: number;
  contractChainId: number;
  nexusFactoryAddress: `0x${string}`;
  publicCatalogAddress: `0x${string}`;
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
  async getVaultOverview(
    nexusContractChainId: number,
    nexusAddress: `0x${string}`,
    vaultContractChainId: number,
    vaultId: `0x${string}`
  ): Promise<Vault> {
    const response = await fetch(
      `/api/chains/${nexusContractChainId}/${nexusAddress}/Subchains/${vaultContractChainId}/Vaults/${vaultId}`
    );

    if (!response.ok) {
      throw new Error('no response from api/chains/x/x/Features');
    }
    const jason = await response.json();
    // TODO change object
    if (jason.deployments == undefined) {
      throw new Error('Could not find chains');
    }
    return jason.deployments as Vault;
  }

  async getFeatures(
    chainId: number,
    address: `0x${string}`
  ): Promise<Feature[]> {
    const response = await fetch(
      `/api/chains/${chainId}/catalogs/${address}/features`
    );

    if (!response.ok) {
      throw new Error('no response from api/chains/x/x/Features');
    }
    const json = await response.json();
    // TODO change object
    if (json.features == undefined) {
      throw new Error('Could not find chains');
    }
    
    const features = json.features as [Feature];

    return features.map(x => {
      return {
        ...x,
        catalogAddress: address,
      };
    })
  }

  async getContractsAddresses(): Promise<ChainDeployment[]> {
    const response = await fetch('/api/deployments');

    if (!response.ok) {
      throw new Error('no response from api/deployments');
    }
    const result = await response.json();
    if (result.deployments == undefined) {
      throw new Error('Could not find deployments');
    }
    return result.deployments as ChainDeployment[];
  }

  async getNexusOverview(
    contractChainId: number,
    nexusAddress: `0x${string}`
  ): Promise<Nexus> {
    const response = await fetch(
      `/api/Chains/${contractChainId}/Nexuses/${nexusAddress}`
    );

    if (!response.ok) {
      throw new Error('no response from api/chains/x/x/Features');
    }
    const jason = await response.json();
    // TODO change object
    return jason as Nexus;
  }
}

export const apiClient: ApiClient = new ApiClientMock();
