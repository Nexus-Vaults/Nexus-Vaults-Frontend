import React, { useEffect, useState } from 'react';
import FeaturesDashboard from './features/FeaturesDashboard';
import type { ChainDeployment, Feature } from 'api';
import { apiClient } from 'api';

type Props = {
  handleFeatures: (features: Feature[]) => void;
  handleBasicFeatures: (features: Feature[]) => void;
  handleCosts: (costs: number) => void;
  targetChain: ChainDeployment;
};

const FeaturesSelection = ({
  handleFeatures,
  handleBasicFeatures,
  handleCosts,
  targetChain,
}: Props) => {
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    if (targetChain == null) return;
    const func = async () => {
      const availableFeatures = await apiClient.getFeatures(
        targetChain.contractChainId,
        targetChain.publicCatalogAddress
      );
      
      setFeatures(availableFeatures);
    };
    func();
  }, [targetChain]);

  return (
    <div className="flex flex-col  p-5 gap-10">
      <div className="flex flex-col p-5 gap-2">
        <h2 className="text-indigo-900 font-mono font-semibold  text-4xl leading-12 text-center ">
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
