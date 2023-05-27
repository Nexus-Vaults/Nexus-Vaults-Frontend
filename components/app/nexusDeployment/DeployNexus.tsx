import React from 'react';
import DeployNexusCard from './deploy/DeployNexusCard';
import ConnectWallet from './deploy/ConnectWallet';
import ApprovePayment from './deploy/ApprovePayment';

type Props = {
  nexusName: string;
  targetChain: string;
  features: string[];
  basicFeatures: string[];
  costs: number;
};

const DeployNexus = ({
  nexusName,
  targetChain,
  features,
  basicFeatures,
  costs,
}: Props) => {
  const featuresCount = features.length + basicFeatures.length;

  return (
    <div className="flex flex-row ">
      <ConnectWallet targetChain={targetChain}></ConnectWallet>
      <div className="p-8  flex-wrap flex flex-col justify-center content-center h-full">
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
        featuresCount={featuresCount}
      ></ApprovePayment>
      <div className="p-8 flex-wrap  flex flex-col justify-center content-center h-full">
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
        featuresCount={featuresCount}
      ></DeployNexusCard>
    </div>
  );
};

export default DeployNexus;
