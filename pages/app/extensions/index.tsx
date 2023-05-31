import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../../_app';
import Layout from '../../../components/layout';

type Props = {};

const Index: NextPageWithLayout = (props: Props) => {
  return (
    <div className="w-[80%] h-full py-4 px-10">
      <h1>Extensions</h1>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
