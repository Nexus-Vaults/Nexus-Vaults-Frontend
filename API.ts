import { Address } from 'wagmi';

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
  balances: TokenBalanceDTO[];
  acceptedGatewayIds: number[];
}

export interface TokenInfoDTO {
  tokenType: number;
  tokenIdentifier: string;
}

export interface TokenBalanceDTO {
  token: TokenInfoDTO;
  balance: number;
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
      throw new Error(`API Request failed, error code ${response.status}`);
    }

    const json = await response.json();
    return json.deployments as Vault;
  }

  async getFeatures(
    chainId: number,
    address: `0x${string}`
  ): Promise<Feature[]> {
    const response = await fetch(
      `/api/chains/${chainId}/catalogs/${address}/features`
    );

    if (!response.ok) {
      throw new Error(`API Request failed, error code ${response.status}`);
    }

    const json = await response.json();
    const features = json.features as Feature[];

    return features.map((x) => {
      return {
        ...x,
        catalogAddress: address,
      };
    });
  }

  async getContractsAddresses(): Promise<ChainDeployment[]> {
    const response = await fetch('/api/deployments');

    if (!response.ok) {
      throw new Error(`API Request failed, error code ${response.status}`);
    }

    const result = await response.json();
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
      throw new Error(`API Request failed, error code ${response.status}`);
    }

    const json = await response.json();
    return json as Nexus;
  }

  async getVaultAssetBalances(
    contractChainId: number,
    nexusAddress: Address,
    subchainContractChainId: number,
    tokenType: number,
    tokenIdentifier: string
  ) {
    const response = await fetch(
      `/api/Chains/${contractChainId}/Nexuses/${nexusAddress}/Subchains/${subchainContractChainId}/Assets/${tokenType}/${
        tokenIdentifier.length == 0 ? '%20' : tokenIdentifier
      }/VaultBalances`
    );

    if (!response.ok) {
      throw new Error(`API Request failed, error code ${response.status}`);
    }

    const json = await response.json();
    return json as Nexus;
  }
}

export const apiClient: ApiClient = new ApiClientMock();
