import React, { useEffect, useState } from "react";
import "./Stake.css";
import BN from "bn.js";
import Header from "../Header/Header";
import "./../modal.css";
import { login } from "../../src/utils";

const options = { year: "numeric", month: "long", day: "numeric" };

const calculateRemainingTime = (dateIn, months) => {
  console.log("datein:", dateIn);
  const date = new Date(dateIn);
  var d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() != d) {
    date.setDate(0);
  }

  // get total seconds between the times
  var delta = Math.abs(date - new Date()) / 1000;

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  var seconds = delta % 60; // in theory the modulus is not required

  if (days < 1) {
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
  if (days === 0 && hours === 0) {
    return "Available";
  }

  return ` ${days} ${days === 1 ? "day" : "days"} and ${hours} ${
    hours === 1 ? "hour" : "hours"
  }`;
};

const getDate = (nanoseconds) => {
  const miliseconds = Math.round(nanoseconds / 1000000);
  const date = new Date(miliseconds);

  return date;
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
        beginDate: getDate(fundInfo[1]).toLocaleDateString("en-US", options),
        endDate: calculateRemainingTime(getDate(fundInfo[1]), 1),
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
              <div className="flex flex-col gap-12">
                <div className="flex justify-between">
                  <div className="text-left">
                    <p className="text-base">Total Staked</p>
                    <p className="text-2xl font-bold">
                      {data.totalStaked} <span className="text-lg">Ⓝ</span>
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-base">Amount staked</p>
                    <p className="text-2xl font-bold">
                      {data.fundInfo.amount} <span className="text-lg">Ⓝ</span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base">Time to unlock</span>
                  <span className="text-xl">{data.fundInfo.endDate}</span>
                </div>

                <div className="flex gap-4">
                  <button
                    className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 rounded text-sm rounded-lg transition duration-150 ease-in-out"
                    onClick={() => setShowStakeModal(true)}
                  >
                    Stake
                  </button>
                  <button
                    className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 rounded text-sm rounded-lg transition duration-150 ease-in-out"
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
              </div>
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
