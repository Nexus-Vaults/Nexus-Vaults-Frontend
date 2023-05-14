import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Navbar from "../components/navbar/navbar.js";
import { Profile } from "../components/profile";
import { SendTransaction } from "../components/transaction/send-transaction";

export default function Home() {
  return (
    <Layout home>
      <Navbar></Navbar>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Welcome to Nexus Vaults! Please connect your wallet</p>
      </section>
      <Profile />
      <SendTransaction />
    </Layout>
  );
}
