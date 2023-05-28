import React, { ReactElement, useState } from 'react';
import NexusName from '../../../components/app/nexusDeployment/NexusName';
import TargetChain from '../../../components/app/nexusDeployment/TargetChain';
import FeaturesSelection from '../../../components/app/nexusDeployment/FeaturesSelection';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { schema as NexusFactory } from 'abiTypes/contracts/nexus/NexusFactory.sol/NexusFactory';
import { schema as Nexus } from 'abiTypes/contracts/nexus/Nexus.sol/Nexus';
import { apiClient } from '../../../API';
import DeployNexus from '../../../components/app/nexusDeployment/DeployNexus';

type Props = {};

const Index = (props: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const [nexusName, setNexusName] = useState('');
  const [targetChain, setTargetChain] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [basicFeatures, setBasicFeatures] = useState<string[]>([]);
  const [costs, setCosts] = useState(0);

  const handleNexusName = (name: string) => {
    setNexusName(name);
  };

  const handleTargetChain = (chain: string) => {
    setTargetChain(chain);
  };

  const handleFeatures = (features: string[]) => {
    setFeatures(features);
  };
  const handleBasicFeatures = (features: string[]) => {
    setBasicFeatures(features);
  };

  const handleCosts = (costs: number) => {
    setCosts(costs);
  };

  const onboardingSteps = [
    <TargetChain handleTargetChain={handleTargetChain}></TargetChain>,
    <NexusName handleName={handleNexusName}></NexusName>,
    <FeaturesSelection
      handleFeatures={handleFeatures}
      handleBasicFeatures={handleBasicFeatures}
      handleCosts={handleCosts}
    ></FeaturesSelection>,
    <DeployNexus
      nexusName={nexusName}
      targetChain={targetChain}
      features={features}
      basicFeatures={basicFeatures}
      costs={costs}
    ></DeployNexus>,
  ];

  function handleNext() {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  const { address } = useAccount();

  const { config: nexusConfig } = usePrepareContractWrite({
    address: process.env.CONTRACTADD,
    abi: NexusFactory,
    functionName: 'create',
    args: [nexusName, address!],
  });

  const { write: writeNexus, error: errorNexus } =
    useContractWrite(nexusConfig);

  // @ts-ignore
  function getfeatureAddress(features) {
    return [`0x$0000`] as const;
  }

  // @ts-ignore
  function getfeaturePayment(features) {
    return [
      {
        token: `0x000` as const,
        amount: BigInt(0),
      },
    ] as const;
  }

  const { config: featureConfigOne } = usePrepareContractWrite({
    address: process.env.CONTRACTADD,
    abi: Nexus,
    functionName: 'installFacetFromCatalog',
    args: [
      apiClient.getCatalogAddress(),
      getfeatureAddress(features)[0],
      getfeaturePayment(features)[0],
    ],
  });

  const { config: featureConfigMany } = usePrepareContractWrite({
    address: process.env.CONTRACTADD,
    abi: Nexus,
    functionName: 'batchInstallFacetFromCatalog',
    args: [
      apiClient.getCatalogAddress(),
      getfeatureAddress(features),
      getfeaturePayment(features),
    ],
  });

  const { write: writeFeature, error: errorFeature } = useContractWrite(
    features.length === 1 ? featureConfigOne : featureConfigMany
  );

  return (
    <div className="flex flex-col flex-wrap justify-center content-center bg-gray-200  gap-2 h-screen">
      <div className="flex-flex-col w-fit  bg-white border-solid border-2 border-gray-400 rounded-lg p-2">
        <div className="flex flex-row space-x-2 justify-center">
          {onboardingSteps.map((step, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full  ${
                index === currentStep ? 'bg-[#0e76fd]' : 'bg-gray-400'
              }`}
            ></div>
          ))}
        </div>

        <div className="flex flex-row justify-center gap-4">
          {onboardingSteps[currentStep]}
        </div>
        <div className="flex flex-row justify-center gap-4 p-8">
          <button
            className="text-white bg-[#0e76fd] h-[40px] shadow-lg rounded-xl   font-bold py-1 px-3 inline-block hover:scale-105 transition-all duration-300"
            onClick={handleBack}
          >
            Back
          </button>
          {currentStep !== onboardingSteps.length - 1 && (
            <button
              className="text-white bg-[#0e76fd] h-[40px] shadow-lg rounded-xl   font-bold py-1 px-3 inline-block hover:scale-105 transition-all duration-300"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
