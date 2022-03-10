import React, { useEffect, useState } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { FaMoon, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";
// import "./../../src/global.css";
import { logout } from "./../../src/utils";
import "./../Home/home.css";
import lizard from "./../CoinContainer/lizard.png";

const Header = ({ theme, setTheme }) => {
  const [balance, setBalance] = useState(0);

  useEffect(async () => {
    if (window.walletConnection.isSignedIn()) {
      setBalance(
        (await window.walletConnection._connectedAccount.getAccountBalance())
          .available / 1000000000000000000000000
      );
    }
  }, []);

  return (
    <div className="header" data-theme={theme}>
      <div
        className="first-col"
        style={{ flex: "1 1 0", alignItems: "center" }}
      >
        <Link style={{ cursor: "pointer" }} to="/">
          <img src={lizard} width={48} height={48} />
        </Link>
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
      <div
        style={{
          flex: "1 1 0",
          justifyContent: "end",
          display: "flex",
          alignItems: "center",
          gap: "48px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Link to="/stake" style={{ textDecoration: "none" }}>
            <div className="leaderboard-btn">
              <span className="lead-title">STAKE</span>
            </div>
          </Link>

          <Link
            to="/leaderboard"
            style={{ textDecoration: "none" }}
            target="_blank"
          >
            <div className="leaderboard-btn">
              <FaTrophy />
              <span className="lead-title">LEADERBOARD</span>
            </div>
          </Link>
        </div>

        {window.walletConnection.isSignedIn() && (
          <p className="sign-out" onClick={logout}>
            Sign out
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
