import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useEffect } from 'react';
import { Chain as ChainType } from 'api';
import { useConnect, useNetwork, useSwitchNetwork } from 'wagmi';
import { CHAIN_DEFINITIONS } from 'api';

type Props = {
  targetChain: ChainType;
  handleConection: (b: boolean) => void;
};

const ConnectWallet = ({ targetChain, handleConection }: Props) => {
  const { chain } = useNetwork();
  const { error, switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    if (chain?.name.toLowerCase() == targetChain.toLowerCase()) {
      handleConection(true);
    } else handleConection(false);
  }, [chain]);

  return (
    <div className="flex flex-col flex-1 gap-2">
      <div className=" flex-1 flex flex-col p-5">
        <h2 className="font-normal text-4xl leading-12 text-center">
          Deploy Nexus
        </h2>
        <p className="text-center ">
          Before deploy the nexus make sure to connect the wallet to the target
          chain.
        </p>
      </div>
      <div className="flex-1 flex flex-col justify-center ">
        <div className="flex flex-row border-solid border-2 border-black rounded-md py-1 px-3 ">
          <p>Target Chain:</p>
          <p>{targetChain}</p>
        </div>
      </div>
      <div className=" flex flex-row justify-center">
        <ConnectButton />
      </div>
      <div className=" flex flex-row justify-center">
        {chain && <div>Connected to {chain.name}</div>}

        {chain?.name.toLowerCase() != targetChain.toLowerCase() && (
          <button
            className="text-white bg-[#0e76fd] h-[40px] shadow-lg rounded-xl   font-bold py-1 px-3 inline-block "
            onClick={() => switchNetwork?.(CHAIN_DEFINITIONS[targetChain].id)}
          >
            Connect to {targetChain}
          </button>
        )}

        <div>{error && error.message}</div>
      </div>
    </div>
  );
};

export default ConnectWallet;
