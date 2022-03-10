import React, { useEffect, useState } from "react";
import "./Stake.css";
import BN from "bn.js";
import Header from "../Header/Header";
import "./../modal.css";
import { login } from "../../src/utils";

const options = { year: "numeric", month: "long", day: "numeric" };

const addMonths = (dateIn, months) => {
  const date = new Date(dateIn);
  var d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date.toLocaleDateString("en-US", options);
};

const getDate = (nanoseconds) => {
  const miliseconds = Math.round(nanoseconds / 1000000);
  const date = new Date(miliseconds);

  return date.toLocaleDateString("en-US", options);
};

const Stake = () => {
  const [data, setData] = useState({
    totalStaked: "",
    fundInfo: {
      amount: "",
      beginDate: "",
      endDate: "",
    },
  });
  const [stakeAmount, setStakeAmount] = useState(0);
  const [showStakeModal, setShowStakeModal] = useState(false);

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState(defaultDark ? "dark" : "light");

  useEffect(async () => {
    const maxBet = await window.contract.get_max_bet();
    const fundInfo = await window.contract.get_fund_info();

    setData({
      totalStaked: (parseFloat(maxBet) / 1e24) * 500,
      fundInfo: {
        amount: parseFloat(fundInfo[0]) / 1e24,
        beginDate: getDate(fundInfo[1]),
        endDate: addMonths(getDate(fundInfo[1]), 1),
      },
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <div
        className="container"
        style={{ paddingBottom: "24px" }}
        data-theme={theme}
      >
        <Header theme={theme} setTheme={setTheme} />
        <div className="body">
          <h3
            className="roboto-mono"
            style={{ fontWeight: "bold", marginBottom: "24px" }}
          >
            DEGEN Staking
          </h3>

          <div className="App">
            {!window.walletConnection.isSignedIn() && (
              <div style={{ marginTop: "36px" }}>
                <span style={{ fontSize: "14px" }}>
                  Connect your wallet and start staking!
                </span>
                <div className="double-btn active" onClick={login}>
                  Sign in
                </div>
              </div>
            )}
            {window.walletConnection.isSignedIn() && (
              <>
                <div
                className="flex gap-2 mb-4"
                  // style={{
                  //   display: "flex",
                  //   gap: "8px",
                  //   marginBottom: "24px",
                  // }}
                >
                  <div style={{ display: "flex" }}>
                    <span>Total Staked: </span>
                    <span>{data.totalStaked} Ⓝ</span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Amount staked: </span>
                    <span>{data.fundInfo.amount} Ⓝ</span>
                  </div>
                  {/* <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Start Date: </span>
                    <span>{data.fundInfo.beginDate}</span>
                  </div> */}
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Remaining time to unlock: </span>
                    <span>{data.fundInfo.endDate}</span>
                  </div>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button onClick={() => setShowStakeModal(true)}>Stake</button>
                  <button
                    onClick={async (event) => {
                      event.preventDefault();

                      await setTimeout(() => {
                        try {
                          window.contract.unfund({}, 30000000000000);
                        } catch (e) {
                          alert(
                            "Something went wrong! " +
                              "Maybe you need to sign out and back in? " +
                              "Check your browser console for more info."
                          );
                          throw e;
                        } finally {
                        }
                      }, 2000);
                    }}
                  >
                    Unstake
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {showStakeModal && (
        <div className="modal display-block">
          <section className="modal-main">
            <div className="modal-container">
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Stake
              </span>
              <p className="modal-question">
                Please insert the amount you want to stake.
              </p>
              <input
                type="number"
                onChange={(e) => setStakeAmount(e.target.value)}
              />
            </div>

            <div
              className="double-btn active"
              style={{ textAlign: "center" }}
              onClick={() => setShowStakeModal(false)}
            >
              Cancel
            </div>
            <div
              className="double-btn active"
              style={{ textAlign: "center" }}
              onClick={async (event) => {
                event.preventDefault();

                await setTimeout(() => {
                  try {
                    window.contract.fund(
                      {},
                      100000000000000,
                      new BN("1035000000000000000000000", 10).mul(
                        new BN(stakeAmount.toString(), 10)
                      )
                    );
                  } catch (e) {
                    alert(
                      "Something went wrong! " +
                        "Maybe you need to sign out and back in? " +
                        "Check your browser console for more info."
                    );
                    throw e;
                  } finally {
                  }
                }, 2000);
              }}
            >
              Stake
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Stake;
