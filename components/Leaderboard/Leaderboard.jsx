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
    api: "https://indexer-dl.herokuapp.com/api/leaderboard/net-gain/",
    label: "Net Gains",
    value: "net_gains",
  },
  {
    api: "https://indexer-dl.herokuapp.com/api/leaderboard/win-streak/",
    label: "Win Streaks",
    value: "win_streaks",
  },
  {
    api: "https://indexer-dl.herokuapp.com/api/leaderboard/loss-streak/",
    label: "Loss Streaks",
    value: "loss_streaks",
  },
  {
    api: "https://indexer-dl.herokuapp.com/api/leaderboard/volume/",
    label: "Volume",
    value: "volume",
  },
];

const getMonthTimestamp = () => {
  var now = new Date();
  var startOfDay = new Date(now.getFullYear(), now.getMonth());
  var timestamp = startOfDay / 1;

  return timestamp;
};

const LeaderBoard = () => {
  const [stats, setStats] = useState(null);
  const [leadNetGain, setLeadNetGain] = useState([]);
  const [leadVolume, setLeadVolume] = useState([]);
  const [winStreak, setWinStreak] = useState([]);
  const [lossStreak, setLossStreak] = useState([]);
  const [selectedLeadboard, setSelectedLeadboard] = useState(LeadTypes[0]);
  const [controlState, setControlState] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [selectedTime, setSelectedTime] = useState("current_month");
  const [monthTimestamp, setMonthTimestamp] = useState(getMonthTimestamp);
  const [isLoading, setIsLoading] = useState(false);

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState(defaultDark ? "dark" : "light");

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`${selectedLeadboard.api}${monthTimestamp}`)
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
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!controlState) return;
    setIsLoading(true);
    fetch(`${selectedLeadboard.api}${monthTimestamp}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((jsonResponse) => {
        if (selectedLeadboard.value === "net_gains") {
          setLeadNetGain(jsonResponse.leaderboard);
        } else if (selectedLeadboard.value === "win_streaks") {
          setWinStreak(jsonResponse.leaderboard);
        } else if (selectedLeadboard.value === "loss_streaks") {
          setLossStreak(jsonResponse.leaderboard);
        } else {
          setLeadVolume(jsonResponse.leaderboard);
        }
      })
      .finally(() => setIsLoading(false));
  }, [selectedLeadboard, selectedTime]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      className="container"
      style={{ paddingBottom: "24px" }}
      data-theme={theme}
    >
      <div className="header" style={{ gap: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flex: "1 1 0",
          }}
        >
          <FaTrophy />
          <p>LEADERBOARD</p>
        </div>
        <div
          style={{
            flex: "1 1 0",
            display: "flex",
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
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div style={{ fontWeight: "bold" }}>Top Degen Lizards</div>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  whiteSpace: "nowrap",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    fontSize: "12px",
                    alignItems: "center",
                  }}
                >
                  <div
                    className={`data-toggle ${
                      selectedTime === "all" ? "active" : ""
                    }`}
                    onClick={() => {
                      setMonthTimestamp(0);
                      setSelectedTime("all");
                    }}
                  >
                    All
                  </div>
                  <div
                    className={`data-toggle ${
                      selectedTime === "current_month" ? "active" : ""
                    }`}
                    onClick={() => {
                      setMonthTimestamp(getMonthTimestamp);
                      setSelectedTime("current_month");
                    }}
                  >
                    Current Month
                  </div>
                </div>
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
              {isLoading ? (
                <p style={{ textAlign: "center" }}>Loading...</p>
              ) : (
                <>
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
                        <div
                          style={{ whiteSpace: "nowrap", fontWeight: "bold" }}
                        >
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
                        <div
                          style={{ whiteSpace: "nowrap", fontWeight: "bold" }}
                        >
                          {formatNumber(lead.volume)} Ⓝ
                        </div>
                      </li>
                    ))}
                  {selectedLeadboard.value === "win_streaks" &&
                    winStreak.map((lead, index) => (
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
                  {selectedLeadboard.value === "loss_streaks" &&
                    lossStreak.map((lead, index) => (
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
                </>
              )}
            </ul>
          </div>
          <p style={{ fontSize: "12px" }}>
            Powered by{" "}
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() =>
                window.open("https://havendao.community/", "_blank")
              }
            >
              Haven
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
