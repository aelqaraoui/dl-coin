import BN from "bn.js";
import React, { useState } from "react";
import Lottie from "react-lottie";
import coinAnimationX from "../../lotties/coinflipX.json";
import coinAnimationY from "../../lotties/coinflipY.json";
import lostAnimation from "../../lotties/Loss.json";
import winAnimation from "../../lotties/win2.json";
import { login } from "../../utils";
import PlayButton from "../Core/buttons/PlayButton";
import "./coinContainer.css";
import lizard from "./lizard.png";
import near from "./near.png";

const CoinContainer = ({ flipStatus }) => {
  const [selectedSide, setSelectedSide] = useState("heads");
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [showLoading, setShowLoading] = useState(false);

  return (
    <div>
      <div className="coin-container bg-white dark:bg-smooth-gray dark:text-white">
        {flipStatus.length < 1 && (
          <div
            style={{
              position: "relative",
              width: "280px",
              height: "250px",
              margin: "0 auto",
            }}
          >
            {!window.walletConnection.isSignedIn() && (
              <Lottie
                width={200}
                height={200}
                style={{
                  // margin: "-10% auto",
                  left: "50%",
                  position: "absolute",
                  transform: "translateX(-50%)",
                }}
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: coinAnimationY,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                // isClickToPauseDisabled
                isStopped={!showLoading && window.walletConnection.isSignedIn()}
                speed={0.45}
              ></Lottie>
            )}
            {window.walletConnection.isSignedIn() && showLoading && (
              <Lottie
                width={150}
                height={150}
                style={{
                  // margin: "-10% auto",
                  left: "50%",
                  position: "absolute",
                  transform: "translateX(-50%)",
                }}
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: coinAnimationX,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                speed={0.9}
              ></Lottie>
            )}
            {window.walletConnection.isSignedIn() && !showLoading && (
              <img
                className="m-auto"
                src={selectedSide === "heads" ? lizard : near}
                width={170}
                height={170}
              />
            )}
          </div>
        )}

        {!window.walletConnection.isSignedIn() && (
          <div style={{ marginTop: "-40px" }}>
            <span>Connect your wallet and start playing!</span>
            <button
              className="mt-16 bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 rounded text-sm rounded-lg transition duration-150 ease-in-out"
              onClick={login}
            >
              Sign in
            </button>
          </div>
        )}

        {window.walletConnection.isSignedIn() && flipStatus.length < 1 && (
          <div style={{ marginTop: "-60px" }}>
            <div className="chip-group" role="radiogroup">
              <div
                className={`chip rounded-full hover:bg-gold-yellow hover:text-black w-24 justify-center ${
                  selectedSide === "heads"
                    ? "active bg-gold-yellow text-black"
                    : "bg-smooth-yellow text-gray-40"
                } chip-checkbox transition duration-500 ease-in-out text-sm font-bold`}
                aria-labelledby="radioOneLabel"
                role="radio"
                aria-checked="false"
                onClick={() => setSelectedSide("heads")}
              >
                <input type="radio" name="radioEx" />
                <span id="radioOneLabel">Heads</span>
              </div>
              <div
                className={`chip rounded-full hover:bg-gold-yellow hover:text-black w-24 justify-center ${
                  selectedSide === "tails"
                    ? "active bg-gold-yellow text-black"
                    : "bg-smooth-yellow text-gray-40"
                } chip-checkbox transition duration-500 ease-in-out text-sm font-bold`}
                aria-labelledby="radioTwoLabel"
                role="radio"
                aria-checked="false"
                onClick={() => setSelectedSide("tails")}
              >
                <input type="radio" name="radioEx" />
                <span id="radioTwoLabel">Tails</span>
              </div>
            </div>

            <div className="mt-6 mb-12">
              <span className="block mb-3">Select the Ⓝ amount to flip</span>
              <div
                className="flex gap-3 justify-center dark:text-blue-dark"
                role="radiogroup"
              >
                <div
                  className={`near-amount px-2 py-1 rounded hover:bg-gold-yellow hover:text-black cursor-pointer ${
                    selectedAmount === 1
                      ? "bg-gold-yellow text-black"
                      : "bg-smooth-yellow text-gray-40"
                  } transition duration-500 ease-in-out`}
                  onClick={() => setSelectedAmount(1)}
                >
                  <input type="radio" name="radioEx" />
                  <span id="onenear">1 Ⓝ</span>
                </div>
                <div
                  className={`near-amount px-2 py-1 rounded hover:bg-gold-yellow hover:text-black cursor-pointer ${
                    selectedAmount === 2
                      ? "bg-gold-yellow text-black"
                      : "bg-smooth-yellow text-gray-40"
                  } transition duration-500 ease-in-out`}
                  onClick={() => setSelectedAmount(2)}
                >
                  <input type="radio" name="radioEx" />
                  <span id="twonear">2 Ⓝ</span>
                </div>
                <div
                  className={`near-amount px-2 py-1 rounded hover:bg-gold-yellow hover:text-black cursor-pointer ${
                    selectedAmount === 3
                      ? "bg-gold-yellow text-black"
                      : "bg-smooth-yellow text-gray-40"
                  } transition duration-500 ease-in-out`}
                  onClick={() => setSelectedAmount(3)}
                >
                  <input type="radio" name="radioEx" />
                  <span id="threenear">3 Ⓝ</span>
                </div>
                <div
                  className={`near-amount px-2 py-1 rounded hover:bg-gold-yellow hover:text-black cursor-pointer ${
                    selectedAmount === 4
                      ? "bg-gold-yellow text-black"
                      : "bg-smooth-yellow text-gray-40"
                  } transition duration-500 ease-in-out`}
                  onClick={() => setSelectedAmount(4)}
                >
                  <input type="radio" name="radioEx" />
                  <span id="fournear">4 Ⓝ</span>
                </div>
                <div
                  className={`near-amount px-2 py-1 rounded hover:bg-gold-yellow hover:text-black cursor-pointer ${
                    selectedAmount === 5
                      ? "bg-gold-yellow text-black"
                      : "bg-smooth-yellow text-gray-40"
                  } transition duration-500 ease-in-out`}
                  onClick={() => setSelectedAmount(5)}
                >
                  <input type="radio" name="radioEx" />
                  <span id="fivenear">5 Ⓝ</span>
                </div>
              </div>
            </div>

            <PlayButton
              onClick={async (event) => {
                if (!selectedSide) return;
                event.preventDefault();

                setShowLoading(true);

                await setTimeout(() => {
                  try {
                    window.contract.play(
                      {},
                      100000000000000,
                      new BN("1035000000000000000000000", 10).mul(
                        new BN(selectedAmount.toString(), 10)
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
                    setShowLoading(false);
                  }
                }, 2000);
              }}
            >
              {showLoading ? "Loading..." : "Double or Nothing"}
            </PlayButton>
          </div>
        )}
        {flipStatus.length > 0 && (
          <>
            {flipStatus === "You won!" ? (
              <>
                <div
                  style={{
                    position: "relative",
                    width: "280px",
                    height: "250px",
                    margin: "0 auto",
                  }}
                >
                  <Lottie
                    width={400}
                    height={400}
                    style={{
                      width: "150%",
                      height: "115%",
                      margin: "-10% auto",
                      left: "50%",
                      position: "absolute",
                      transform: "translateX(-50%)",
                    }}
                    options={{
                      loop: false,
                      autoplay: true,
                      animationData: winAnimation,
                      rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                      },
                    }}
                  ></Lottie>
                </div>

                <div className="mt-3 mb-8 font-bold text-xl">{flipStatus}</div>

                <PlayButton onClick={() => (window.location.href = "/")}>
                  Play again
                </PlayButton>
              </>
            ) : (
              <>
                <div
                  style={{
                    position: "relative",
                    width: "280px",
                    height: "250px",
                    margin: "0 auto",
                  }}
                >
                  <Lottie
                    width={400}
                    height={400}
                    style={{
                      width: "150%",
                      height: "115%",
                      margin: "-10% auto",
                      left: "50%",
                      position: "absolute",
                      transform: "translateX(-50%)",
                    }}
                    options={{
                      loop: false,
                      autoplay: true,
                      animationData: lostAnimation,
                      rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                      },
                    }}
                  ></Lottie>
                </div>
                <div className="mt-3 mb-8 font-bold text-xl">{flipStatus}</div>
                <PlayButton onClick={() => (window.location.href = "/")}>
                  Try again
                </PlayButton>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoinContainer;
