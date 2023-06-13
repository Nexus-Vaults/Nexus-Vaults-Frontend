import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../../../../../components/layout';
import { NextPageWithLayout } from '../../../../../_app';
import VaultRows from '../../../../../../components/app/vaults/VaultRows';

import CreateNewVaultModal from '../../../../../../components/app/modals/CreateNewVaultModal';
import { useRouter } from 'next/router';
import { apiClient, Nexus } from 'api';

const Index: NextPageWithLayout = () => {
  const router = useRouter();
  const { contractChainId, nexusAddress } = router.query;

  const contractChainIdTMP = contractChainId?.valueOf() as number;
  const add = nexusAddress as `0x${string}`;

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
    <div className="w-[80%] h-full py-4 px-10">
      {isOpened && (
        <CreateNewVaultModal
          nexusAddress={add}
          nexusContractChainId={contractChainIdTMP}
          onClose={toggle}
        />
      )}{' '}
      <div className="flex flex-col p-2 gap-10">
        <div className="flex flex-row justify-center">
          <div
            className="w-fit cursor-pointer flex items-center bg-blue50 text-white rounded-md py-1 px-2 hover:scale-105 "
            onClick={toggle}
          >
            + Create a new vault
          </div>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-row justify-between pl-20 pr-6 text-gray-400 font-medium">
            <div className="flex flex-row gap-8">
              <div>Vault Id</div>
            </div>
          </div>
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
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
