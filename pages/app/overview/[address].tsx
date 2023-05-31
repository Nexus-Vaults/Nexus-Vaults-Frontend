import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../../_app';
import React, { ReactElement } from 'react';
import Layout from '../../../components/layout';
import Overview from '../../../components/app/overview';
type Props = {};

const Index: NextPageWithLayout = (props: Props) => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <div className="w-[80%] h-full py-4 px-10">
      <p>Nexus Adress: {address}</p>
      <Overview></Overview>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
