import React, { useEffect, useState } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { FaMoon, FaTrophy } from "react-icons/fa";
import { MdOutlineOpenInNew } from "react-icons/md";
import { RiCoinLine, RiArrowDropDownLine } from "react-icons/ri";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import coinAnimation from "./../../src/lotties/coinFlip.json";
import "./../Home/home.css";
import "./leaderboard.css";

const LeadTypes = [
  {
    api: "https://indexer-dl.herokuapp.com/api/leaderboard/net-gain",
    label: "Net Gains",
    value: "net_gains",
  },

  {
    api: "https://indexer-dl.herokuapp.com/api/leaderboard/streak",
    label: "Streaks",
    value: "streaks",
  },
  {
    api: "https://indexer-dl.herokuapp.com/api/leaderboard/volume",
    label: "Volume",
    value: "volume",
  },
];

const LeaderBoard = () => {
  const [stats, setStats] = useState(null);
  const [leadNetGain, setLeadNetGain] = useState([]);
  const [leadVolume, setLeadVolume] = useState([]);
  const [leadStreak, setLeadStreak] = useState([]);
  const [selectedLeadboard, setSelectedLeadboard] = useState(LeadTypes[0]);
  const [controlState, setControlState] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState(defaultDark ? "dark" : "light");

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    fetch(selectedLeadboard.api)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((jsonResponse) => {
        const {
          total_flips,
          total_loss,
          total_volume,
          total_won,
          leaderboard,
        } = jsonResponse;
        setStats({
          total_flips: total_flips,
          total_loss,
          total_volume,
          total_won,
        });
        setLeadNetGain(leaderboard);
        setControlState(true);
      });
  }, []);

  useEffect(() => {
    if (!controlState) return;
    fetch(selectedLeadboard.api)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((jsonResponse) => {
        if (selectedLeadboard.value === "net_gains") {
          setLeadNetGain(jsonResponse.leaderboard);
        } else if (selectedLeadboard.value === "streaks") {
          setLeadStreak(jsonResponse.leaderboard);
        } else {
          setLeadVolume(jsonResponse.leaderboard);
        }
      });
  }, [selectedLeadboard]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="container" data-theme={theme}>
      <div className="header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FaTrophy />
          <p>LEADERBOARD</p>
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
      </div>
      <div className="degen-title">
        <h3 style={{ marginBottom: "8px" }}>DEGEN Lizards Coin Flip</h3>
        <div className="link">
          <Link
            to="/"
            target="_blank"
            style={{
              width: "fit-content",
              cursor: "pointer",
              color: "inherit",
            }}
          >
            <div style={{ fontSize: "14px", textDecoration: "underline" }}>
              https://degenlizards.com
            </div>
          </Link>
          <MdOutlineOpenInNew />
        </div>
      </div>

      <div className="leader-wrapper">
        <div>
          <div className="coin-mobile">
            <Lottie
              width={200}
              height={200}
              options={{
                loop: true,
                autoplay: true,
                animationData: coinAnimation,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
            ></Lottie>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "12px",
              height: "fit-content",
            }}
          >
            <div className="stats-card">
              <div>
                <div style={{ fontSize: "12px" }}>Total Flips</div>
                <div style={{ fontWeight: "bold" }}>
                  {stats?.total_flips ? formatNumber(stats.total_flips) : 0}
                </div>
              </div>
              <RiCoinLine />
            </div>
            <div className="stats-card">
              <div>
                <div style={{ fontSize: "12px" }}>Total Won</div>
                <div style={{ fontWeight: "bold" }}>
                  {stats?.total_won ? formatNumber(stats.total_won) : 0}
                </div>
              </div>
              <div>Ⓝ</div>
            </div>
            <div className="stats-card">
              <div>
                <div style={{ fontSize: "12px" }}>Total Loss</div>
                <div style={{ fontWeight: "bold" }}>
                  {stats?.total_loss ? formatNumber(stats.total_loss) : 0}
                </div>
              </div>
              <div>Ⓝ</div>
            </div>
            <div className="stats-card">
              <div>
                <div style={{ fontSize: "12px" }}>Total Volume</div>
                <div style={{ fontWeight: "bold" }}>
                  {stats?.total_volume ? formatNumber(stats.total_volume) : 0}
                </div>
              </div>
              <div>Ⓝ</div>
            </div>
          </div>
          <div className="coin-desktop">
            <Lottie
              width={280}
              height={280}
              options={{
                loop: true,
                autoplay: true,
                animationData: coinAnimation,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
            ></Lottie>
          </div>
        </div>
        <div style={{ flex: "2 2 0" }}>
          <div className="board">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontWeight: "bold" }}>Top Degen Lizards</div>
              <div className="dropdown">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                >
                  <span>{selectedLeadboard.label}</span>
                  <RiArrowDropDownLine style={{ fontSize: "16px" }} />
                </div>

                {showTypeDropdown && (
                  <div className="dropdown-content">
                    {LeadTypes.map((type) => (
                      <div
                        key={type.value}
                        className="option"
                        onClick={() => {
                          setShowTypeDropdown(!showTypeDropdown);
                          setSelectedLeadboard(type);
                        }}
                      >
                        {type.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <ul
              style={{
                padding: 0,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                marginBottom: 0,
                gap: "4px",
              }}
            >
              {selectedLeadboard.value === "net_gains" &&
                leadNetGain.map((lead, index) => (
                  <li
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "14px",
                      wordBreak: "break-all",
                    }}
                    key={index}
                  >
                    <div>
                      {index + 1}. {lead.signer_id}
                    </div>
                    <div style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                      {formatNumber(lead.net)} Ⓝ
                    </div>
                  </li>
                ))}
              {selectedLeadboard.value === "volume" &&
                leadVolume.map((lead, index) => (
                  <li
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "14px",
                      wordBreak: "break-all",
                    }}
                    key={index}
                  >
                    <div>
                      {index + 1}. {lead.signer_id}
                    </div>
                    <div style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                      {formatNumber(lead.volume)} Ⓝ
                    </div>
                  </li>
                ))}
              {selectedLeadboard.value === "streaks" &&
                leadStreak.map((lead, index) => (
                  <li
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "14px",
                      wordBreak: "break-all",
                    }}
                    key={index}
                  >
                    <div>
                      {index + 1}. {lead.signer_id}
                    </div>
                    <div
                      style={{
                        whiteSpace: "nowrap",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div>{formatNumber(lead.streak)}</div>
                      <RiCoinLine />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
