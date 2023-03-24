import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Navbar from "@/components/ NavBar";

const upgrades = [
  { name: "🐌 Boost", description: "+1 point per click", cost: 100 },
  {
    name: "🐛 Boost",
    description: "Automatically click every 2 seconds",
    cost: 1000,
  },
  { name: "🦋 Boost", description: "+1 point per second", cost: 10000 },
];

const App = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  const [score, setScore] = useState(0);
  const [clickerCount, setClickerCount] = useState(0);
  const [autoCount, setAutoCount] = useState(0);
  const [idleCount, setIdleCount] = useState(0);
  const [purchasedUpgrades, setPurchasedUpgrades] = useState({});
  //  const price setPrice

  const clicker = () => {
    setScore(score + 1);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setScore(score + 1 + idleCount);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [idleCount, score]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setScore(score + autoCount);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [autoCount, score]);

  const purchaseUpgrade = (upgrade) => {
    if (score >= upgrade.cost) {
      setScore(score - upgrade.cost);

      switch (upgrade.name) {
        case "Click Boost":
          setClickerCount(clickerCount + 1);
          break;
        case "Auto Clicker":
          setAutoCount(autoCount + 1);
          break;
        case "Idle Boost":
          setIdleCount(idleCount + 1);
          break;
        default:
          break;
      }

      setPurchasedUpgrades({
        ...purchasedUpgrades,
        [upgrade.name]: purchasedUpgrades[upgrade.name] + 1 || 1,
      });
    }
  };

  // create a variable and STATE for purchased upgrades..... if purchased purchased amount to purchase price.

  useEffect(() => {
    const storedScore = localStorage.getItem("score");
    const storedUpgrades = JSON.parse(localStorage.getItem("upgrades"));

    if (storedScore) {
      setScore(parseInt(storedScore));
    }

    if (storedUpgrades) {
      setClickerCount(storedUpgrades.clickCount || 0);
      setAutoCount(storedUpgrades.autoCount || 0);
      setIdleCount(storedUpgrades.idleCount || 0);
      setPurchasedUpgrades(storedUpgrades.purchased || {});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("score", score);
    localStorage.setItem(
      "upgrades",
      JSON.stringify({
        clickCount: clickerCount,
        autoCount: autoCount,
        idleCount: idleCount,
        purchased: purchasedUpgrades,
      })
    );
  }, [score, clickerCount, autoCount, idleCount, purchasedUpgrades]);

  return (
    <div>
     {session ? (
  <>
  {/* <Account session={session} /> */}
  {/* need link account to person profile*/}
  <div className="container-clicker">
    <Navbar />
  <h1>Em🔥jis Clicker</h1>
  <p>Score: {score}</p>
  <button onClick={clicker}>🫧</button>
  <h2> 🌬 Boost:</h2>
  {upgrades.map((upgrade) => (
    <button key={upgrade.name}
      onClick={() => purchaseUpgrade(upgrade)}
      disabled={score < upgrade.cost}>
      {upgrade.name} ({upgrade.cost} points):{" "}
      {purchasedUpgrades[upgrade.name] || 0} purchased (
      {upgrade.description})
    </button>
  )
)}
</div>
  </>
) :  (<Auth providers={["github", "google", "twitter"]}
    supabaseClient={supabase} appearance={{ theme: ThemeSupa }}
    theme="dark" />)
    }
  </div>
  );
}

export default App;
