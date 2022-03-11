import React, { useEffect, useState, useContext } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { FaMoon, FaTrophy } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { logout } from "../../utils";
import "../Home/home.css";
import lizard from "../CoinContainer/lizard.png";
import { ThemeContext } from "../../services/providers/ThemeContext";

const Header = () => {
  const [balance, setBalance] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
    <>
      <div
        className="hidden md:flex sticky top-0 z-9999 items-center px-24 py-4 bg-white dark:bg-blue-accent dark:text-white font-roboto text-sm"
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
            <Link to="/stake" className="no-underline">
              <li className="cursor-pointer dark:text-white p-2 rounded bg-transparent hover:bg-gray-10 dark:hover:bg-smooth-gray dark:hover:text-white transition duration-500 ease-in-out font-bold">
                <span>Stake</span>
              </li>
            </Link>

            <Link to="/leaderboard" target="_blank" className="no-underline">
              <li className="cursor-pointer dark:text-white p-2 rounded bg-transparent hover:bg-gray-10 dark:hover:bg-smooth-gray dark:hover:text-white transition duration-500 ease-in-out font-bold">
                <div className="flex items-center gap-2">
                  <FaTrophy />
                  <span>Leaderboard</span>
                </div>
              </li>
            </Link>
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
            <div
              className="cursor-pointer p-2 rounded bg-gray-20 hover:bg-gray-10 dark:bg-smooth-gray dark:hover:bg-blue-dark transition duration-500 ease-in-out font-bold"
              onClick={logout}
            >
              <p>Sign out</p>
            </div>
          )}
        </div>
      </div>
      <div className="px-8 py-2 bg-white dark:bg-blue-accent dark:text-white items-center justify-between flex md:hidden">
        <Link className="cursor-pointer" to="/">
          <img src={lizard} width={32} height={32} />
        </Link>
        <div>
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
        <FiMenu
          className="cursor-pointer text-xl"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        />
      </div>
      {showMobileMenu && (
        <div className="px-8 py-2 bg-white dark:bg-blue-accent dark:text-white">
          {window.walletConnection.isSignedIn() && (
            <div className="mb-6 flex justify-between text-xs font-bold">
              <p>
                {window.accountId}{" "}
                <span className="text-green">{balance.toFixed(2)} Ⓝ</span>
              </p>
              <p onClick={logout}>Sign out</p>
            </div>
          )}
          <ul className="flex flex-col gap-2 mb-2">
            <Link to="/stake" className="no-underline">
              <li className="text-sm font-bold">Stake</li>
            </Link>
            <Link to="/leaderboard" target="_blank" className="no-underline">
              <li className="text-sm font-bold">Leaderboard</li>
            </Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
