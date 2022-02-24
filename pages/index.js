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
        <div className="first-col">
          <p>test.near</p>
          <p className="available-near">10.2 Ⓝ</p>
        </div>
        <p className="sign-out">Sign out</p>
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

          <div className="social-icons">
            <a
              href="https://twitter.com/DegenLizards"
              target={"_blank"}
              rel="noreferrer"
            >
              <FaTwitter
                style={{
                  fontSize: "32px",
                  color: "#0d6efd",
                  cursor: "pointer",
                }}
              ></FaTwitter>
            </a>

            <a
              href="https://discord.gg/dQfQ9gYqKb"
              target={"_blank"}
              rel="noreferrer"
            >
              <FaDiscord
                style={{
                  fontSize: "32px",
                  color: "#5865f2",
                  cursor: "pointer",
                }}
              ></FaDiscord>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
