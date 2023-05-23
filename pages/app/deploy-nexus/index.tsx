import React, { ReactElement, useState } from "react";
import NexusName from "../../../components/app/nexusDeployment/NexusName";
import TargetChain from "../../../components/app/nexusDeployment/TargetChain";
import FeaturesSelection from "../../../components/app/nexusDeployment/FeaturesSelection";
import DeployNexus from "../../../components/app/nexusDeployment/deploy/DeployNexus";
import Layout from "../../../components/layout";
import { NextPageWithLayout } from "../../_app";

type Props = {};

const Index: NextPageWithLayout = (props: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const [nexusName, setNexusName] = useState("");
  const [targetChain, setTargetChain] = useState("");
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
    console.log(currentStep);
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
    console.log(currentStep);
  }

  return (
    <div className="flex flex-col flex-wrap justify-start content-center bg-background  gap-2  ">
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

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
