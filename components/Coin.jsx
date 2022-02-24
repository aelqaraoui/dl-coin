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
          <h1>T</h1>
        </div>
        <div className="side-b">
          <h1>H</h1>
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

      <div>
        <span style={{ marginBottom: "12px", display: "block" }}>
          Select the Ⓝ amount to flip
        </span>
        <div style={{ display: "flex", gap: "12px" }}>
          <div className="near-amount">1 Ⓝ</div>
          <div className="near-amount">2 Ⓝ</div>
          <div className="near-amount">3 Ⓝ</div>
          <div className="near-amount">4 Ⓝ</div>
          <div className="near-amount">5 Ⓝ</div>
        </div>
      </div>

      <div
        style={{
          marginTop: "16px",
          width: "100%",
          backgroundColor: "#aaa",
          color: "white",
          borderRadius: "4px",
          padding: "12px",
          cursor: "pointer",
        }}
      >
        Double or Nothing
      </div>
      {/* <button id="btn" onClick={coinToss}>
        Coin Toss
      </button> */}
    </div>
  );
};

export default Coin;
