import BN from "bn.js";
import React, { useState } from "react";
import Lottie from "react-lottie";
import "./coinContainer.css";
import coinAnimation from "../../src/lotties/coinflipY.json";
import lostAnimation from "../../src/lotties/Loss.json";
import winAnimation from "../../src/lotties/win2.json";
import { login } from "../../src/utils";

const CoinContainer = ({ flipStatus }) => {
  const [selectedSide, setSelectedSide] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [showLoading, setShowLoading] = useState(false);

  return (
    <div>
      <div className="App">
        {flipStatus.length < 1 && (
          <div
            style={{
              position: "relative",
              width: "280px",
              height: "250px",
              margin: "0 auto",
            }}
          >
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
                autoplay: !window.walletConnection.isSignedIn(),
                animationData: coinAnimation,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              // isClickToPauseDisabled
              isStopped={!showLoading && window.walletConnection.isSignedIn()}
              speed={0.45}
            ></Lottie>
          </div>
        )}

        {!window.walletConnection.isSignedIn() && (
          <div style={{ marginTop: "-40px" }}>
            <span style={{ fontSize: "14px" }}>
              Connect your wallet and start playing!
            </span>
            <div className="double-btn active" onClick={login}>
              Sign in
            </div>
          </div>
        )}

        {window.walletConnection.isSignedIn() && flipStatus.length < 1 && (
          <div style={{ marginTop: "-60px" }}>
            <div className="chip-group" role="radiogroup">
              <div
                className={`chip ${
                  selectedSide === "heads" ? "active" : ""
                } chip-checkbox`}
                aria-labelledby="radioOneLabel"
                role="radio"
                aria-checked="false"
                onClick={() => setSelectedSide("heads")}
              >
                <input type="radio" name="radioEx" />
                <span id="radioOneLabel">Heads</span>
              </div>
              <div
                className={`chip ${
                  selectedSide === "tails" ? "active" : ""
                } chip-checkbox`}
                aria-labelledby="radioTwoLabel"
                role="radio"
                aria-checked="false"
                onClick={() => setSelectedSide("tails")}
              >
                <input type="radio" name="radioEx" />
                <span id="radioTwoLabel">Tails</span>
              </div>
            </div>

            <div style={{ marginTop: "24px" }}>
              <span style={{ marginBottom: "12px", display: "block" }}>
                Select the Ⓝ amount to flip
              </span>
              <div className="near-amount-wrapper" role="radiogroup">
                <div
                  className={`near-amount ${
                    selectedAmount === 1 ? "active" : ""
                  } `}
                  onClick={() => setSelectedAmount(1)}
                >
                  <input type="radio" name="radioEx" />
                  <span id="onenear">1 Ⓝ</span>
                </div>
                <div
                  className={`near-amount ${
                    selectedAmount === 2 ? "active" : ""
                  } `}
                  onClick={() => setSelectedAmount(2)}
                >
                  <input type="radio" name="radioEx" />
                  <span id="twonear">2 Ⓝ</span>
                </div>
                <div
                  className={`near-amount ${
                    selectedAmount === 3 ? "active" : ""
                  } `}
                  onClick={() => setSelectedAmount(3)}
                >
                  <input type="radio" name="radioEx" />
                  <span id="threenear">3 Ⓝ</span>
                </div>
                <div
                  className={`near-amount ${
                    selectedAmount === 4 ? "active" : ""
                  } `}
                  onClick={() => setSelectedAmount(4)}
                >
                  <input type="radio" name="radioEx" />
                  <span id="fournear">4 Ⓝ</span>
                </div>
                <div
                  className={`near-amount ${
                    selectedAmount === 5 ? "active" : ""
                  } `}
                  onClick={() => setSelectedAmount(5)}
                >
                  <input type="radio" name="radioEx" />
                  <span id="fivenear">5 Ⓝ</span>
                </div>
              </div>
            </div>

            <div
              className={`double-btn ${selectedSide ? "active" : "disabled"}`}
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
            </div>
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

                <div style={{ marginTop: "12px" }}>{flipStatus}</div>

                <div
                  className="double-btn active"
                  onClick={() => (window.location.href = "/")}
                >
                  Play again
                </div>
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
                <div style={{ marginTop: "12px" }}>{flipStatus}</div>
                <div
                  className="double-btn active"
                  onClick={() => (window.location.href = "/")}
                >
                  Try again
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoinContainer;
