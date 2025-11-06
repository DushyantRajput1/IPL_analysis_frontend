// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; 
// import BarChartVisualizer from './BarChartVisualizer';

// function MatchesWonPerTeam() {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const API_URL = 'http://localhost:5000/api/matches-won-per-team'; 

//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const response = await axios.get(API_URL);
//             setChartData(response.data.data); 
//             setLoading(false);
//         } catch (err) { setLoading(false); console.error("API Error:", err); }
//     };
//     fetchData();
//   }, []); 

//   if (loading) return (<div style={{ padding: '20px', width: '45%' }}>Loading Wins Per Team...</div>);
    
//   return (
//     <BarChartVisualizer 
//       data={chartData} 
//       xAxisKey="team"         // Flask key
//       bars={[{ key: "wins", name: "Total Wins", color: "#28a745" }]} // Flask key
//       title="Overall Wins Per Team"
//     />
//   );
// }
// export default MatchesWonPerTeam;



import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import BarChartVisualizer from './BarChartVisualizer';

// --- Shared Team Mapping Function ---
const teamAliases = {
    "Mumbai Indians": "MI", "Chennai Super Kings": "CSK", "Kolkata Knight Riders": "KKR", 
    "Royal Challengers Bangalore": "RCB", "Sunrisers Hyderabad": "SRH", "Kings XI Punjab": "KXIP", 
    "Delhi Daredevils": "DD", "Deccan Chargers": "DC", "Pune Warriors": "PWI", 
    "Gujarat Lions": "GL", "Rising Pune Supergiants": "RPSG", "Rising Pune Supergiant": "RPS", 
    "Kochi Tuskers Kerala": "KTK"
};
const mapTeamName = (teamName) => teamAliases[teamName] || teamName;
// ------------------------------------

function MatchesWonPerTeam() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = 'http://localhost:5000/api/matches-won-per-team'; 

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL);
            
            // --- FIX APPLIED HERE: Map team names to aliases ---
            const transformedData = response.data.data.map(item => ({
                ...item,
                team: mapTeamName(item.team) // Alias the team name
            }));
            // ----------------------------------------------------

            setChartData(transformedData); 
            setLoading(false);
        } catch (err) { setLoading(false); console.error("API Error:", err); }
    };
    fetchData();
  }, []); 

  if (loading) return (<div style={{ padding: '20px', width: '45%' }}>Loading Wins Per Team...</div>);
    
  return (
    <BarChartVisualizer 
      data={chartData} 
      xAxisKey="team"         
      bars={[{ key: "wins", name: "Total Wins", color: "#28a745" }]} 
      title="Overall Wins Per Team (All Time)"
    />
  );
}
export default MatchesWonPerTeam;