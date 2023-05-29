import React, { ReactElement } from 'react';
import WelcomePage from '../../components/app/WelcomePage';

import { NextPageWithLayout } from '../_app';

type Props = {};

const Index = (props: Props) => {
  return (
    <div className="flex flex-row justify-center  w-screen h-screen bg-whitesmoke">
      <WelcomePage></WelcomePage>
    </div>
  );
};

export default Index;
