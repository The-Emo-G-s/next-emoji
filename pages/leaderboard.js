
import { supabase } from '@/utils/supabaseClient';
import { useState, useEffect } from 'react';

function Leaderboard () {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
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
                              <td>{profile.username} &nbsp; <img className='lead-img' src={profile.avatar_url}/></td>
                              <td>{profile.points}</td>
                              <td></td>
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
