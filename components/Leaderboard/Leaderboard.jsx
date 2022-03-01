import React, { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { RiCoinLine } from "react-icons/ri";
import Lottie from "react-lottie";
import "./../Home/home.css";
import "./leaderboard.css";
import coinAnimation from "./../../src/lotties/coinFlip.json";

const LeaderBoard = () => {
  const [stats, setStats] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const theme = localStorage.getItem("theme");

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    fetch("https://indexer-dl.herokuapp.com/api/leaderboard")
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
        setLeaderboard(leaderboard);
      });
  }, []);

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
            <div style={{ fontWeight: "bold" }}>Top Degen Lizards</div>
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
              {leaderboard.map((lead, index) => (
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
