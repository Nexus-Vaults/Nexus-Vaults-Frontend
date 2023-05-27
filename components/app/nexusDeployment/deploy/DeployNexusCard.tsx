import React from 'react';

type Props = {
  nexusName: string;

  featuresCount: number;
};

const DeployNexusCard = ({ nexusName, featuresCount }: Props) => {
  return (
    <div className="flex flex-col flex-1 gap-2">
      <div className="flex-1 flex flex-col p-5">
        <h2 className="font-normal font-normal text-4xl leading-12 text-center">
          Deploy Nexus
        </h2>
        <p className="text-center ">Now you are ready to deploy the nexus.</p>
      </div>
      <div className="flex-1 flex flex-col justify-center ">
        <div className="flex flex-row  border-solid border-2 border-black rounded-md py-1 px-3 ">
          <p>Name:</p>
          <p>{nexusName}</p>
        </div>
      </div>
      <div className="flex flex-row justify-center  ">
        <button className="text-white bg-[#0e76fd] h-[40px] shadow-lg rounded-xl   font-bold py-1 px-3 inline-block ">
          Deploy Nexus
        </button>
      </div>
    </div>
  );
};

export default DeployNexusCard;
