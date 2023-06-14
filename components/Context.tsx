import { createContext } from 'react';
import { ChainDeployment } from 'api';
import { Address } from 'wagmi';

export const ChainDeployments = createContext<{
  chainDeployment: ChainDeployment[];
}>({
  chainDeployment: [],
});

export const IOUToken = createContext<{
  IOUAddress: Address | null;
}>({
  IOUAddress: null,
});
