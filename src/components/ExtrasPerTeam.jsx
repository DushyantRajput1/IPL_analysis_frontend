// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios'; 
// // import BarChartVisualizer from './BarChartVisualizer';

// // const YEAR_TO_FETCH = 2016; // Hardcode the year for the initial dashboard

// // function ExtrasPerTeam() {
// //   const [chartData, setChartData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const API_URL = `http://localhost:5000/api/extras-per-team/${YEAR_TO_FETCH}`; 

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

// //   if (loading) return (<div style={{ padding: '20px', width: '45%' }}>Loading Extras Per Team...</div>);
    
// //   return (
// //     <BarChartVisualizer 
// //       data={chartData} 
// //       xAxisKey="team"         // Flask key
// //       bars={[{ key: "extras", name: "Extra Runs Conceded", color: "#ffc107" }]} // Flask key
// //       title={`Extra Runs Conceded by Team (${YEAR_TO_FETCH})`}
// //     />
// //   );
// // }
// // export default ExtrasPerTeam;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; 
// import BarChartVisualizer from './BarChartVisualizer';

// // Accept 'year' as a prop
// function ExtrasPerTeam({ year }) {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // API_URL will now be dynamic based on the 'year' prop
//   const API_URL = `http://localhost:5000/api/extras-per-team/${year}`; 

//   useEffect(() => {
//     // Only fetch if a year is provided
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
//   // This causes the fetch to re-run ONLY when 'year' changes.
//   }, [year]); 

//   if (loading) return (<div style={{ padding: '20px', width: '45%' }}>Loading Extras Per Team for {year}...</div>);
    
//   return (
//     <BarChartVisualizer 
//       data={chartData} 
//       xAxisKey="team"         
//       bars={[{ key: "extras", name: "Extra Runs Conceded", color: "#ffc107" }]} 
//       title={`Extra Runs Conceded by Team (${year})`}
//     />
//   );
// }
// export default ExtrasPerTeam;


import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import BarChartVisualizer from './BarChartVisualizer';

// --- Shared Team Mapping Function ---
const teamAliases = {
    "Mumbai Indians": "MI", "Chennai Super Kings": "CSK", "Kolkata Knight Riders": "KKR", 
    "Royal Challengers Bangalore": "RCB", "Sunrisers Hyderabad": "SRH", "Kings XI Punjab": "KXIP", 
    "Delhi Daredevils": "DD", "Deccan Chargers": "DC", "Pune Warriors": "PWI", 
    "Gujarat Lions": "GL", "Rising Pune Supergiants": "RPSG", "Rising Pune Supergiant": "RPS", 
    "Kochi Tuskers Kerala": "KTK" , "Rajasthan Royals": "RR"
};
const mapTeamName = (teamName) => teamAliases[teamName] || teamName;
// ------------------------------------

function ExtrasPerTeam({ year }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = `http://localhost:5000/api/extras-per-team/${year}`; 

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

  if (loading) return (<div style={{ padding: '20px', width: '45%' }}>Loading Extras Per Team for {year}...</div>);
    
  return (
    <BarChartVisualizer 
      data={chartData} 
      xAxisKey="team"         
      bars={[{ key: "extras", name: "Extra Runs Conceded", color: "#ffc107" }]} 
      title={`Extra Runs Conceded by Team (${year})`}
    />
  );
}
export default ExtrasPerTeam;