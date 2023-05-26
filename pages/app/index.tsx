import React, { ReactElement } from 'react';
import WelcomePage from '../../components/app/WelcomePage';
import Layout from '../../components/layout';
import { NextPageWithLayout } from '../_app';

type Props = {};

const Index: NextPageWithLayout = (props: Props) => {
  return <WelcomePage></WelcomePage>;
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
