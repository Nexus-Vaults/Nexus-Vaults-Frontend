import React from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { NexusFactory } from 'abiTypes/contracts/nexus/NexusFactory.sol/NexusFactory';
import { Nexus } from 'abiTypes/contracts/nexus/Nexus.sol/Nexus';
import { apiClient } from 'api';

type Props = {
  nexusName: string;
  approved: boolean;
  features: string[];
  featuresCount: number;
  connected: boolean;
  handleName: (name: string) => void;
};

// @ts-ignore
const DeployNexusCard = ({
  nexusName,
  features,
  featuresCount,
  approved,
  connected,
  handleName,
}: Props) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleName(event.target.value);
  };

  const { address } = useAccount();

  const { config: configNexus, error: errorNexus } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADD,
    abi: NexusFactory,
    functionName: 'create',
    args: [nexusName, address!],
  });

  const { write: writeNexus } = useContractWrite(configNexus);

  function deployNexus() {
    console.log("Deploying nexus...");
    writeNexus?.();
  }

  function getFeatureAddress(features: string[]) {
    return [`0x$0000`] as const;
  }

  function getFeaturePayment(features: string[]) {
    return [
      {
        token: `0x000` as const,
        amount: BigInt(0),
      },
    ] as const;
  }

  const { config: featureConfigOne } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADD,
    abi: Nexus,
    functionName: 'installFacetFromCatalog',
    args: [
      apiClient.getCatalogAddress(),
      getFeatureAddress(features)[0],
      getFeaturePayment(features)[0],
    ],
  });

  const { config: featureConfigMany } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADD,
    abi: Nexus,
    functionName: 'batchInstallFacetFromCatalog',
    args: [
      apiClient.getCatalogAddress(),
      getFeatureAddress(features),
      getFeaturePayment(features),
    ],
  });

  const { write: writeFeature, error: errorFeature } = useContractWrite(
    features.length === 1 ? featureConfigOne : featureConfigMany
  );

  function deployFeature() {
    writeFeature?.();
    console.log('deploying feature...');
  }

  return (
    <div className="flex flex-col flex-1 gap-2">
      <div className="flex-1 flex flex-col p-5">
        <h2 className="font-normal text-4xl leading-12 text-center">
          Deploy Nexus
        </h2>
        <p className="text-center ">Now you are ready to deploy the nexus.</p>
      </div>
      <div className="flex-1 flex flex-col justify-center ">
        <div className="flex flex-row  border-solid border-2 border-black rounded-md py-1 px-3 ">
          <p>Name:</p>
          {
            //todo: remove black border of input field
          }
          <input
            className="w-[60%]"
            placeholder={nexusName}
            onChange={handleInputChange}
          ></input>
        </div>
      </div>
      <div className="flex flex-row justify-center  ">
        <button
          className="text-white bg-[#0e76fd] h-[40px] shadow-lg rounded-xl   font-bold py-1 px-3 inline-block "
          onClick={() => deployNexus()}
          disabled={!connected || !approved}
          //todo: proper styling for this, move to global
          style={
            !connected || !approved
              ? {
                  backgroundColor: 'grey',
                  color: 'white',
                }
              : {
                  backgroundColor: 'blue',
                  color: 'white',
                }
          }
        >
          Deploy Nexus
        </button>
      </div>
    </div>
  );
};

export default DeployNexusCard;
