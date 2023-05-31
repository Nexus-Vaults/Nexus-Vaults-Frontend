import React, { ReactElement, useContext, useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import { NextPageWithLayout } from '../../_app';
import Table from '../../../components/app/table';
import { useAccount } from 'wagmi';
import { ChainDeployment } from 'api';
import { ChainDeployments } from '../ContractsAddressesContext';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Props = {};

const Index: NextPageWithLayout = (props: Props) => {
  // //#toDo: Get the proper Nexus from previous component or from the explorer
  // const nexus = { name: '', address: '0x000', chain: Chain.lol } as const;
  // const vaults = apiClient.getVaults(nexus);
  //
  // const chainId = Chain.lol;
  // //#toDo: can optional be edited from the user but must be unique
  // const vaultId = 5;
  //
  // const ChainDeployment = apiClient.getContracts();
  // const gatewayAddress = ChainDeployment.gatewayAddress;
  //
  // const { config: vaultV1FacetConfig } = usePrepareContractWrite({
  //   address: process.env.CONTRACTADD,
  //   abi: VaultV1Facet,
  //   functionName: 'createVaultV1',
  //   args: [chainId, vaultId, gatewayAddress],
  // });
  //
  // const { write: writeCreateVaultV1, error: errorCreateVaultV1 } =
  //   useContractWrite(vaultV1FacetConfig);
  //
  // const { config: setPrimaryVaultGatewayV1Config } = usePrepareContractWrite({
  //   address: process.env.CONTRACTADD,
  //   abi: VaultV1Facet,
  //   functionName: 'setPrimaryVaultGatewayV1',
  //   args: [chainId, vaultId, gatewayAddress],
  // });
  //
  // const {
  //   write: writeSetPrimaryVaultGatewayV1,
  //   error: errorSetPrimaryVaultGatewayV1,
  // } = useContractWrite(vaultV1FacetConfig);

  const contractsAddresses = useContext(ChainDeployments);

  const [selectedItem, setSelectedItem] = useState<ChainDeployment>(
    contractsAddresses[0]
  );

  const [nexusAddress, setInput] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const router = useRouter();
  return (
    <div className="flex flex-col flex-wrap justify-center content-center bg-whitesmoke  gap-2 h-screen">
      <div className="flex-flex-col w-fit  bg-white shadow-2xl border-solid border-2 border-gray-400 rounded-lg p-2">
        <div className="flex flex-row space-x-2 justify-center">
          <div className="flex flex-col   p-5 gap-y-10">
            <div className="flex flex-col p-5 gap-2">
              <h2 className="text-primary font-semibold font-mono text-4xl leading-12 text-center ">
                Search for your Nexus
              </h2>
              <div className="flex flex-row justify-center">
                <div className="w-[100%] h-[1px] bg-gray-300"></div>
              </div>
              {contractsAddresses.map((x) => {
                return (
                  <div className="flex flex-wrap justify-center gap-6 p-2">
                    <div
                      className={`border p-2 rounded ${
                        selectedItem?.contractChainId === x.contractChainId
                          ? 'bg-black'
                          : 'hover:bg-black'
                      }`}
                      onClick={() => setSelectedItem(x)}
                    >
                      <Image
                        src={`/public/images/${x.chainName}.png`}
                        width={32}
                        height={32}
                        alt=""
                      />
                    </div>
                  </div>
                );
              })}
              <div className="flex flex-col flex-wrap justify-center content-center  ">
                <input
                  className="text-mono font-semibold text-center w-[60%] py-1 px-2 border-b  border-solid  hover:border-[#0e76fd] focus:border-[#0e76fd]  focus:rounded-lg  "
                  placeholder="Nexus Adress"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-center">
        <button
          className="text-white bg-[#0e76fd] h-[40px] shadow-lg rounded-xl   font-bold py-1 px-3 inline-block hover:scale-105 transition-all duration-300"
          onClick={() => router.push('/app')}
        >
          Back
        </button>
        <button
          className="text-white bg-[#0e76fd] h-[40px] shadow-lg rounded-xl   font-bold py-1 px-3 inline-block hover:scale-105 transition-all duration-300"
          onClick={() =>
            nexusAddress.length !== 0 &&
            router.push(
              `/app/overview/${selectedItem.contractChainId.toString()}/${nexusAddress}`
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Index;
