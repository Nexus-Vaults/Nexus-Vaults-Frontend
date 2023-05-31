import React, { ReactElement } from 'react';
import Layout from '../../../components/layout';
import { NextPageWithLayout } from '../../_app';
import Table from '../../../components/app/table';
import { useAccount } from 'wagmi';

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
  const { address } = useAccount();

  const tableData = [
    { assetName: 'Asset 1', amount: 100, value: 100 },
    { assetName: 'Asset 2', amount: 200, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
    { assetName: 'Asset 3', amount: 300, value: 100 },
  ];

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
              <div className="flex flex-col flex-wrap justify-center content-center  ">
                <input
                  className="text-mono font-semibold text-center w-[60%] py-1 px-2 border-b  border-solid  hover:border-[#0e76fd] focus:border-[#0e76fd]  focus:rounded-lg  "
                  placeholder="Nexus Adress"
                ></input>
              </div>
              <div className="w-full flex-1 ">
                <Table data={tableData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
