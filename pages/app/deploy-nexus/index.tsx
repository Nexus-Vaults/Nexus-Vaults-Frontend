import React, { useState, useEffect } from 'react';
import NexusName from '../../../components/app/nexusDeployment/NexusName';
import TargetChain from '../../../components/app/nexusDeployment/TargetChain';
import FeaturesSelection from '../../../components/app/nexusDeployment/FeaturesSelection';
import DeployNexus from '../../../components/app/nexusDeployment/DeployNexus';
import { useRouter } from 'next/router';
import { Chain } from 'api';

type Props = {};

const Index: React.FC<Props> = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [nexusName, setNexusName] = useState('');
  const [targetChain, setTargetChain] = useState<Chain>('Localhost');
  const [features, setFeatures] = useState<string[]>([]);
  const [basicFeatures, setBasicFeatures] = useState<string[]>([]);
  const [costs, setCosts] = useState(0);
  const router = useRouter();

  const handleNexusName = (name: string) => {
    setNexusName(name);
  };

  const handleTargetChain = (chain: Chain) => {
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
    <TargetChain handleTargetChain={handleTargetChain} />,
    <NexusName handleName={handleNexusName} />,
    <FeaturesSelection
      handleFeatures={handleFeatures}
      handleBasicFeatures={handleBasicFeatures}
      handleCosts={handleCosts}
    />,
    <DeployNexus
      nexusName={nexusName}
      targetChain={targetChain}
      features={features}
      basicFeatures={basicFeatures}
      costs={costs}
      handleName={handleNexusName}
    />,
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      router.push('/app');
    } else {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  useEffect(() => {
    console.log(currentStep);
  }, [currentStep]);

  return (
    <div className="flex flex-col flex-wrap justify-center content-center bg-background  gap-2 h-screen">
      <div className="flex-flex-col w-[80%] ">
        <div className="flex flex-row justify-center gap-4">
          {onboardingSteps[currentStep]}
        </div>
        <div className="flex flex-row justify-center gap-4 p-8">
          <button
            className="border-solid border-2  rounded-md p-1 hover:text-background"
            onClick={handleBack}
          >
            Back
          </button>
          {currentStep !== onboardingSteps.length - 1 && (
            <button
              className="border-solid border-2  rounded-md p-1  hover:text-background"
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
