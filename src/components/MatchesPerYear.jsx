import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import BarChartVisualizer from './BarChartVisualizer';

function MatchesPerYear() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = 'http://localhost:5000/api/matches-per-year'; 

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL);
            setChartData(response.data.data); 
            setLoading(false);
        } catch (err) { setLoading(false); console.error("API Error:", err); }
    };
    fetchData();
  }, []); 

  if (loading) return (<div style={{ padding: '20px', width: '45%' }}>Loading Matches Per Year...</div>);
    
  return (
    <BarChartVisualizer 
      data={chartData} 
      xAxisKey="year"          // Flask key
      bars={[{ key: "count", name: "Total Matches", color: "#007bff" }]} // Flask key
      title="IPL Matches Per Season"
    />
  );
}
export default MatchesPerYear;