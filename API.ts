import { Address } from 'wagmi';

export abstract class ApiClient {
  abstract getFeatures(
    chainId: number,
    catalogAddress: Address
  ): Promise<Feature[]>;
  abstract getContractsAddresses(): Promise<ChainDeployment[]>;
  abstract getNexusOverview(
    contractChainId: number,
    nexusAddress: Address
  ): Promise<Nexus>;
  abstract getVaultOverview(
    nexusContractChainId: number,
    nexusAddress: Address,
    vaultContractChainId: number,
    vaultId: Address
  ): Promise<Vault>;
  abstract getVaultAssetBalances(
    contractChainId: number,
    nexusAddress: Address,
    subchainContractChainId: number,
    tokenType: number,
    tokenIdentifier: string
  ): Promise<VaultAssetBalanceDTO[]>;
  abstract getNexusExistence(
    contractChainId: number,
    nexusAddress: Address
  ): Promise<boolean>;
}

interface TokenBalance {
  token: string;
  total: number;
  liquid: number;
}

export interface Vault {
  balances: [TokenBalance];
  address: Address;
}

export interface VaultInfo {
  vault: Address;
  vaultId: number;
}

export interface Nexus {
  nexusId: Address;
  name: string;
  owner: Address;
  subchains: SubChain[];
  hasLoupeFacet: boolean;
  facetAddresses: string[];
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
  nexusFactoryAddress: Address;
  publicCatalogAddress: Address;
}

export interface VaultAssetBalanceDTO {
  vaultInfo: VaultInfo;
  tokenInfo: TokenInfoDTO;
  balance: bigint;
}

export interface Feature {
  name: string;
  address: Address;
  description: string;
  feeTokenSymbol: string;
  feeTokenAddress: Address;
  feeTokenAmount: number;
  isBasic: boolean;
  catalogAddress: Address;
}

class ApiClientMock extends ApiClient {
  async getVaultOverview(
    nexusContractChainId: number,
    nexusAddress: Address,
    vaultContractChainId: number,
    vaultId: Address
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

  async getFeatures(chainId: number, address: Address): Promise<Feature[]> {
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
    nexusAddress: Address
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

  async getNexusExistence(
    contractChainId: number,
    nexusAddress: Address
  ): Promise<boolean> {
    const response = await fetch(
      `/api/Chains/${contractChainId}/Nexuses/${nexusAddress}/Exists`
    );

    if (!response.ok) {
      throw new Error(`API Request failed, error code ${response.status}`);
    }

    const json = await response.json();
    return json.exists as boolean;
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
    return json.vaultBalances as VaultAssetBalanceDTO[];
  }
}

export const apiClient: ApiClient = new ApiClientMock();
