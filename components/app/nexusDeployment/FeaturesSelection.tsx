import React, { useState } from 'react';
import FeaturesDashboard from './features/FeaturesDashboard';

type Props = {
  handleFeatures: (features: string[]) => void;
  handleBasicFeatures: (features: string[]) => void;
  handleCosts: (costs: number) => void;
};

const FeaturesSelection = ({
  handleFeatures,
  handleBasicFeatures,
  handleCosts,
}: Props) => {
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
      <FeaturesDashboard
        handleFeatures={handleFeatures}
        handleBasicFeatures={handleBasicFeatures}
        handleCosts={handleCosts}
      ></FeaturesDashboard>
    </div>
  );
};

export default FeaturesSelection;
