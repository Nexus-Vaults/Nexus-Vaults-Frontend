import { createContext } from 'react';
import { ChainDeployment } from 'api';

export const ChainDeployments = createContext<{
  chainDeployment: ChainDeployment[];
  chainId?: number | null;
  address?: `0x${string}` | null;
  updatedChainId: (nr: number) => void;
  updatedAddress: (add: `0x${string}`) => void;
}>({
  chainDeployment: [],
  chainId: null,
  address: null,
  updatedAddress: () => {},
  updatedChainId: () => {},
});
