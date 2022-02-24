import React, { useState } from "react";
const Coin = () => {
  const [selectedSide, setSelectedSide] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(1);
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
          <h1>T</h1>
        </div>
        <div className="side-b">
          <h1>H</h1>
        </div>
      </div>

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

      <div>
        <span style={{ marginBottom: "12px", display: "block" }}>
          Select the Ⓝ amount to flip
        </span>
        <div
          style={{ display: "flex", gap: "12px" }}
          role="radiogroup"
          onChange={() => console.log("p1p")}
        >
          <div
            className={`near-amount ${selectedAmount === 1 ? "active" : ""} `}
            onClick={() => setSelectedAmount(1)}
          >
            <input type="radio" name="radioEx" />
            <span id="onenear">1 Ⓝ</span>
          </div>
          <div
            className={`near-amount ${selectedAmount === 2 ? "active" : ""} `}
            onClick={() => setSelectedAmount(2)}
          >
            <input type="radio" name="radioEx" />
            <span id="twonear">2 Ⓝ</span>
          </div>
          <div
            className={`near-amount ${selectedAmount === 3 ? "active" : ""} `}
            onClick={() => setSelectedAmount(3)}
          >
            <input type="radio" name="radioEx" />
            <span id="threenear">3 Ⓝ</span>
          </div>
          <div
            className={`near-amount ${selectedAmount === 4 ? "active" : ""} `}
            onClick={() => setSelectedAmount(4)}
          >
            <input type="radio" name="radioEx" />
            <span id="fournear">4 Ⓝ</span>
          </div>
          <div
            className={`near-amount ${selectedAmount === 5 ? "active" : ""} `}
            onClick={() => setSelectedAmount(5)}
          >
            <input type="radio" name="radioEx" />
            <span id="fivenear">5 Ⓝ</span>
          </div>
        </div>
      </div>

      <div
        className={`double-btn ${selectedSide ? "active" : "disabled"}`}
        onClick={coinToss}
      >
        Double or Nothing
      </div>
    </div>
  );
};

export default Coin;
