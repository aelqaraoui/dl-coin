import * as nearAPI from "near-api-js";
import React, { useEffect, useState } from "react";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import "regenerator-runtime/runtime";
import CoinContainer from "../CoinContainer/CoinContainer";
import Header from "../Header/Header";
import RecentPlays from "../RecentPlays/RecentPlays";
import getConfig from "./../../src/config";
import "./../../src/global.css";
import "./../modal.css";
import "./home.css";

const { networkId } = getConfig("mainnet");

const { utils, connect, providers } = nearAPI;

const Home = () => {
  const [status, setStatus] = useState("");

  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showFAQsModal, setShowFAQsModal] = useState(false);
  const [feesBalance, setFeesBalance] = useState(0);

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState(defaultDark ? "dark" : "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(async () => {
    // const near = await connect(window.walletConnection._near.config);

    // const feesAccount = await near.account("fees.woothugg.near");
    // setFeesBalance(
    //   (await feesAccount.getAccountBalance()).available /
    //     1000000000000000000000000
    // );

    const provider = new providers.JsonRpcProvider(
      "https://archival-rpc.testnet.near.org"
    );

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = urlSearchParams.get("transactionHashes");

    const result = await provider.txStatus(
      params,
      window.walletConnection._near.config.contractName
    );

    setStatus(result.receipts_outcome[0].outcome.logs[5]);

    setTimeout(() => {
      setStatus("");
    }, 11000);
  }, []);

  return (
    <div className="container" data-theme={theme}>
      <Header theme={theme} setTheme={setTheme} />

      <div className="main">
        {status === "You won!" && (
          <img
            style={{
              position: "absolute",
              width: "50%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            src={require("/assets/confetti.gif")}
          />
        )}

        <div className="body">
          <h3>Welcome to DEGEN Lizards Coin Flip!</h3>

          <div style={{ marginTop: "24px", marginBottom: "24px" }}>
            <CoinContainer flipStatus={status} />
          </div>

          {
            <div>
              Fees Balance:{" "}
              <span style={{ color: "green", fontWeight: "bold" }}>
                {feesBalance} Ⓝ
              </span>
            </div>
          }

          <RecentPlays />

          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              marginTop: "24px",
              fontSize: "14px",
            }}
          >
            <p className="faq-link" onClick={() => setShowAboutModal(true)}>
              ABOUT
            </p>
            <span style={{ display: "block", color: "#aaa" }}>|</span>
            <p className="faq-link" onClick={() => setShowFAQsModal(true)}>
              FAQs
            </p>
          </div>
          <div className="social-icons">
            <a
              href="https://paras.id/collection/degenlizard.near"
              target={"_blank"}
              rel="noreferrer"
            >
              <img width={32} src={require("/assets/paras.png")} />
            </a>
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
        </div>
      </div>

      {showAboutModal && (
        <div className="modal display-block">
          <section className="modal-main">
            <div className="modal-container">
              <span className="modal-title">ABOUT</span>
              <p className="modal-question">What is Degen Lizards?</p>
              <p className="modal-answer">
                DEGEN Lizards is an NFT project aiming to build NEAR's first
                casino and share 100% of the profits from the casino with our
                holders. We're not just another coin flip project there will be
                other games that you can play in our casino.
              </p>
              <p className="modal-answer" style={{ marginBottom: "0" }}>
                There will be only DEGEN Lizards.
              </p>
            </div>
            <div
              className="double-btn active"
              style={{ textAlign: "center" }}
              onClick={() => setShowAboutModal(false)}
            >
              Close
            </div>
          </section>
        </div>
      )}

      {showFAQsModal && (
        <div className="modal display-block">
          <section className="modal-main">
            <div className="modal-container">
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Frequently Asked Questions
              </span>
              <p className="modal-question">
                What is Degen Lizards Coin Flip game?
              </p>
              <p className="modal-answer">
                It's a game that allows users to play Double or Nothing with
                their NEAR tokens. Odds are 50/50 with a 3.5% fee.
              </p>
              <p className="modal-question">How will casino games be?</p>
              <p className="modal-answer">
                The games in the casino will be 50/50 odds with 3.5% fee only.
              </p>
              <p className="modal-question">
                When will the casino be launched?
              </p>
              <p className="modal-answer">
                Games will be rolled out as we build them. We're focusing on
                having the best player experience since more volume means more
                profits and more value to our holders.
              </p>
              <p className="modal-question">Where can I track transactions?</p>
              <p className="modal-answer">
                House Wallet:{" "}
                <a
                  className="faq-link"
                  href="https://explorer.near.org/accounts/house.woothugg.near"
                  target={"_blank"}
                >
                  https://explorer.near.org/accounts/house.woothugg.near
                </a>
              </p>
              <p className="modal-answer">
                Fee Wallet:{" "}
                <a
                  className="faq-link"
                  href="https://explorer.mainnet.near.org/accounts/fees.woothugg.near"
                  target={"_blank"}
                >
                  https://explorer.mainnet.near.org/accounts/fees.woothugg.near
                </a>
              </p>
              <p className="modal-answer">
                Team Wallet:{" "}
                <a
                  className="faq-link"
                  href="https://explorer.mainnet.near.org/accounts/team.woothugg.near"
                  target={"_blank"}
                >
                  https://explorer.mainnet.near.org/accounts/team.woothugg.near
                </a>
              </p>
              <p className="modal-answer">
                If you still have questions, join our discord and talk to the
                team.{" "}
                <a
                  className="faq-link"
                  href="https://discord.com/invite/dQfQ9gYqKb"
                  target={"_blank"}
                >
                  https://discord.com/invite/dQfQ9gYqKb
                </a>
              </p>
            </div>

            <div
              className="double-btn active"
              style={{ textAlign: "center" }}
              onClick={() => setShowFAQsModal(false)}
            >
              Close
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Home;
