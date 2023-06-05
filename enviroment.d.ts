declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_TESTNET: boolean;
    readonly NEXT_PUBLIC_PROJECT_ID: string;
    readonly NEXT_PUBLIC_ALCHEMY_ID: string;
  }
}
