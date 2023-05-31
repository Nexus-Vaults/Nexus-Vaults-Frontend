import React, { useEffect, useState } from 'react';
import FeaturesDashboard from './features/FeaturesDashboard';
import type { ChainDeployment, Feature } from 'api';
import { Chain, CHAIN_DEFINITIONS, apiClient } from 'api';

type Props = {
  handleFeatures: (features: Feature[]) => void;
  handleBasicFeatures: (features: Feature[]) => void;
  handleCosts: (costs: number) => void;
  chainDeployment: ChainDeployment | null | undefined;
  targetChain: Chain;
};

const FeaturesSelection = ({
  handleFeatures,
  handleBasicFeatures,
  handleCosts,
  chainDeployment,
  targetChain,
}: Props) => {
  const targetChainId = CHAIN_DEFINITIONS[targetChain].id;

  interface FeaturesPlus extends Feature {
    catalogAddress: `0x${string}`;
  }

  const [features, setFeatures] = useState<FeaturesPlus[]>();

  useEffect(() => {
    if (targetChainId == null) return;
    if (chainDeployment == null) return;

    const result: FeaturesPlus[] = [];
    for (let i = 0; i < chainDeployment.publicCatalogAddress.length; i++) {
      let catalogAddress = chainDeployment.publicCatalogAddress[i];
      let features = apiClient.getFeatures(targetChainId, catalogAddress);
      features.map((x) => ({ ...x, catalogAddress }));
    }
    setFeatures(result);
  });

  return (
    <div className="flex flex-col  p-5 gap-10">
      <div className="flex flex-col p-5 gap-2">
        <h2 className="font-mono font-semibold  text-4xl leading-12 text-center ">
          Choose additional features
        </h2>
        <div className="flex flex-row justify-center">
          <div className="w-[100%] h-[1px] bg-gray-300"></div>
        </div>
        <p className="text-center ">
          Choose the featatures that your nexus wants to have. It will come with
          free basic features.All the additional features needs to be payed.
        </p>
      </div>
      {features == null ? (
        <div>no features available</div>
      ) : (
        <FeaturesDashboard
          handleFeatures={handleFeatures}
          handleBasicFeatures={handleBasicFeatures}
          handleCosts={handleCosts}
          features={features}
        ></FeaturesDashboard>
      )}
    </div>
  );
};

export default FeaturesSelection;
