// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; 
// import BarChartVisualizer from './BarChartVisualizer';

// const YEAR_TO_FETCH = 2016; // Hardcode the year for the initial dashboard

// function TopEconomicalBowlers() {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const API_URL = `http://localhost:5000/api/top-economical-bowlers/${YEAR_TO_FETCH}`; 

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

//   if (loading) return (<div style={{ padding: '20px', width: '45%' }}>Loading Top Bowlers...</div>);
    
//   return (
//     <BarChartVisualizer 
//       data={chartData} 
//       xAxisKey="bowler"         // Flask key
//       bars={[{ key: "economy", name: "Economy Rate", color: "#dc3545" }]} // Flask key
//       title={`Top 10 Economical Bowlers (${YEAR_TO_FETCH})`}
//     />
//   );
// }
// export default TopEconomicalBowlers;



import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import BarChartVisualizer from './BarChartVisualizer';

// Accept 'year' as a prop
function TopEconomicalBowlers({ year }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // API_URL will now be dynamic based on the 'year' prop
  const API_URL = `http://localhost:5000/api/top-economical-bowlers/${year}`; 

  useEffect(() => {
    if (!year) return;

    const fetchData = async () => {
        setLoading(true);
        try {
            // Use the dynamic URL
            const response = await axios.get(API_URL);
            setChartData(response.data.data); 
            setLoading(false);
        } catch (err) { setLoading(false); console.error(`API Error for ${year}:`, err); }
    };
    fetchData();
  // IMPORTANT: The dependency array now includes 'year'.
  }, [year]); 

  if (loading) return (<div style={{ padding: '20px', width: '45%' }}>Loading Top Bowlers for {year}...</div>);
    
  return (
    <BarChartVisualizer 
      data={chartData} 
      xAxisKey="bowler"         
      bars={[{ key: "economy", name: "Economy Rate", color: "#dc3545" }]} 
      title={`Top 10 Economical Bowlers (${year})`}
    />
  );
}
export default TopEconomicalBowlers;