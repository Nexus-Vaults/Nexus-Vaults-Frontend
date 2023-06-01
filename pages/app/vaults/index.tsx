import React, { ReactElement, useState } from 'react';
import Layout from '../../../components/layout';
import { NextPageWithLayout } from '../../_app';
import VaultRows from '../../../components/app/vaults/VaultRows';
import Eth from '../../../public/images/eth.png';
import CreateNewVaultModal from '../../../components/app/modals/CreateNewVaultModal';
type Props = {};

const Index: NextPageWithLayout = (props: Props) => {
  const rows = [
    {
      logo: Eth,
      version: 'Version 1',
      vaultId: 'Vault 123',
      totalAsset: 1000,
    },
    {
      logo: Eth,
      version: 'Version 2',
      vaultId: 'Vault 456',
      totalAsset: 2000,
    },
  ];

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
              <div> Version</div>
            </div>

            <div className="">Total Amount</div>
          </div>
          {rows.map((row, index) => (
            <VaultRows key={index} {...row} />
          ))}
        </div>
      </div>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
