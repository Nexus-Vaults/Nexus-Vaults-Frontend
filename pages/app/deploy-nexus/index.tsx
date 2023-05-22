import React, { ReactElement, useState } from "react";
import NexusName from "../../../components/app/nexusDeployment/NexusName";
import TargetChain from "../../../components/app/nexusDeployment/TargetChain";
import FeaturesSelection from "../../../components/app/nexusDeployment/FeaturesSelection";
import DeployNexus from "../../../components/app/nexusDeployment/deploy/DeployNexus";
import Layout from "../../../components/layout";
import { NextPageWithLayout } from "../../_app";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import NexusFactory from "abiTypes/contracts/nexus/NexusFactory.sol/NexusFactory";
import Nexus from "abiTypes/contracts/nexus/Nexus.sol/Nexus";
import { apiClient } from "../../../API";

type Props = {};

const Index: NextPageWithLayout = (props: Props) => {
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

  const { address } = useAccount();

  const { config: nexusConfig } = usePrepareContractWrite({
    address: process.env.CONTRACTADD,
    abi: NexusFactory,
    functionName: "create",
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
    functionName: "installFacetFromCatalog",
    args: [
      apiClient.getCatalogAddress(),
      getfeatureAddress(features)[0],
      getfeaturePayment(features)[0],
    ],
  });

  const { config: featureConfigMany } = usePrepareContractWrite({
    address: process.env.CONTRACTADD,
    abi: Nexus,
    functionName: "batchInstallFacetFromCatalog",
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
