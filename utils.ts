import * as supportedChains from 'wagmi/chains';
import { ChainDeployment } from 'api';

export function mapEVMChainIdToChain(evmChainId: number) {
  for (const chain of Object.values(supportedChains)) {
    if ('id' in chain) {
      if (chain.id === evmChainId) {
        return chain;
      }
    }
  }

  throw 'Unsupported Chain';
}
export function getEvmChainId(
  chainDeployment: ChainDeployment[],
  contractChainId: number
): number {
  return chainDeployment.find((x) => x.contractChainId === contractChainId)
    ?.evmChainId as number;
}
