import React, { useContext, useEffect } from 'react';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { NexusFactory } from 'abiTypes/contracts/nexus/NexusFactory.sol/NexusFactory';
import { ChainDeployment, Feature } from 'api';
import { usePublicClient } from 'wagmi';
import { fetchTransaction } from '@wagmi/core';
import { useRouter } from 'next/router';
import { ChainDeployments } from '../../../../pages/app/ContractsAddressesContext';
import { decodeEventLog } from 'viem';
import ConfirmationModal from '../../modals/ConfirmationModal';

type Props = {
  nexusName: string;
  approved: boolean;
  connected: boolean;
  targetChain: ChainDeployment;
  handleName: (name: string) => void;
  features: Feature[];
};

// @ts-ignore
const DeployNexusCard = ({
  features,
  nexusName,
  targetChain,
  approved,
  connected,
  handleName,
}: Props) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleName(event.target.value);
  };

  const router = useRouter();

  const facetInstallation = features.map((x) => {
    return {
      catalog: x.catalogAddress,
      facet: x.address,
    };
  });

  const { address } = useAccount();
  const publicClient = usePublicClient();

  const { config: configNexus } = usePrepareContractWrite({
    address: targetChain.nexusFactoryAddress,
    abi: NexusFactory,
    functionName: 'create',
    args: [nexusName, address!, facetInstallation],
    enabled: address != null,
  });

  const { write: writeNexus, data: dataNexus } = useContractWrite(configNexus);
  const transaction = useWaitForTransaction({ hash: dataNexus?.hash });

  useEffect(() => {
    if (dataNexus?.hash == undefined || transaction.data?.status != 'success') {
      <ConfirmationModal success={false} />;
      return;
    }

    const f = async () => {
      const txReceipt = await publicClient.getTransactionReceipt({
        hash: dataNexus?.hash!,
      });

      const nexusDeployedLog = txReceipt.logs.filter(
        (x) =>
          x.address.toUpperCase() ==
          targetChain.nexusFactoryAddress.toUpperCase()
      )[0];

      const deployedLogArgs = decodeEventLog({
        abi: NexusFactory,
        eventName: 'NexusDeployed',
        topics: nexusDeployedLog.topics,
        data: nexusDeployedLog.data,
      });
      <ConfirmationModal success={true} />;
      useEffect(() => {
        const timer = setTimeout(() => {}, 200);
        router.push('/app/overview/' + deployedLogArgs.args.nexus);
        return () => clearTimeout(timer);
      }, []);
    };

    f();
  }, [transaction]);

  function deployNexus() {
    console.log('Deploying nexus...');
    writeNexus?.();
  }

  // //todo: needs to be moved
  // function getFeatureAddress(features: string[]) {
  //   return [`0x$0000`] as const;
  // }
  //
  // function getFeaturePayment(features: string[]) {
  //   return [
  //     {
  //       token: `0x000` as const,
  //       amount: BigInt(0),
  //     },
  //   ] as const;
  // }
  //
  // const { config: featureConfigOne } = usePrepareContractWrite({
  //   address: process.env.NEXT_PUBLIC_NEXUS_FACTORY_ADD,
  //   abi: Nexus,
  //   functionName: 'installFacetFromCatalog',
  //   args: [
  //     apiClient.getCatalogAddress(),
  //     getFeatureAddress(features)[0],
  //     getFeaturePayment(features)[0],
  //   ],
  //   enabled: false,
  // });
  //
  // const { config: featureConfigMany } = usePrepareContractWrite({
  //   address: process.env.NEXT_PUBLIC_NEXUS_FACTORY_ADD,
  //   abi: Nexus,
  //   functionName: 'batchInstallFacetFromCatalog',
  //   args: [
  //     apiClient.getCatalogAddress(),
  //     getFeatureAddress(features),
  //     getFeaturePayment(features),
  //   ],
  //   enabled: false,
  // });
  //
  // const { write: writeFeature, error: errorFeature } = useContractWrite(
  //   facetInstallation.length === 1 ? featureConfigOne : featureConfigMany
  // );

  return (
    <div className="flex flex-col flex-1 gap-2">
      <div className="flex-1 flex flex-col p-5">
        <h2 className="text-indigo-900 font-normal text-4xl leading-12 text-center">
          Deploy Nexus
        </h2>
        <p className="text-center ">Now you are ready to deploy the nexus.</p>
      </div>
      <div className="flex-1 flex flex-col justify-center ">
        <div className="flex flex-row  border-solid border-2 border-black rounded-md py-1 px-3 ">
          <p className="px-2">Name:</p>
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
