import React, { ReactElement, useState } from 'react';
import Layout from '../../../components/layout';
import { NextPageWithLayout } from '../../_app';
import VaultRows from '../../../components/app/vaults/VaultRows';

type Props = {};

const VaultList: NextPageWithLayout = (props: Props) => {
  //const rows = [
  //  {
  //    logo: Eth,
  //    version: 'V1',
  //    vaultId: 1,
  //    totalAsset: 100,
  //  },
  //  {
  //    logo: fantom,
  //    version: 'V1',
  //    vaultId: 2,
  //    totalAsset: 839,
  //  },
  //  {
  //    logo: logo1,
  //    version: 'V1',
  //    vaultId: 3,
  //    totalAsset: 690,
  //  },
  //];

  return <></>;

  //return rows.map((row, index) => <VaultRows key={index} {...row} />);
};

VaultList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default VaultList;
