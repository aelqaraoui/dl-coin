import React, { useEffect, useState, useContext } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { FaMoon, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logout } from "../../utils";
import "../Home/home.css";
import lizard from "../CoinContainer/lizard.png";
import { ThemeContext } from "../../services/providers/ThemeContext";

const Header = () => {
  const [balance, setBalance] = useState(0);
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(async () => {
    if (window.walletConnection.isSignedIn()) {
      setBalance(
        (await window.walletConnection._connectedAccount.getAccountBalance())
          .available / 1000000000000000000000000
      );
    }
  }, []);

  return (
    <div
      className="flex items-center px-24 py-8 bg-gray-10 dark:bg-blue-dark"
      data-theme={theme}
    >
      <div className="flex-1 flex items-center gap-4">
        <Link className="cursor-pointer" to="/">
          <img src={lizard} width={48} height={48} />
        </Link>
        {window.walletConnection.isSignedIn() && (
          <div className="flex items-center gap-2">
            <p>{window.accountId}</p>
            <p className="text-green-500 font-bold">
              {balance.toFixed(2)} Ⓝ
            </p>{" "}
          </div>
        )}
      </div>
      <div className="flex-1 flex justify-center">
        {theme === "dark" ? (
          <BsFillSunFill
            className="cursor-pointer text-white text-base"
            onClick={() => setTheme("light")}
          ></BsFillSunFill>
        ) : (
          <FaMoon
            className="cursor-pointer text-base"
            onClick={() => setTheme("dark")}
          ></FaMoon>
        )}
      </div>
      <div className="flex flex-1 justify-end items-center gap-12">
        <ul className="flex items-center gap-8 font-robotoMono">
          <li className="dark:text-white p-2 rounded bg-transparent hover:bg-smooth-gray">
            <Link to="/stake" className="no-underline">
              <span>STAKE</span>
            </Link>
          </li>
          <li className="dark:text-white">
            <Link to="/leaderboard" target="_blank" className="no-underline">
              <div className="flex items-center gap-2">
                <FaTrophy />
                <span>LEADERBOARD</span>
              </div>
            </Link>
          </li>
        </ul>

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
