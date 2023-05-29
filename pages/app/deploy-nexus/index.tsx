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
    <div className="flex flex-col flex-wrap justify-center content-center bg-whitesmoke  gap-2 h-screen">
      <div className="flex-flex-col w-fit  bg-white shadow-2xl border-solid border-2 border-gray-400 rounded-lg p-2">
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
