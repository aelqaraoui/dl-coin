import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { login, logout } from "./utils";
import "./global.css";
import BN from "bn.js";
import "./home.css";
import "./modal.css";
import { FaDiscord, FaTwitter, FaMoon } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";

import getConfig from "./config";
const { networkId } = getConfig("testnet");

import * as nearAPI from "near-api-js";
const { utils, connect, providers } = nearAPI;

import animationData from "./lotties/coins";
import CoinContainer from "./CoinContainer";
import RecentPlays from "./RecentPlays";

export default function App() {
  function clicked1N() {
    setAmount(1);
  }
  function clicked2N() {
    setAmount(2);
  }

  // when the user has not yet interacted with the form, disable the button
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = React.useState(false);

  const [amount, setAmount] = React.useState(1);

  const [balance, setBalance] = React.useState(0);
  const [contractBalance, setContractBalance] = React.useState(0);

  const [totalVolume, setTotalVolume] = React.useState(0);

  const [status, setStatus] = React.useState("");

  const [leaderboard, setLeaderboard] = React.useState([]);

  const [isStopped, setIsStopped] = React.useState(true);

  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showFAQsModal, setShowFAQsModal] = useState(false);

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState(defaultDark ? "dark" : "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // if not signed in, return early with sign-in prompt
  // if (!window.walletConnection.isSignedIn()) {
  //   return (
  //     <main>
  //       <h1>Welcome to DEGEN Lizards' CASINO!</h1>
  //       <p style={{ textAlign: "center", marginTop: "2.5em" }}>
  //         <button onClick={login}>Sign in</button>
  //       </p>
  //     </main>
  //   );
  // }

  React.useEffect(async () => {
    setBalance(
      (await window.walletConnection._connectedAccount.getAccountBalance())
        .available / 1000000000000000000000000
    );

    const near = await connect(window.walletConnection._near.config);
    const account = await near.account(
      window.walletConnection._near.config.contractName
    );

    console.log(account);
    setContractBalance(
      (await account.getAccountBalance()).available / 1000000000000000000000000
    );
    /*
    fetch('https://leaderboard-degen.vercel.app/api/indexer').then(function(response) {
      return response.json();
    }).then(async function(data) {
      console.log(data)

      let totalVolumepl = 0;

      console.log(data.slice(0, 10))
      setLeaderboard(data.slice(0, 10))

      data.forEach(val => {
        totalVolumepl += parseInt(val[1])
      })



      setTotalVolume(totalVolumepl)

      
    }).catch(function() {
      console.log("Booo");
    });
*/
    const provider = new providers.JsonRpcProvider(
      "https://archival-rpc.testnet.near.org"
    );

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = urlSearchParams.get("transactionHashes");

    console.log(params);

    const result = await provider.txStatus(
      params,
      window.walletConnection._near.config.contractName
    );

    setStatus(result.receipts_outcome[0].outcome.logs[3]);

    console.log(result.receipts_outcome[0].outcome.logs[3]);

    setTimeout(() => {
      setStatus("");
    }, 11000);
  }, []);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <div className="container" data-theme={theme}>
      <div className="header">
        <div className="first-col" style={{ flex: "1 1 0" }}>
          {window.walletConnection.isSignedIn() && (
            <>
              <p>{window.accountId}</p>
              <p className="available-near">{balance.toFixed(2)} Ⓝ</p>{" "}
            </>
          )}
        </div>
        <div
          style={{
            flex: "1 1 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {theme === "dark" ? (
            <BsFillSunFill
              style={{
                fontSize: "16px",
                cursor: "pointer",
                color: "white",
              }}
              onClick={() => setTheme("light")}
            ></BsFillSunFill>
          ) : (
            <FaMoon
              style={{
                fontSize: "16px",
                cursor: "pointer",
              }}
              onClick={() => setTheme("dark")}
            ></FaMoon>
          )}
        </div>
        <div style={{ flex: "1 1 0", textAlign: "end" }}>
          {window.walletConnection.isSignedIn() && (
            <p className="sign-out" onClick={logout}>
              Sign out
            </p>
          )}
        </div>
      </div>

      <div className="main">
        <div className="body">
          <h3>Welcome to DEGEN Lizards Coin Flip!</h3>

          <div style={{ marginTop: "24px" }}>
            <CoinContainer flipStatus={status} />
          </div>

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
                their NEAR tokens. Odds are 50/50 with a 3% fee.
              </p>
              <p className="modal-question">How will casino games be?</p>
              <p className="modal-answer">
                The games in the casino will be 50/50 odds with 3% fee only.
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

      {/* <button className="link" style={{ float: 'right' }} onClick={logout}>
        Sign out
      </button>
      <main>
        <h1>Welcome to DEGEN Lizards' CASINO!</h1>
        <div className='text'>
          <p>{window.accountId}</p>
          <p id='balance'>Balance : {balance.toFixed(2)}</p>
          <p id='contract-balance'>Contract Balance : {contractBalance.toFixed(2)}</p>

          <p id="status">{status}</p>

        </div>
        
        <form onSubmit={async event => {
          event.preventDefault()

          setButtonDisabled(true)

          setIsStopped(false)


          try {
            // make an update call to the smart contract
            await window.contract.play(
              {},
              100000000000000,
              (new BN('1035000000000000000000000', 10)).mul(new BN((amount).toString(), 10))
            )
          } catch (e) {
            alert(
              'Something went wrong! ' +
              'Maybe you need to sign out and back in? ' +
              'Check your browser console for more info.'
            )
            throw e
          } finally {
            // re-enable the form, whether the call succeeded or failed
            setButtonDisabled(false)
          }

          // show Notification
          setShowNotification(true)

          // remove Notification again after css animation completes
          // this allows it to be shown again next time the form is submitted
          setTimeout(() => {
            setShowNotification(false)
          }, 11000)
        }}>
          <fieldset id="fieldset">
            
            <div style={{ display: 'flex' }}>

              <button
                disabled={buttonDisabled}
                onClick={clicked1N}
                className='1n'
                style={{ borderRadius: '0 5px 5px 0' }}
              >
                1N
              </button>

              <button
                disabled={buttonDisabled}
                onClick={clicked2N}
                className='2n'
                style={{ borderRadius: '0 5px 5px 0' }}
              >
                2N
              </button>

            </div>
          </fieldset>
        </form>

        <Lottie style={{display: isStopped ? 'none' : 'block'}}
	    options={defaultOptions}
        height={400}
        width={400}
        isStopped={isStopped}
      />

        <br/><br/>
{/*
        <h3 className='text'>TOTAL VOLUME : {totalVolume}</h3>
        <br/>
        <h3 className='text'>LEADERBOARD (BY VOLUME)</h3>
        <table className='leaderboard'>
          <tbody>
            <br/>
            {
              leaderboard.map(val => 
                (
                  <tr>
                    <th>{val[0]}</th>
                    <th> </th>
                    <th>{val[1]}</th>
                  </tr>
                )
              )
            }

          </tbody>
        </table>
                <br/><br/>
        
      </main>
*/}
    </div>
  );
}
