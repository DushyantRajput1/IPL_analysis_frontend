// import React from 'react';
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, 
//   Tooltip, Legend, ResponsiveContainer 
// } from 'recharts';

// // This component uses a 'bars' array to support single or multiple data series.
// const BarChartVisualizer = ({ data, xAxisKey, bars, title }) => {
//   return (
//     <div className="chart-container" style={{ 
//         padding: '20px', 
//         margin: '10px',
//         boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
//         borderRadius: '8px', 
//         backgroundColor: '#fff',
//         width: '45%', 
//         minWidth: '400px'
//     }}>
//       <h3 style={{ textAlign: 'center', color: '#333' }}>{title}</h3>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart 
//           data={data}
//           margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey={xAxisKey} stroke="#555" /> 
//           <YAxis stroke="#555" />
//           <Tooltip />
//           <Legend />
          
//           {/* Dynamically renders all data series defined in the 'bars' prop */}
//           {bars.map((bar) => (
//              <Bar 
//                 key={bar.key} 
//                 dataKey={bar.key} 
//                 name={bar.name} 
//                 fill={bar.color} 
//                 // Group bars together if there's more than one
//                 {...(bars.length > 1 ? { fillOpacity: 0.85, barSize: 15 } : {})}
//              />
//           ))}
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default BarChartVisualizer;



import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const BarChartVisualizer = ({ data, xAxisKey, bars, title }) => {
  console.log("Rendering BarChartVisualizer with data:", data);
  console.log("Bars configuration:", bars);
  console.log("X-Axis Key:", xAxisKey);
  console.log("Title:", title);
  return (
    <div className="chart-container" style={{ 
        padding: '20px', 
        margin: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
        borderRadius: '8px', 
        backgroundColor: '#fff',
        width: '45%', 
        minWidth: '400px'
    }}>
      <h3 style={{ textAlign: 'center', color: '#333' }}>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={data}
          
          margin={{ top: 10, right: 30, left: 20, bottom: 50 }} 
        >
          <CartesianGrid strokeDasharray="3 3" />
          
          
          <XAxis 
            dataKey={xAxisKey} 
            stroke="#555" 
            angle={-45}        
            textAnchor="end"   
            interval={0}      
            height={70}        
          />
          {/* ------------------------- */}
          
          <YAxis stroke="#555" />
          <Tooltip />
          <Legend />
          
          {/* Dynamically render all bars passed in the 'bars' array */}
          {bars.map((bar) => (
             <Bar 
                key={bar.key} 
                dataKey={bar.key} 
                name={bar.name} 
                fill={bar.color} 
                {...(bars.length > 1 ? { fillOpacity: 0.85, barSize: 15 } : {})}
             />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartVisualizer;