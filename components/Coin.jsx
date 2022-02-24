import React, { useState } from "react";
const Coin = () => {
  const [selected, setSelected] = useState("");
  const [tossResult, setTossResult] = useState("heads");

  const coinToss = () => {
    setTossResult("");
    if (Math.random() < 0.5) {
      setTossResult("heads");
      console.log("heads");
    } else {
      setTossResult("tails");
    }
  };

  return (
    <div className="App">
      <div id="coin" className={tossResult} key={+new Date()}>
        <div className="side-a">
          <h2>T</h2>
        </div>
        <div className="side-b">
          <h2>H</h2>
        </div>
      </div>

      <div className="chip-group" role="radiogroup">
        <div
          className={`chip ${
            selected === "heads" ? "active" : ""
          } chip-checkbox`}
          aria-labelledby="radioOneLabel"
          role="radio"
          aria-checked="false"
          onClick={() => setSelected("heads")}
        >
          <input type="radio" name="radioEx" />
          <span id="radioOneLabel">Heads</span>
        </div>
        <div
          className={`chip ${
            selected === "tails" ? "active" : ""
          } chip-checkbox`}
          aria-labelledby="radioTwoLabel"
          role="radio"
          aria-checked="false"
          onClick={() => setSelected("tails")}
        >
          <input type="radio" name="radioEx" />
          <span id="radioTwoLabel">Tails</span>
        </div>
      </div>

      <p>Select the Ⓝ amount to flip</p>
      <div style={{ display: "flex", gap: "12px" }}>
        <div className="near-amount">1 Ⓝ</div>
        <div className="near-amount">2 Ⓝ</div>
        <div className="near-amount">3 Ⓝ</div>
        <div className="near-amount">4 Ⓝ</div>
        <div className="near-amount">5 Ⓝ</div>
      </div>
      <a href="something" className="button3" style={{ marginTop: "16px" }}>
        Flip
      </a>
      {/* <button id="btn" onClick={coinToss}>
        Coin Toss
      </button> */}
    </div>
  );
};

export default Coin;
