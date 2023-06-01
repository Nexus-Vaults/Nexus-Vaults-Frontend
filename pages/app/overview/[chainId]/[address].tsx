import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../../../_app';
import React, { ReactElement } from 'react';
import Overview from '../../../../components/app/overview';
type Props = {};

const Index: NextPageWithLayout = (props: Props) => {
  const router = useRouter();
  const { chainId, address } = router.query;

  const contractChainId = chainId?.valueOf() as number;
  const add = address as `0x${string}`;

  return (
    <>
      {typeof chainId === 'string' &&
        typeof address === 'string' &&
        contractChainId != undefined && (
          <div className="w-[80%] h-full py-4 px-10">
            <Overview contractChainId={contractChainId!} address={add} />
          </div>
        )}
    </>
  );
};

export default Index;
