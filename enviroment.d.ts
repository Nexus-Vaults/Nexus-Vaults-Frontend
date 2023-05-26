declare namespace NodeJS {
  export interface ProcessEnv {
    readonly TESTNET: boolean;
    readonly PROJECT_ID: string;
    readonly ALCHEMY_ID: string;
    readonly APP_NAME: string;
    readonly CONTRACTADD: `0x${string}`;
    readonly CATALOGADD: `0x${string}`;
  }
}
