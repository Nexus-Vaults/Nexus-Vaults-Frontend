import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../../_app';
import React, { ReactElement } from 'react';
import Layout from '../../../components/layout';
type Props = {};

const Index: NextPageWithLayout = (props: Props) => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <div>
      <p>Nexus Adress: {address}</p>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
