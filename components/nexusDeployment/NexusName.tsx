import React from "react";

type Props = {};

const NexusName = (props: Props) => {
  return (
    <div className="flex flex-col w-[50%]  p-5 gap-10">
      <div className="flex flex-col p-5">
        <h2 className="font-normal font-normal text-4xl leading-12 text-center text-white">
          Welcome to Nexus Vaults
        </h2>
        <p className="text-center text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          ut augue libero.Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Pellentesque ut augue libero.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Pellentesque ut augue libero.
        </p>
      </div>
      <div className="flex flex-row justify-center">
        <input
          className="w-[60%] rounded-md"
          placeholder="Select your Nexus Name"
        ></input>
      </div>
    </div>
  );
};

export default NexusName;
