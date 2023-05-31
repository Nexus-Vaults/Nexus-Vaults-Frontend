import React from 'react';

type Props = {
  handleName: (name: string) => void;
  nexusName: string;
};

const NexusName = ({ handleName, nexusName }: Props) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleName(event.target.value);
  };

  return (
    <div className="flex flex-col  p-5 gap-10">
      <div className="flex flex-col p-5 gap-2">
        <h2 className="font-normal font-mono font-semibold text-4xl leading-12 text-center">
          Welcome to Nexus Vaults
        </h2>
        <div className="flex flex-row justify-center">
          <div className="w-[100%] h-[1px] bg-gray-300"></div>
        </div>
        <p className="text-center ">
          This is going to be the name of your Nexus. You can change it later.
        </p>
      </div>
      <div className="flex flex-row justify-center p-2">
        <input
          className="text-mono font-semibold text-center w-[60%] py-1 px-2 border-b  border-solid  hover:border-[#0e76fd] focus:border-[#0e76fd] hover:border-[3px]hover:rounded-lg focus:rounded-lg focus:border-[3px] focus:outline-none "
          placeholder="Select your Nexus Name"
          onChange={handleInputChange}
          value={nexusName}
        ></input>
      </div>
    </div>
  );
};

export default NexusName;
function useState(arg0: string): [any, any] {
  throw new Error('Function not implemented.');
}
