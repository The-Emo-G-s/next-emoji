// import { supabase } from "@/utils/supabaseClient";

// const LeaderBoard = () => {
//   const users = [
//     {
//       username: "laihsb",
//       avatar_Url:
//         "https://em-content.zobj.net/thumbs/160/google/350/chipmunk_1f43f-fe0f.png",
//       points: 763746367826876756735376783
//     },
//     {
//       username: "Sotark",
//       avatar_Url: "https://em-content.zobj.net/thumbs/160/google/350/bear_1f43b.png",

//       points: 4,
//     },
//     {
//       username: "tanzaniaCraig",
//       avatar_Url:
//         "https://em-content.zobj.net/thumbs/160/google/350/mammoth_1f9a3.png",
//       points: 78684345,
//     },
//     {
//       username: "jhickey",
//       avatar_Url:
//         "https://em-content.zobj.net/thumbs/160/google/350/elephant_1f418.png",
//       points: 36376783,
//     },
//     {
//       username: "octo",
//       avatar_Url:
//         "https://em-content.zobj.net/thumbs/160/google/350/elephant_1f418.png",
//       points: 783,
//     },
//     {
//       username: "lucario",
//       avatar_Url:
//         "https://em-content.zobj.net/thumbs/160/google/350/rhinoceros_1f98f.png",

//       points: 387348573,
//     },
//     {
//       username: "darkmaul",
//       avatar_Url:
//         "https://em-content.zobj.net/thumbs/160/google/350/rhinoceros_1f98f.png",
//       points: 8,
//     },
//     {
//       username: "darthmaul",
//       avatar_Url:
//         "https://em-content.zobj.net/thumbs/160/google/350/rhinoceros_1f98f.png",

//       points: 14383,
//     },
//     {
//       username: "austin",
//       avatar_Url:
//         "https://em-content.zobj.net/thumbs/160/google/350/octopus_1f419.png",
//       points: 765748383,
//     },
//     {
//       username: "JJ",
//       avatar_Url:
//         "https://em-content.zobj.net/thumbs/160/google/350/octopus_1f419.png",
//       points: 7876154653428343,
//     },
//     {
//       username: "muffinman",
//       avatar_Url:
//         "https://em-content.zobj.net/thumbs/160/google/350/octopus_1f419.png",
//       points: 6373493783,
//     },
//     {
//       username: "ginger",
//       avatar_Url:
//         "https://em-content.zobj.net/thumbs/160/google/350/octopus_1f419.png",

//       points: 6666777783,
//     },
//     {
//       username: "dashy",
//       avatar_Url:
//         "https://em-content.zobj.net/thumbs/160/google/350/octopus_1f419.png",
//       points: 9080980983,
//     },
//     {
//       username: "octo",
//       avatar_Url:
//         "https://em-content.zobj.net/thumbs/160/google/350/octopus_1f419.png",
//       points: 1783,
//     },
//     {
//       username: "dari",
//       avatar_Url:
//         "https://em-content.zobj.net/thumbs/160/google/350/elephant_1f418.png",
//       points: 99783,
//     },
//     {
//       username: "dealio",
//       avatar_Url:
//         "https://em-content.zobj.net/thumbs/160/google/350/elephant_1f418.png",
//       points: 908783,
//     },
//   ];
//   return (

//     <main className="leaderboard">
//       <div>
//       <h1>Highest Scores:</h1>
//       </div>
//       <div>
//       <ol>
//         {users.map((user) => { return (
//           <li key={user.username}>{user.username} <img className="lead-img"src={user.avatar_Url}/> {user.points}</li>
//         )
//         })}
//       </ol>
//       </div>
//     </main>

//   );
// };

// export default LeaderBoard;
import { supabase } from '@/utils/supabaseClient';
import { useState, useEffect } from 'react';

function Leaderboard () {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
      // Fetch initial leaderboard data
      fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('points', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching leaderboard:', error);
      } else {
        setLeaderboardData(data);
      }
    };


    return (
      <div className='leaderboard'>
      <table>
          <thead>
              <tr>
              <th>RANK</th>
              <th>NAME</th>
              <th>POINTS</th>
              </tr>
          </thead>
          <tbody>
              {leaderboardData.map((profile, index) => {
                  return (
                      <>
                          <tr className='leader-profiles' key={profile.id}>
                              <td >{index + 1}</td>
                              <td>{profile.username}</td>
                              <td>{profile.points}</td>
                              <td><img className='lead-img' src={profile.avatar_url}/></td>
                          </tr>
                      </>
                  )
                  })}
          </tbody>
      </table>
      </div>
  );
}

export default Leaderboard;
