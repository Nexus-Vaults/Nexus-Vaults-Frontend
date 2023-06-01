import React, { ReactElement, useState } from 'react';
import Layout from '../../../components/layout';
import { NextPageWithLayout } from '../../_app';
import VaultRows from '../../../components/app/vaults/VaultRows';
import Eth from '../../../public/images/eth.png';
import CreateNewVaultModal from '../../../components/app/modals/CreateNewVaultModal';
import fantom from '../../../public/images/chain/4002.png';
import logo1 from '../../../public/images/chain/80001.png';

const VaultList: NextPageWithLayout = () => {
  const rows = [
    {
      logo: Eth,
      version: 'V1',
      vaultId: 1,
      totalAsset: 100,
    },
    {
      logo: fantom,
      version: 'V1',
      vaultId: 2,
      totalAsset: 839,
    },
    {
      logo: logo1,
      version: 'V1',
      vaultId: 3,
      totalAsset: 690,
    },
  ];

  return rows.map((row, index) => <VaultRows key={index} {...row} />);
};

VaultList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default VaultList;
