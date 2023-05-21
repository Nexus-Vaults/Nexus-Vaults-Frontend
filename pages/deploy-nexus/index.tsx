import React, { useState } from "react";
import NexusName from "../../components/app/nexusDeployment/NexusName";
import TargetChain from "../../components/app/nexusDeployment/TargetChain";
import FeaturesSelection from "../../components/app/nexusDeployment/FeaturesSelection";
import DeployNexus from "../../components/app/nexusDeployment/deploy/DeployNexus";

type Props = {};

const index = (props: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const [nexusName, setNexusName] = useState("");
  const [targetChain, setTargetChain] = useState("");
  const [features, setFeatures] = useState<string[]>([]);

  const handleNexusName = (name: string) => {
    setNexusName(name);
  };

  const handleTargetChain = (chain: string) => {
    setTargetChain(chain);
  };

  const handleFeatures = (features: string[]) => {
    setFeatures(features);
  };

  const onboardingSteps = [
    <NexusName handleName={handleNexusName}></NexusName>,
    <TargetChain handleTargetChain={handleTargetChain}></TargetChain>,
    <FeaturesSelection handleFeatures={handleFeatures}></FeaturesSelection>,
    <DeployNexus
      nexusName={nexusName}
      targetChain={targetChain}
      features={features}
    ></DeployNexus>,
  ];

  function handleNext() {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    console.log(currentStep);
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
    console.log(currentStep);
  }

  return (
    <div className="flex flex-col flex-wrap justify-start content-center bg-background pt-40  gap-2 h-screen ">
      {onboardingSteps[currentStep]}
      <div className="flex flex-row justify-center gap-4">
        <button
          className="border-solid border-2  rounded-md p-1 hover:text-background"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="border-solid border-2  rounded-md p-1  hover:text-background"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default index;
