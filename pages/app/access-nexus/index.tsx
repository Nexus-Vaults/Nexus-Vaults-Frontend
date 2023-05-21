import React, { ReactElement } from "react";
import Layout from "../../../components/layout";
import { NextPageWithLayout } from "../../_app";

type Props = {};

const Index: NextPageWithLayout = (props: Props) => {
  return <div> Access Page</div>;
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
