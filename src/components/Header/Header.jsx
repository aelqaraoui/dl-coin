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
      className="sticky top-0 z-9999 flex items-center px-24 py-4 bg-white dark:bg-blue-accent dark:text-white font-roboto text-sm"
      data-theme={theme}
    >
      <div className="flex-1 flex items-center gap-4">
        <Link className="cursor-pointer" to="/">
          <img src={lizard} width={48} height={48} />
        </Link>
        {window.walletConnection.isSignedIn() && (
          <div className="flex items-center gap-2">
            <p>
              {window.accountId}{" "}
              <span className="text-green font-bold text-sm">
                {balance.toFixed(2)} Ⓝ
              </span>
            </p>
          </div>
        )}
      </div>
      <div className="flex-1 flex justify-center">
        <ul className="flex items-center gap-8">
          <li className="cursor-pointer dark:text-white p-2 rounded bg-transparent hover:bg-gray-10 dark:hover:bg-smooth-gray dark:hover:text-white">
            <Link to="/stake" className="no-underline">
              <span>Stake</span>
            </Link>
          </li>
          <li className="cursor-pointer dark:text-white p-2 rounded bg-transparent hover:bg-gray-10 dark:hover:bg-smooth-gray dark:hover:text-white">
            <Link to="/leaderboard" target="_blank" className="no-underline">
              <div className="flex items-center gap-2">
                <FaTrophy />
                <span>Leaderboard</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-1 justify-end items-center gap-12">
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
        {window.walletConnection.isSignedIn() && (
          <div className="cursor-pointer p-2 rounded bg-gray-20 hover:bg-gray-10 dark:bg-smooth-gray dark:hover:bg-blue-dark">
            <p onClick={logout}>Sign out</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
