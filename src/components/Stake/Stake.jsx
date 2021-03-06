import Big from "big.js";
import BN from "bn.js";
import React, { useEffect, useState } from "react";
import { login } from "../../utils";
import { numberWithCommas } from "../../utils/formatValue";
import { parseTokenAmount, toNear } from "../../utils/nearValues";
import PlayButton from "../Core/buttons/PlayButton";
import Header from "../Header/Header";
import "../modal.css";
import "./Stake.css";

const calculateRemainingTime = (dateIn, months) => {
  const date = new Date(dateIn);
  var d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() != d) {
    date.setDate(0);
  }

  // get total seconds between the times
  var delta = Math.abs(date - new Date()) / 1000;

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  var seconds = delta % 60; // in theory the modulus is not required

  if (days < 1) {
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }

  if (days >= 1) {
    return ` ${days} ${days === 1 ? "day" : "days"} and ${hours} ${
      hours === 1 ? "hour" : "hours"
    }`;
  }

  if (days < 1 && hours < 1) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  }

  if (hours < 1 && minutes < 1) {
    return `${seconds} ${seconds === 1 ? "second" : "seconds"}`;
  }

  return "Available";
};

const getDate = (nanoseconds) => {
  const miliseconds = Math.round(nanoseconds / 1000000);
  const date = new Date(miliseconds);

  return date;
};

