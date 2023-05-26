import React, { ReactElement } from 'react';
import Layout from '../../../components/layout';
import { NextPageWithLayout } from '../../_app';

import { apiClient, Chain } from "../../../API";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { schema as VaultV1Facet } from "abiTypes/contracts/vault/v1/facet/VaultV1Facet.sol/VaultV1Facet";

type Props = {};

const Index: NextPageWithLayout = (props: Props) => {
  //#toDo: Get the proper Nexus from previous component or from the explorer
  const nexus = { name: "", address: "0x000", chain: Chain.lol } as const;
  const vaults = apiClient.getVaults(nexus);

  const chainId = Chain.lol;
  //#toDo: can optional be edited from the user but must be unique
  const vaultId = 5;

  const ChainDeployment = apiClient.getContracts();
  const gatewayAddress = ChainDeployment.gatewayAddress;

  const { config: vaultV1FacetConfig } = usePrepareContractWrite({
    address: process.env.CONTRACTADD,
    abi: VaultV1Facet,
    functionName: "createVaultV1",
    args: [chainId, vaultId, gatewayAddress],
  });

  const { write: writeCreateVaultV1, error: errorCreateVaultV1 } =
    useContractWrite(vaultV1FacetConfig);

  const { config: setPrimaryVaultGatewayV1Config } = usePrepareContractWrite({
    address: process.env.CONTRACTADD,
    abi: VaultV1Facet,
    functionName: "setPrimaryVaultGatewayV1",
    args: [chainId, vaultId, gatewayAddress],
  });

  const {
    write: writeSetPrimaryVaultGatewayV1,
    error: errorSetPrimaryVaultGatewayV1,
  } = useContractWrite(vaultV1FacetConfig);

  return <div> Access Page</div>;
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
