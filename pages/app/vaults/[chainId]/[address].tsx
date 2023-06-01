import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../../../components/layout';
import { NextPageWithLayout } from '../../../_app';
import VaultRows from '../../../../components/app/vaults/VaultRows';
import Eth from '../../../../public/images/chain/137.png';
import fantom from '../../../public/images/chain/250.png';
import logo1 from '../../../public/images/chain/1284.png';
import CreateNewVaultModal from '../../../../components/app/modals/CreateNewVaultModal';
import { useRouter } from 'next/router';
import { apiClient, Nexus, SubChain, Vault, VaultInfo } from 'api';
import VaultList from '../VaultList';

const Index: NextPageWithLayout = () => {
  const router = useRouter();
  const { chainId, address } = router.query;

  const contractChainId = chainId?.valueOf() as number;
  const add = address as `0x${string}`;

  const [nexus, setNexus] = useState<Nexus>();
  const [subChains, setSubChains] = useState<SubChain[]>([]);
  const [vaultInfos, setVaultInfos] = useState<VaultInfo[]>([]);

  useEffect(() => {
    apiClient.getNexusOverview(contractChainId, add).then((nexus) => {
      setNexus(nexus);
    });
  }, []);

  useEffect(() => {
    if (nexus == undefined) return;
    const subChainsTMP: SubChain[] = [];
    nexus?.subchains.map((x) => subChainsTMP.push(x));
    setSubChains(subChainsTMP);
    if (subChains == undefined) return;
    const vaultInfosTMP = subChains.reduce(
      (x, y) => x.concat(y.vaults),
      [] as VaultInfo[]
    );
    console.log(subChainsTMP);
    setVaultInfos(vaultInfosTMP);
  }, [nexus]);

  const [isOpened, setIsOpened] = useState(false);

  function toggle() {
    setIsOpened(!isOpened);
  }

  return (
    <div className="w-[80%] h-full py-4 px-10">
      {isOpened && <CreateNewVaultModal onClose={toggle} />}{' '}
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

            <div className="">Total Amount (coming soon)</div>
          </div>
          {vaultInfos.map((vaultInfo, index) => (
            <VaultRows
              logo={Eth}
              key={index}
              vaultId={vaultInfo.vaultId}
              address={vaultInfo.address}
              totalAsset={1000}
            />
          ))}
        </div>
      </div>
      {vaultInfos.length == 0 && <VaultList />}
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
