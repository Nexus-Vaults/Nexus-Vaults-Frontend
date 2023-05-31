import React, { useState, useEffect } from 'react';
import NexusName from '../../../components/app/nexusDeployment/NexusName';
import TargetChain from '../../../components/app/nexusDeployment/TargetChain';
import FeaturesSelection from '../../../components/app/nexusDeployment/FeaturesSelection';
import DeployNexus from '../../../components/app/nexusDeployment/DeployNexus';
import { useRouter } from 'next/router';
import { apiClient, ChainDeployment, Feature } from 'api';

type Props = {};

const Index: React.FC<Props> = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [nexusName, setNexusName] = useState('');
  const [targetChain, setTargetChain] = useState<ChainDeployment | null>(null);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [basicFeatures, setBasicFeatures] = useState<Feature[]>([]);
  const [costs, setCosts] = useState(0);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleValidation = () => {
    if (currentStep === 0 && !targetChain) {
      setErrorMessage('Chain is empty.Please select a chain.');
      setError(true);
    } else if (currentStep === 1 && !nexusName.trim()) {
      setErrorMessage('Nexus name is empty.Please enter a name.');
      setError(true);
    } else {
      setError(false);
      handleNext();
    }
  };

  const router = useRouter();
  
  const handleNexusName = (name: string) => {
    setNexusName(name);
  };

  const handleTargetChain = (chainDeployment: ChainDeployment | undefined) => {
    if (chainDeployment == undefined) return;
    setTargetChain(chainDeployment);
  };

  const handleFeatures = (features: Feature[]) => {
    setFeatures(features);
  };
  const handleBasicFeatures = (features: Feature[]) => {
    setBasicFeatures(features);
  };

  const handleCosts = (costs: number) => {
    setCosts(costs);
  };

  const onboardingSteps = [
    <TargetChain handleTargetChain={handleTargetChain} />,
    <NexusName handleName={handleNexusName} nexusName={nexusName} />,
    <FeaturesSelection
      targetChain={targetChain!}
      handleFeatures={handleFeatures}
      handleBasicFeatures={handleBasicFeatures}
      handleCosts={handleCosts}
    />,
    <DeployNexus
      nexusName={nexusName}
      targetChain={targetChain!}
      features={features}
      costs={costs}
      handleName={handleNexusName}
    />,
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1 && targetChain != null) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      router.push('/app');
    } else {
      setCurrentStep((prevStep) => prevStep - 1);
      setError(false);
    }
  };

  useEffect(() => {
    console.log(currentStep);
  }, [currentStep]);

  return (
    <div className="flex flex-col w-screen flex-wrap justify-center content-center bg-gradient-to-br from-black to-indigo-900 min-h-screen  items-center  p-8 gap-2 h-screen">
      <div className="flex-flex-col w-2/3 bg-white shadow-2xl border-solid border-2 border-gray-400 rounded-lg p-2">
        <div className="flex flex-row space-x-2 justify-center">
          {onboardingSteps.map((step, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full  ${
                index === currentStep ? 'bg-indigo-900' : 'bg-gray-400'
              }`}
            ></div>
          ))}
        </div>

        <div className="flex flex-row justify-center gap-4">
          {onboardingSteps[currentStep]}
        </div>
        <div className="flex flex-row justify-center gap-4 p-8">
          <button
            className="text-white bg-indigo-900 h-[40px] shadow-lg rounded-xl font-bold py-1 px-3 inline-block hover:scale-105 transition-ease-in-out duration-300"
            onClick={handleBack}
          >
            Back
          </button>
          {currentStep !== onboardingSteps.length - 1 && (
            <button
              className="text-white bg-indigo-900 h-[40px] shadow-lg rounded-xl font-bold py-1 px-3 inline-block hover:scale-105 transition-ease-in-out duration-300"
              onClick={handleValidation}
            >
              Next
            </button>
          )}
        </div>
        <div>
          <p className="text-center text-red font-mono font-semibold">
            {error && errorMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
