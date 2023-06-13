import { createContext } from 'react';
import { ChainDeployment } from 'api';

export const ChainDeployments = createContext<{
  chainDeployment: ChainDeployment[];
  contractChainId?: number | null;
  nexusAddress?: `0x${string}` | null;
  updatedChainId: (nr: number) => void;
  updatedAddress: (add: `0x${string}`) => void;
}>({
  chainDeployment: [],
  contractChainId: null,
  nexusAddress: null,
  updatedAddress: () => {},
  updatedChainId: () => {},
});
