import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../../../_app';

import Layout from '../../../../components/layout';
import VaultsOverview from '../../../../components/app/vaults/vaultsoverview/VaultsOverview';

type Props = {};

const Index: NextPageWithLayout = (props: Props) => {
  return (
    <div className="w-[80%] h-full py-4 px-10">
      <VaultsOverview></VaultsOverview>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