const Stake = () => {
  const [data, setData] = useState({
    totalStaked: "",
    fundInfo: {
      amount: "",
      endDate: "",
      feeFreeBet: "",
    },
  });
  const [balance, setBalance] = useState(0);
  const [stakeAmount, setStakeAmount] = useState("");
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [rewards, setRewards] = useState(0);
  const [isRewardLoading, setIsRewardLoading] = useState(false);

  useEffect(async () => {
    const maxBet = await window.contract.get_max_bet();
    const fundInfo = await window.contract.get_fund_info();
    const feeFreeBet = await window.contract.get_fee_free();
    getRewards();

    setData({
      totalStaked: maxBet
        ? ((parseFloat(maxBet) / 1e24) * 500).toFixed(2)
        : "-",
      fundInfo: {
        amount:
          fundInfo?.length > 0
            ? (parseFloat(fundInfo[0]) / 1e24).toFixed(2)
            : "-",
        feeFreeBet: feeFreeBet
          ? Math.floor(parseFloat(feeFreeBet) / 1e24)
          : "-",
        endDate:
          fundInfo?.length > 0
            ? calculateRemainingTime(getDate(fundInfo[1]), 1)
            : "-",
      },
    });
  }, []);

  useEffect(async () => {
    if (window.walletConnection.isSignedIn()) {
      setBalance(
        (await window.walletConnection._connectedAccount.getAccountBalance())
          .available /
          1000000000000000000000000 -
          0.06
      );
    }
  }, []);

  const getRewards = async () => {
    setIsRewardLoading(true);

    const reward = await window.contract.get_amount_claimable();

    setRewards(reward ?? 0);
    setIsRewardLoading(false);
  };

  return null;
  // <>
  //   <div
  //     className="home-container bg-gray-10 dark:bg-blue-dark"
  //     style={{ paddingBottom: "24px" }}
  //   >
  //     <Header />
  //     <div className="body">
  //       <h3
  //         className="font-robotoMono dark:text-white"
  //         style={{ fontWeight: "bold", marginBottom: "24px" }}
  //       >
  //         DEGEN Staking
  //       </h3>

  //       <div className="coin-container bg-white dark:bg-smooth-gray dark:text-white">
  //         {!window.walletConnection.isSignedIn() && (
  //           <div style={{ marginTop: "36px" }}>
  //             <p className="mb-16">Connect your wallet and start staking!</p>
  //             <PlayButton onClick={login}>
  //               <span>Sign in</span>
  //             </PlayButton>
  //           </div>
  //         )}
  //         {window.walletConnection.isSignedIn() && (
  //           <div className="flex flex-col gap-12">
  //             {data.totalStaked &&
  //             data.fundInfo.amount &&
  //             data.fundInfo.endDate &&
  //             rewards ? (
  //               <>
  //                 <div className="flex justify-between">
  //                   <div className="text-left">
  //                     <p className="text-sm">Total Staked</p>
  //                     <p className="text-2xl font-bold">
  //                       {numberWithCommas(data.totalStaked)}{" "}
  //                       <span className="text-lg">???</span>
  //                     </p>
  //                   </div>

  //                   <div className="text-left">
  //                     <p className="text-sm">Amount staked</p>
  //                     <p className="text-2xl font-bold">
  //                       {numberWithCommas(data.fundInfo.amount)}{" "}
  //                       <span className="text-lg">???</span>
  //                     </p>
  //                   </div>
  //                 </div>
  //                 <div>
  //                   <div className="flex justify-between items-center">
  //                     <span className="text-sm">Time to unlock</span>
  //                     <span className="text-base font-bold">
  //                       {data.fundInfo.endDate}
  //                     </span>
  //                   </div>
  //                   <div className="flex justify-between items-center">
  //                     <span className="text-sm">Fee free bets</span>
  //                     <span className="text-base font-bold">
  //                       {data.fundInfo.feeFreeBet}
  //                     </span>
  //                   </div>
  //                 </div>

  //                 <div className="flex gap-4">
  //                   <PlayButton onClick={() => setShowStakeModal(true)}>
  //                     Stake
  //                   </PlayButton>
  //                   <PlayButton
  //                     disabled={data.fundInfo.endDate !== "Available"}
  //                     onClick={async (event) => {
  //                       if (data.fundInfo.endDate !== "Available") return;
  //                       event.preventDefault();

  //                       await setTimeout(() => {
  //                         try {
  //                           window.contract.unfund({}, 30000000000000);
  //                         } catch (e) {
  //                           alert(
  //                             "Something went wrong! " +
  //                               "Maybe you need to sign out and back in? " +
  //                               "Check your browser console for more info."
  //                           );
  //                           throw e;
  //                         } finally {
  //                         }
  //                       }, 2000);
  //                     }}
  //                   >
  //                     Unstake
  //                   </PlayButton>
  //                 </div>

  //                 <div className="flex justify-between items-center">
  //                   <div className="text-left">
  //                     <p className="text-sm">Rewards Claimed</p>
  //                     <div className="w-5/6 break-word">
  //                       <p className="text-base font-bold">
  //                         {numberWithCommas(rewards.toFixed(2))}{" "}
  //                         <span className="text-sm">LIZZY</span>
  //                       </p>
  //                     </div>
  //                   </div>
  //                   <div className="w-16">
  //                     <PlayButton
  //                       disabled={!data.fundInfo.amount}
  //                       loading={isRewardLoading}
  //                       onClick={() => {
  //                         if (isRewardLoading) return;
  //                         getRewards();
  //                       }}
  //                     >
  //                       Claim
  //                     </PlayButton>
  //                   </div>
  //                 </div>
  //               </>
  //             ) : (
  //               <>
  //                 <div className="flex justify-between">
  //                   <div className="flex flex-col gap-1">
  //                     <div className="w-18 h-4 rounded text-left bg-gray-30 dark:bg-gray-20 animate-pulse"></div>
  //                     <div className="w-24 h-4 rounded text-left bg-gray-30 dark:bg-gray-20 animate-pulse"></div>
  //                   </div>

  //                   <div className="flex flex-col gap-1">
  //                     <div className="w-18 h-4 rounded text-left bg-gray-30 dark:bg-gray-20 animate-pulse"></div>
  //                     <div className="w-24 h-4 rounded text-left bg-gray-30 dark:bg-gray-20 animate-pulse"></div>
  //                   </div>
  //                 </div>
  //                 <div className="flex justify-between items-center">
  //                   <div className="w-24 h-4 rounded bg-gray-30 dark:bg-gray-20 animate-pulse"></div>
  //                   <div className="w-24 h-4 rounded bg-gray-30 dark:bg-gray-20 animate-pulse"></div>
  //                 </div>

  //                 <div className="flex gap-4">
  //                   <div className="w-full h-4 rounded bg-gray-30 dark:bg-gray-20 animate-pulse"></div>
  //                   <div className="w-full h-4 rounded bg-gray-30 dark:bg-gray-20 animate-pulse"></div>
  //                 </div>
  //               </>
  //             )}
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  //   {showStakeModal && (
  //     <div className="modal display-block">
  //       <section className="modal-main bg-white dark:bg-smooth-gray dark:text-white font-roboto w-auto">
  //         <div className="modal-container">
  //           <span className="font-bold text-xl font-robotoMono">Stake</span>
  //         </div>
  //         <div>
  //           <p className="mb-4">
  //             Please insert the amount you want to stake.
  //           </p>
  //           <div className="relative">
  //             <input
  //               className="border border-black rounded dark:border-white p-2 w-full text-sm text-black"
  //               type="number"
  //               placeholder="0.0"
  //               value={stakeAmount}
  //               onChange={(e) => setStakeAmount(e.target.value)}
  //             />
  //             <span
  //               className="absolute right-2 text-black text-sm font-bold"
  //               style={{ top: "50%", transform: "translateY(-50%)" }}
  //             >
  //               ???
  //             </span>
  //           </div>
  //           <div className="flex mt-1 justify-between items-center">
  //             <p
  //               className="text-xs cursor-pointer text-blue-dark p-1 rounded bg-gray-20 hover:bg-blue-dark hover:text-white transition duration-500 ease-in-out font-bold"
  //               onClick={() => {
  //                 setStakeAmount(balance);
  //               }}
  //             >
  //               Use max
  //             </p>
  //             <p className="text-xs dark:text-white">
  //               Balance ~ {balance.toFixed(2)}
  //             </p>
  //           </div>
  //         </div>

  //         <div className="flex gap-4">
  //           <PlayButton onClick={() => setShowStakeModal(false)}>
  //             Cancel
  //           </PlayButton>
  //           <PlayButton
  //             disabled={stakeAmount <= 0}
  //             onClick={async (event) => {
  //               event.preventDefault();

  //               if (stakeAmount <= 0) return;

  //               await setTimeout(() => {
  //                 try {
  //                   window.contract.fund(
  //                     {},
  //                     100000000000000,
  //                     new BN(toNear(stakeAmount.toString()))
  //                   );
  //                 } catch (e) {
  //                   alert(
  //                     "Something went wrong! " +
  //                       "Maybe you need to sign out and back in? " +
  //                       "Check your browser console for more info."
  //                   );
  //                   throw e;
  //                 } finally {
  //                 }
  //               }, 2000);
  //             }}
  //           >
  //             Stake
  //           </PlayButton>
  //         </div>
  //       </section>
  //     </div>
  //   )}
  // </>
};

export default Stake;
