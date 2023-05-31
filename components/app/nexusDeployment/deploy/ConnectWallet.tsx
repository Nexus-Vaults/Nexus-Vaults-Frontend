import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useEffect } from 'react';
import { ChainDeployment } from 'api';
import { useNetwork, useSwitchNetwork } from 'wagmi';

type Props = {
  targetChain: ChainDeployment;
  handleConection: (b: boolean) => void;
};

const ConnectWallet = ({ targetChain, handleConection }: Props) => {
  const { chain } = useNetwork();
  const { error, switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    if (chain?.name.toLowerCase() == targetChain.chainName.toLowerCase()) {
      handleConection(true);
    } else handleConection(false);
  }, [chain]);

  return (
    <div className="flex flex-col flex-1 gap-2 ">
      <div className="flex-1 flex flex-col p-5">
        <h2 className="text-indigo-900 font-normal text-4xl leading-12 text-center">
          Connect Wallet
        </h2>
        <p className="text-center ">
          Before deploy the nexus make sure to connect the wallet to the target
          chain.
        </p>
      </div>
      <div className="flex-1 flex flex-col justify-center ">
        <div className="flex flex-row border-solid border-2 border-black rounded-md py-1 px-3 ">
          <p>Target Chain:</p>
          <p>{targetChain.chainName}</p>
        </div>
      </div>
      <div className=" flex flex-row justify-center">
        <ConnectButton />
      </div>
      <div className=" flex flex-row justify-center">
        {chain &&
          chain.name.toLowerCase() != targetChain.chainName.toLowerCase() && (
            <button
              className="text-white bg-[#0e76fd] h-[40px] shadow-lg rounded-xl   font-bold py-1 px-3 inline-block "
              onClick={() => switchNetwork?.(targetChain.evmChainId)}
            >
              Connect to {targetChain.chainName}
            </button>
          )}
        <div>{error && error.message}</div>
      </div>
    </div>
  );
};

export default ConnectWallet;
