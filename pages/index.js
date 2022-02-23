import Head from "next/head";
import Image from "next/image";
import Coin from "../components/Coin";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>DEGEN Lizards</title>
        <meta name="description" content="DEGEN Lizards coin flip" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <p>JOAO</p>
      </header>

      <main className={styles.main}>
        <h3>Welcome to DEGEN Lizards Coin Flip!</h3>

        <Coin />

        <button>Connect Wallet</button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
