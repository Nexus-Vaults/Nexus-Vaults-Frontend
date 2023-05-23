import React from "react";

type Props = {
  nexusName: string;
  targetChain: string;
  features: string[];
  basicFeatures: string[];
  costs: number;
};

const DeployNexus = ({
  nexusName,
  targetChain,
  features,
  basicFeatures,
  costs,
}: Props) => {
  return (
    <div className="flex flex-col w-[30%]">
      <div className="flex flex-col p-5">
        <h2 className="font-normal font-normal text-4xl leading-12 text-center">
          Deploy Nexus
        </h2>
        <p className="text-center ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          ut augue libero.Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Pellentesque ut augue libero.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Pellentesque ut augue libero.
        </p>
      </div>
      <div className="flex flex-col border-solid border-2 border-black">
        <div className="flex flex-row">
          <p>Name:</p>
          <p>{nexusName}</p>
        </div>
        <div className="flex flex-row">
          <p>Target Chain:</p>
          <p>{targetChain}</p>
        </div>
        <div>
          <p>Basic Features:</p>
          <ul>
            {basicFeatures.map((feature) => (
              <li>{feature}</li>
            ))}
          </ul>
        </div>
        <div>
          <p>Features:</p>
          <ul>
            {features.map((feature) => (
              <li>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-row">
          <p>Costs:</p>
          <p>{costs}</p>
        </div>
      </div>
    </div>
  );
};

export default DeployNexus;
