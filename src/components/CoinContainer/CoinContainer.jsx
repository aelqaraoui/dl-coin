import BN from "bn.js";
import React, { useState, useEffect } from "react";
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
  const [betsArray, setBetsArray] = useState([1, 2, 3, 4, 5]);

  useEffect(async () => {
    const maxBet = await window.contract.get_max_bet();
    const maxBetFinal = Math.floor(parseFloat(maxBet) / 1e24);

    if (maxBetFinal > 5) {
      let aux = [];
      for (let i = 6; i <= maxBetFinal; i++) {
        aux.push(i);
      }
      setBetsArray(betsArray.concat(aux));
    }
  }, []);

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
            <p className="mb-16">Connect your wallet and start playing!</p>
            <PlayButton onClick={login}>Sign in</PlayButton>
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
              <span className="block w-2/3 m-auto mb-3 text-sm md:text-base">
                Select the Ⓝ amount to flip
              </span>
              <div className="w-2/3 m-auto">
                <input
                  type="range"
                  min="0"
                  max={(betsArray.length - 1).toString()}
                  step="1"
                  defaultValue={0}
                  onChange={(e) => setSelectedAmount(betsArray[e.target.value])}
                  className="cursor-pointer rounded w-full h-1 bg-smooth-yellow appearance-none slider-thumb"
                />

                <div className="flex justify-between text-sm font-bold">
                  <div>{selectedAmount}</div>
                  <div>{betsArray[betsArray.length - 1]}</div>
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
