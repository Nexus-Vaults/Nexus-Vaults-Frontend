import React, { useState } from "react";
import FeaturesDashboard from "./features/FeaturesDashboard";

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
    <div className="flex flex-col w-[80%] p-5 gap-10">
      <div className="flex flex-col p-5">
        <h2 className="font-normal font-normal text-4xl leading-12 text-center ">
          Choose additional features
        </h2>
        <p className="text-center ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          ut augue libero.Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Pellentesque ut augue libero.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Pellentesque ut augue libero.
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
