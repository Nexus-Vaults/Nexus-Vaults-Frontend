import React from "react";

type Props = {
  handleName: (name: string) => void;
};

const NexusName = ({ handleName }: Props) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleName(event.target.value);
  };

  return (
    <div className="flex flex-col w-[50%]  p-5 gap-10">
      <div className="flex flex-col p-5">
        <h2 className="font-normal font-normal text-4xl leading-12 text-center">
          Welcome to Nexus Vaults
        </h2>
        <p className="text-center ">
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
          onChange={handleInputChange}
        ></input>
      </div>
    </div>
  );
};

export default NexusName;
function useState(arg0: string): [any, any] {
  throw new Error("Function not implemented.");
}
