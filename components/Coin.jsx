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
      <div style={{ display: "flex" }}>
        <input
          type="radio"
          name="site_name"
          value="HEADS"
          checked={selected === "heads"}
          onChange={() => setSelected("heads")}
        />
        <input
          type="radio"
          name="site_name"
          value="TAILS"
          checked={selected === "tails"}
          onChange={() => setSelected("tails")}
        />
      </div>
      <div id="coin" className={tossResult} key={+new Date()}>
        <div className="side-a">
          <h2>T</h2>
        </div>
        <div className="side-b">
          <h2>H</h2>
        </div>
      </div>
      <h1>Flip a coin</h1>
      <button id="btn" onClick={coinToss}>
        Coin Toss
      </button>
    </div>
  );
};

export default Coin;
