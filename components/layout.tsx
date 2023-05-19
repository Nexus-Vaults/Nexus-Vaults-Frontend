import styles from "./layout.module.css";

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
      <main>{children}</main>
    </div>
  );
}
