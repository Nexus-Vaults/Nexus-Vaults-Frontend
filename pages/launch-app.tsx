import React from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Navbar from "../components/navbar/navbar.js";
import { Profile } from "../components/profile";
import { SendTransaction } from "../components/transaction/send-transaction";

type Props = {};

const Index = (props: Props) => {
  return (
    <div>
      <Profile />
      <SendTransaction />
    </div>
  );
};

export default Index;
