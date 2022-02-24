import Head from "next/head";
import Coin from "../components/Coin";
import { FaDiscord, FaTwitter } from "react-icons/fa";

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
        <div style={{ display: "flex", gap: "12px", alignItems: "baseline" }}>
          <p>test.near</p>
          <p style={{ color: "green", fontSize: "12px" }}>10.2 Ⓝ</p>
        </div>
        <p style={{ color: "red", cursor: "pointer" }}>Sign out</p>
      </header>

      <div className="main">
        <main className="body">
          <h3>Welcome to DEGEN Lizards Coin Flip!</h3>

          <div style={{ marginTop: "24px" }}>
            <Coin />
          </div>

          {/* <a href="something" className="button3">
            Connect Wallet
          </a> */}

          <div
            style={{
              display: "flex",
              marginTop: "24px",
              gap: "16px",
            }}
          >
            <FaDiscord
              style={{ fontSize: "32px", color: "#5865f2", cursor: "pointer" }}
            ></FaDiscord>
            <FaTwitter
              style={{ fontSize: "32px", color: "#0d6efd", cursor: "pointer" }}
            ></FaTwitter>
          </div>
        </main>

        {/* <footer className="footer">
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by DEGEN Lizards
          </a>
        </footer> */}
      </div>
    </div>
  );
}
