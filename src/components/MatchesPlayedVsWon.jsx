// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios'; 
// // import BarChartVisualizer from './BarChartVisualizer';

// // const YEAR_TO_FETCH = 2016; // Hardcode the year for the initial dashboard

// // function MatchesPlayedVsWon() {
// //   const [chartData, setChartData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const API_URL = `http://localhost:5000/api/matches-played-vs-won/${YEAR_TO_FETCH}`; 

// //   useEffect(() => {
// //     const fetchData = async () => {
// //         try {
// //             const response = await axios.get(API_URL);
// //             setChartData(response.data.data); 
// //             setLoading(false);
// //         } catch (err) { setLoading(false); console.error("API Error:", err); }
// //     };
// //     fetchData();
// //   }, []); 

// //   if (loading) return (<div style={{ padding: '20px', width: '90%' }}>Loading Matches Played vs Won...</div>);
    
// //   // This component uses two bars against the same x-axis key ('team')
// //   const barConfigurations = [
// //       { key: "played", name: "Matches Played", color: "#adb5bd" },
// //       { key: "won", name: "Matches Won", color: "#007bff" }
// //   ];

// //   return (
// //     <BarChartVisualizer 
// //       data={chartData} 
// //       xAxisKey="team"         // Flask key
// //       bars={barConfigurations}
// //       title={`Matches Played vs. Won by Team (${YEAR_TO_FETCH})`}
// //     />
// //   );
// // }
// // export default MatchesPlayedVsWon;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; 
// import BarChartVisualizer from './BarChartVisualizer';

// // Accept 'year' as a prop
// function MatchesPlayedVsWon({ year }) {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // API_URL will now be dynamic based on the 'year' prop
//   const API_URL = `http://localhost:5000/api/matches-played-vs-won/${year}`; 

//   useEffect(() => {
//     if (!year) return;

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             // Use the dynamic URL
//             const response = await axios.get(API_URL);
//             setChartData(response.data.data); 
//             setLoading(false);
//         } catch (err) { setLoading(false); console.error(`API Error for ${year}:`, err); }
//     };
//     fetchData();
//   // IMPORTANT: The dependency array now includes 'year'.
//   }, [year]); 

//   if (loading) return (<div style={{ padding: '20px', width: '90%' }}>Loading Matches Played vs Won for {year}...</div>);
    
//   const barConfigurations = [
//       { key: "played", name: "Matches Played", color: "#adb5bd" },
//       { key: "won", name: "Matches Won", color: "#007bff" }
//   ];

//   return (
//     <BarChartVisualizer 
//       data={chartData} 
//       xAxisKey="team"         
//       bars={barConfigurations}
//       title={`Matches Played vs. Won by Team (${year})`}
//     />
//   );
// }
// export default MatchesPlayedVsWon;


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

function MatchesPlayedVsWon({ year }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = `http://localhost:5000/api/matches-played-vs-won/${year}`; 

  useEffect(() => {
    if (!year) return;

    const fetchData = async () => {
        setLoading(true);
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
        } catch (err) { setLoading(false); console.error(`API Error for ${year}:`, err); }
    };
    fetchData();
  }, [year]); 

  if (loading) return (<div style={{ padding: '20px', width: '90%' }}>Loading Matches Played vs Won for {year}...</div>);
    
  const barConfigurations = [
      { key: "played", name: "Matches Played", color: "#adb5bd" },
      { key: "won", name: "Matches Won", color: "#007bff" }
  ];

  return (
    <BarChartVisualizer 
      data={chartData} 
      xAxisKey="team"         
      bars={barConfigurations}
      title={`Matches Played vs. Won by Team (${year})`}
    />
  );
}
export default MatchesPlayedVsWon;