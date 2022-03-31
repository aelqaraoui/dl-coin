import * as nearAPI from "near-api-js";
import React, { useEffect, useState } from "react";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import "regenerator-runtime/runtime";
import CoinContainer from "../CoinContainer/CoinContainer";
import Header from "../Header/Header";
import RecentPlays from "../RecentPlays/RecentPlays";
import getConfig from "../../config";
// import "./../../src/global.css";
import "../modal.css";
import "./home.css";
import PlayButton from "../Core/buttons/PlayButton";
import { numberWithCommas } from "../../utils/formatValue";

const { networkId } = getConfig("mainnet");

const { utils, connect, providers } = nearAPI;

const Home = () => {
  const [status, setStatus] = useState("");

  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showFAQsModal, setShowFAQsModal] = useState(false);
  const [volume, setVolume] = useState(0);

  useEffect(async () => {
    fetch(`https://indexer-dl.herokuapp.com/api/leaderboard/volume/0`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((jsonResponse) => {
        setVolume(numberWithCommas(jsonResponse.total_volume.toFixed(2)));
      });

    const provider = new providers.JsonRpcProvider(
      "https://archival-rpc.mainnet.near.org"
    );

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = urlSearchParams.get("transactionHashes");

    const result = await provider.txStatus(
      params,
      window.walletConnection._near.config.contractName
    );

    console.log(result.receipts_outcome[0])

    setStatus(result.receipts_outcome[0].outcome.logs[3]);

    setTimeout(() => {
      setStatus("");
    }, 11000);
  }, []);

  return (
    <div className="bg-gray-10 dark:bg-blue-dark font-roboto">
      <Header />

      <div className="pb-12 relative">
        {status === "You won!" && (
          <img
            style={{
              position: "absolute",
              left: "50%",
              width: "600px",
              height: "300px",
              transform: "translateX(-50%)",
            }}
            src={require("/assets/confetti.gif")}
          />
        )}
        <div className="flex items-center text-center flex-col mt-8 dark:text-white">
          <p className="font-robotoMono text-xl">
            Welcome to DEGEN Lizards Coin Flip!
          </p>

          <div className="my-6">
            <CoinContainer flipStatus={status} />
          </div>

          {
            <div className="font-robotoMono">
              Volume Flipped: <span className="text-green">{volume} Ⓝ</span>
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
            className="roboto-mono"
          >
            <p
              className="faq-link text-blue-link dark:text-white text-xs font-bold"
              onClick={() => setShowAboutModal(true)}
            >
              ABOUT
            </p>
            <span style={{ display: "block", color: "#aaa" }}>|</span>
            <p
              className="faq-link text-blue-link dark:text-white text-xs font-bold"
              onClick={() => setShowFAQsModal(true)}
            >
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
        <div className="modal display-block roboto-mono">
          <section className="modal-main bg-white dark:bg-smooth-gray dark:text-white font-roboto">
            <div className="modal-container">
              <span className="font-bold text-xl font-robotoMono">ABOUT</span>
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

            <PlayButton onClick={() => setShowAboutModal(false)}>
              Close
            </PlayButton>
          </section>
        </div>
      )}

      {showFAQsModal && (
        <div className="modal display-block roboto-mono">
          <section className="modal-main bg-white dark:bg-smooth-gray dark:text-white font-roboto">
            <div className="modal-container">
              <span className="font-bold text-xl font-robotoMono">
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

              <PlayButton onClick={() => setShowFAQsModal(false)}>
                Close
              </PlayButton>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Home;
