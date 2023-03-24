import { useState, useEffect } from 'react';
import { useSession, createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://vpshrfqnnwdtkzgokddo.supabase.co';
// const supabaseKey = 'your-supabase-key';
// const supabase = createClient(supabaseUrl, supabaseKey);

const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    )

// const session = useSession();

function Page() {
  const [emojis, setEmojis] = useState();
  const [points, setPoints] = useState(0);
  const [clickerCount, setClickerCount] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [autoValue, setAutoValue] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [idleMultiplier, setIdleMultiplier] = useState(1);
  const [upgrades, setUpgrades] = useState([
    { name: 'Faster Clicks', description: 'Increases the value of each click', cost: 10, effect: () => setClickValue(clickValue + 1) },
    { name: 'Automatic Clicks', description: 'Automatically clicks every 5 seconds', cost: 50, effect: () => setAutoValue(autoValue + 1) },
    { name: 'Click Multiplier', description: 'Doubles the value of each click', cost: 100, effect: () => setMultiplier(multiplier * 2) },
    { name: 'Idle Multiplier', description: 'Doubles the points earned while away', cost: 500, effect: () => setIdleMultiplier(idleMultiplier * 2) },
  ]);
  const [cosmetics, setCosmetics] = useState([
    { name: 'Default', background: 'white', color: 'black' },
    { name: 'Dark', background: '#333', color: 'white' },
    { name: 'Beach', background: '#ffd6b6', color: '#333' },
    { name: 'Forest', background: '#c7ecee', color: '#333' },
    { name: 'City', background: '#dfe6e9', color: '#333' },
  ]);

  // const [selectedCosmetic, setSelectedCosmetic] = useState(0);
  const [user, setUser] = useState(null);

  const clicker = () => {
    setScore(points + 1 + clickerCount);
  };

  useEffect(() => {
    async function fetchUserData() {
      const { user } = await supabase.auth.user();
      setUser(user);
      const { data: userData } = await supabase
        .from('profiles')
        .select('emojis, points, clickerCount, clickValue, autoValue, multiplier, idleMultiplier, selectedCosmetic')
        .eq('id', user.id)
        .single();
      if (userData) {
        setEmojis(userData.emojis);
        setPoints(userData.points);
        setClickerCount(userData.clickerCount);
        setClickValue(userData.clickValue);
        setAutoValue(userData.autoValue);
        setMultiplier(userData.multiplier);
        setIdleMultiplier(userData.idleMultiplier);
        setSelectedCosmetic(userData.selectedCosmetic);
      }
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(points + autoValue * multiplier * idleMultiplier);
    }, 5000);

    return () => clearInterval(interval);
  }, [points, autoValue, multiplier, idleMultiplier]);

  const purchaseUpgrade = (upgrade) => {
    if (points >= upgrade.cost) {
      setScore(points - upgrade.cost);

      switch (upgrade.name) {
        case 'Faster Click':
          setClickerCount(clickerCount + 1);
          break;
        case 'Clicker Multiplier':
          setAutoValue(multiplier + 1);
          break;
        case 'Idle Multiplier':
          setIdleMultiplier(idleMultiplier + 1);
          break;
        default:
          break;
      }

      setUpgrades({
        ...upgrades,
        [upgrade.name]: upgrades[upgrade.name] + 1 || 1,
      });
    }
  }; 

  return (
    <div>
      <h1>Incremental Clicker Idle Game</h1>
      <p>Score: {points}</p>
      <button onClick={clicker}>Click!</button>
      <h2>Upgrades</h2>
      {upgrades.map((upgrade) => (
        <button
          key={upgrade.name}
          onClick={() => purchaseUpgrade(upgrade)}
          disabled={points < upgrade.cost}
        >
          {upgrade.name} ({upgrade.cost} points): {upgrades[upgrade.name] || 0} purchased
          ({upgrade.description})
        </button>
      ))}
    </div>
  );
};

export default Page;



// import { createClient } from "@supabase/supabase-js";

// function Page() {
//     const supabase = createClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL,
//         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     )
//     const {data: posts} = await supabase.from('posts').select()
//     return(
//         <h1>Posts</h1>
//     );
// }

// export default Page;