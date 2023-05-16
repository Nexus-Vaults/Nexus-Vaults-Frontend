import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Navbar from "../components/navbar/navbar.js";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Navbar></Navbar>
      <Layout>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <div>
          <button onClick={() => router.push("/app")}>Launch app</button>
        </div>
      </Layout>
    </>
  );
}