import React, { useState } from 'react';
import DeployNexusCard from './deploy/DeployNexusCard';
import ConnectWallet from './deploy/ConnectWallet';
import ApprovePayment from './deploy/ApprovePayment';
import { ChainDeployment, Feature } from 'api';

type Props = {
  nexusName: string;
  targetChain: ChainDeployment;
  features: Feature[];
  costs: number;
  handleName: (name: string) => void;
};

const DeployNexus = ({
  nexusName,
  targetChain,
  features,
  costs,
  handleName,
}: Props) => {
  const [isApproved, setApproved] = useState(false);
  const [isConnected, setConnected] = useState(false);

  const handleApproval = (b: boolean) => {
    setApproved(b);
  };

  const handleConnection = (b: boolean) => {
    setConnected(b);
  };

  return (
    <div className="flex flex-col xl:flex-row">
      <ConnectWallet
        targetChain={targetChain}
        handleConection={handleConnection}
      ></ConnectWallet>
      <div className="p-8 xl:px-8 flex-wrap flex flex-col justify-center content-center">
        <div className="w-fit h-fit">
          <svg
            width="89"
            height="69"
            viewBox="0 0 89 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M55.9315 0.619141V23.2064H0.817383V45.7936H55.9315V68.3809L89 34.1612L55.9315 0.619141Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      <ApprovePayment
        costs={costs}
        features={features}
        handleApproval={handleApproval}
        connected={isConnected}
      ></ApprovePayment>
      <div className="p-8 xl:px-8 flex-wrap flex flex-row xl:flex-col justify-center content-center">
        <div className="w-fit h-fit">
          <svg
            width="89"
            height="69"
            viewBox="0 0 89 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M55.9315 0.619141V23.2064H0.817383V45.7936H55.9315V68.3809L89 34.1612L55.9315 0.619141Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      <DeployNexusCard
        nexusName={nexusName}
        targetChain={targetChain}
        approved={isApproved}
        connected={isConnected}
        handleName={handleName}
        features={features}
      ></DeployNexusCard>
    </div>
  );
};

export default DeployNexus;
