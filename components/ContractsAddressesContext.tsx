import { createContext } from 'react';
import { ChainDeployment } from 'api';

export const ChainDeployments = createContext<{
  chainDeployment: ChainDeployment[];
}>({
  chainDeployment: [],
});
