import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../../../../../_app';
import React, { ReactElement, useContext, useState } from 'react';
import Overview from '../../../../../../components/app/overview';
import Layout from '../../../../../../components/layout';
type Props = {};

const Index: NextPageWithLayout = (props: Props) => {
  const router = useRouter();
  const { contractChainId, nexusAddress } = router.query;

  const contractChainIdTMP = contractChainId?.valueOf() as number;
  const add = nexusAddress as `0x${string}`;

  return (
    <>
      {typeof contractChainId === 'string' &&
        typeof nexusAddress === 'string' && (
          <div className="w-[80%] h-full py-4 px-10">
            <Overview contractChainId={contractChainIdTMP!} address={add} />
          </div>
        )}
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
