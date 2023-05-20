import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Nexus Vaults";
export const siteTitle = "Nexus Vaults";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div className={styles.container}>
       <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Create a cross-chain treasury using Nexus Vaults"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}>
      </header>
      <main>{children}</main>
    </div>
  );
}
