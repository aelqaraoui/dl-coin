import Head from "next/head";
import Image from "next/image";
import Coin from "../components/Coin";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>DEGEN Lizards</title>
        <meta name="description" content="DEGEN Lizards coin flip" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header className="header">
        <p>test.near</p>
        <p>Sign out</p>
      </header>

      <div className="main">
        <main className="body">
          <h3>Welcome to DEGEN Lizards Coin Flip!</h3>

          <Coin />

          {/* <a href="something" className="button3">
            Connect Wallet
          </a> */}
        </main>

        <footer className="footer">
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by DEGEN Lizards
          </a>
        </footer>
      </div>
    </div>
  );
}
