import React, { useEffect, useState } from "react";
import "./recentPlays.css";

const RecentPlays = () => {
  const [recentPlays, setRecentPlays] = useState([]);

  function timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (!previous) return "";

    if (elapsed < msPerMinute) {
      const seconds = Math.round(elapsed / 1000);
      return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
    } else if (elapsed < msPerHour) {
      const minutes = Math.round(elapsed / msPerMinute);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (elapsed < msPerDay) {
      const hours = Math.round(elapsed / msPerHour);
      return `${hours} ${hours === 1 ? "hour" : "hours "} ago`;
    } else if (elapsed < msPerMonth) {
      const days = Math.round(elapsed / msPerDay);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (elapsed < msPerYear) {
      const months = Math.round(elapsed / msPerMonth);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.round(elapsed / msPerYear);
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    }
  }

  useEffect(() => {
    fetch(
      "https://indexer-dl.herokuapp.com/api/latest_transactions"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((jsonResponse) => {
        setRecentPlays(
          jsonResponse.data.map((elm) => {
            return {
              amount: Math.trunc(elm.amount),
              time: timeDifference(new Date(), elm.timestamp ?? null),
              accountId: elm.signer_id ?? "default.near",
              outcome: elm.outcome ? "won" : "lost",
            };
          })
        );
      });
  }, []);

  if (recentPlays.length < 1) return <></>;

  return (
    <div className="recent-plays">
      <p className="roboto-mono" style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "36px" }}>
        Recent plays
      </p>
      <ul className="list-wrapper roboto-mono">
        {recentPlays?.map((elm, index) => (
          <li className="elm" key={index}>
            <div>
              {elm.accountId} flipped {elm.amount} Ⓝ and
              <span className={`outcome ${elm.outcome}`}> {elm.outcome}</span>.
              <div style={{ fontSize: "12px", textAlign: "end" }}>
                {elm.time}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPlays;
