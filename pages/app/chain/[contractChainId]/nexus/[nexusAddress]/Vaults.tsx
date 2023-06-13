import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../../../../../components/layout';
import { NextPageWithLayout } from '../../../../../_app';
import VaultRows from '../../../../../../components/app/vaults/VaultRows';

import CreateNewVaultModal from '../../../../../../components/app/modals/CreateNewVaultModal';
import { useRouter } from 'next/router';
import { apiClient, Nexus } from 'api';
import { Address } from 'viem';
import LoadingAnimation from '../../../../../../components/app/utils/LoadingAnimation';

const Index: NextPageWithLayout = () => {
  const router = useRouter();
  const { contractChainId, nexusAddress } = router.query;

  const contractChainIdTMP = contractChainId?.valueOf() as number;
  const add = nexusAddress as Address;

  const [nexus, setNexus] = useState<Nexus>();

  useEffect(() => {
    apiClient.getNexusOverview(contractChainIdTMP, add).then((nexus) => {
      setNexus(nexus);
    });
  }, []);

  const [isOpened, setIsOpened] = useState(false);

  function toggle() {
    setIsOpened(!isOpened);
  }

  return (
    <div className="w-[80%] mt-6 grid grid-cols-1 auto-rows-max gap-2">
      {isOpened && (
        <CreateNewVaultModal
          nexusAddress={add}
          nexusContractChainId={contractChainIdTMP}
          onClose={toggle}
        />
      )}

      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl">Your Vaults</h1>
        <button
          className="w-fit cursor-pointer flex items-center bg-blue50 text-white rounded-md py-1 px-2 hover:scale-105 "
          onClick={toggle}
        >
          + Create a new vault
        </button>
      </div>

      <hr className="border-black border-2"></hr>

      {nexus == null && (
        <div className="flex flex-col items-center">
          <div className="w-3/5 md:w-1/3 xl:w-1/6">
            <LoadingAnimation></LoadingAnimation>
          </div>
        </div>
      )}

      {nexus?.subchains.flatMap((x) => x.vaults)?.length == 0 && (
        <div>
          <p>You have no vaults...</p>
        </div>
      )}

      <div className="grid grid-cols-1">
        {nexus?.subchains.map((subchain) =>
          subchain.vaults.map((vault) => (
            <VaultRows
              contractChainId={subchain.contractChainId}
              key={
                subchain.contractChainId.toString() + vault.vaultId.toString()
              }
              vaultId={vault.vaultId}
              address={vault.vault}
              totalAsset={0}
            ></VaultRows>
          ))
        )}
      </div>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
