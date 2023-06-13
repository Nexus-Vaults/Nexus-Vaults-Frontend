import React, { useEffect, useState } from 'react';
import {
  Address,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { NexusFactory } from 'abiTypes/contracts/nexus/NexusFactory.sol/NexusFactory';
import { ChainDeployment, Feature } from 'api';
import { usePublicClient } from 'wagmi';

import { decodeEventLog } from 'viem';
import ConfirmationModal from '../../modals/ConfirmationModal';

import { VaultV1Controller } from 'abiTypes/contracts/vault/v1/controller/VaultV1Controller.sol/VaultV1Controller';

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

  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [nexusAddress, setNexusAddress] = useState<Address>();

  enum DeploymentStatus {
    Idle,
    PendingDeployment,
    Deployed,
    DeploymentFailed,
    PendingAcceptGateway,
    AcceptFailed,
    Completed,
  }

  const [status, setStatus] = useState<DeploymentStatus>(DeploymentStatus.Idle);

  const facetInstallation = features.map((x) => {
    return {
      catalog: x.catalogAddress,
      facet: x.address,
    };
  });

  const { config: configNexus } = usePrepareContractWrite({
    address: targetChain.nexusFactoryAddress,
    abi: NexusFactory,
    functionName: 'create',
    args: [nexusName, address!, facetInstallation],
    enabled: address != null,
  });
  const { config: acceptGatewayConfig } = usePrepareContractWrite({
    address: nexusAddress,
    abi: VaultV1Controller,
    functionName: 'addLocalAcceptedGateway',
    args: [1],
  });

  const { write: writeNexus, data: dataNexus } = useContractWrite(configNexus);
  const { write: writeAcceptedGateway, data: acceptGatewayIdData } =
    useContractWrite(acceptGatewayConfig);

  const deployTransaction = useWaitForTransaction({ hash: dataNexus?.hash });
  const acceptGatewayTransaction = useWaitForTransaction({
    hash: acceptGatewayIdData?.hash,
  });

  useEffect(() => {
    if (
      dataNexus?.hash == undefined ||
      deployTransaction.data == undefined ||
      status >= DeploymentStatus.Deployed
    ) {
      return;
    }

    if (deployTransaction.data.status == 'reverted') {
      setStatus(DeploymentStatus.DeploymentFailed);
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

      setNexusAddress(deployedLogArgs.args.nexus!);
      setStatus(DeploymentStatus.Deployed);
    };

    f();
  }, [deployTransaction]);

  useEffect(() => {
    if (
      acceptGatewayIdData?.hash == undefined ||
      acceptGatewayTransaction.data == undefined
    ) {
      return;
    }

    if (acceptGatewayTransaction.data?.status == 'reverted') {
      setStatus(DeploymentStatus.AcceptFailed);
      return;
    }

    setStatus(DeploymentStatus.Completed);
  }, [acceptGatewayTransaction]);

  function deployNexus() {
    console.log('Deploying nexus...');
    setStatus(DeploymentStatus.PendingDeployment);
    writeNexus?.();
  }

  async function acceptGateway() {
    console.log('Accepting gateway...');
    setStatus(DeploymentStatus.PendingAcceptGateway);
    writeAcceptedGateway?.();
  }

  return (
    <>
      {status == DeploymentStatus.Completed ||
      status == DeploymentStatus.DeploymentFailed ||
      status == DeploymentStatus.AcceptFailed ? (
        <ConfirmationModal
          isSuccess={status == DeploymentStatus.Completed}
          nexusAddress={nexusAddress!}
          contractChainId={targetChain.contractChainId}
        />
      ) : (
        ''
      )}

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
            disabled={
              !connected || !approved || status != DeploymentStatus.Idle
            }
            //todo: proper styling for this, move to global
            style={
              !connected || !approved || status != DeploymentStatus.Idle
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
            {status == DeploymentStatus.Idle ? 'Deploy Nexus' : ''}
            {status == DeploymentStatus.PendingDeployment ? 'Pending...' : ''}
            {status == DeploymentStatus.DeploymentFailed
              ? 'Deployment failed...'
              : ''}
            {status >= DeploymentStatus.Deployed ? 'Deployment successful' : ''}
          </button>
          <button
            className="text-white bg-[#0e76fd] h-[40px] shadow-lg rounded-xl   font-bold py-1 px-3 inline-block "
            onClick={() => acceptGateway()}
            disabled={
              !connected || !approved || status != DeploymentStatus.Deployed
            }
            //todo: proper styling for this, move to global
            style={
              !connected || !approved || status != DeploymentStatus.Deployed
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
            {status <= DeploymentStatus.Deployed ? 'Accept Gateway' : ''}
            {status == DeploymentStatus.PendingAcceptGateway
              ? 'Pending...'
              : ''}
            {status == DeploymentStatus.AcceptFailed
              ? 'Gateway accept failed...'
              : ''}
            {status >= DeploymentStatus.Completed
              ? 'Accepted successfully'
              : ''}
          </button>
        </div>
      </div>
    </>
  );
};

export default DeployNexusCard;
