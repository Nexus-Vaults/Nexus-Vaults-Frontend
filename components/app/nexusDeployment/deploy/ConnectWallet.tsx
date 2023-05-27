import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';

type Props = {
  targetChain: string;
};

const ConnectWallet = ({ targetChain }: Props) => {
  return (
    <div className="flex flex-col flex-1 gap-2">
      <div className=" flex-1 flex flex-col p-5">
        <h2 className="font-normal font-normal text-4xl leading-12 text-center">
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
    </div>
  );
};

export default ConnectWallet;
