declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_TESTNET: boolean;
    readonly NEXT_PUBLIC_PROJECT_ID: string;
    readonly NEXT_PUBLIC_ALCHEMY_ID: string;
    readonly NEXT_PUBLIC_APP_NAME: string;
    readonly NEXT_PUBLIC_NEXUS_FACTORY_ADD: `0x${string}`;
    readonly NEXT_PUBLIC_NEXUS_GATEWAY_ADD: `0x${string}`;
    readonly NEXT_PUBLIC_VAULT_CONTROLLER_ADD: `0x${string}`;
    readonly NEXT_PUBLIC_CATALOG_ADD: `0x${string}`;
  }
}
