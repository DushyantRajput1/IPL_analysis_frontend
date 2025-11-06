import React, { useState } from 'react';
import MatchesPerYear from './components/MatchesPerYear'; 
import MatchesWonPerTeam from './components/MatchesWonPerTeam'; 
import ExtrasPerTeam from './components/ExtrasPerTeam'; 
import TopEconomicalBowlers from './components/TopEconomicalBowlers'; 
import MatchesPlayedVsWon from './components/MatchesPlayedVsWon';
import './index.css'; 
import iplLogo from './assets/download.png';
import sehwagPhoto from './assets/sehwag.jpeg';
const IPL_YEARS = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
const VIEWS = [
    { id: 'none', name: 'Select Analysis...', component: null }, 
    { id: 'matches-per-year', name: 'Matches Per Season', component: 'MatchesPerYear' },
    { id: 'matches-won-per-team', name: 'Overall Wins Per Team', component: 'MatchesWonPerTeam' },
    { id: 'extras-per-team', name: 'Extras Conceded (Yearly)', component: 'ExtrasPerTeam' },
    { id: 'top-bowlers', name: 'Top Economical Bowlers (Yearly)', component: 'TopEconomicalBowlers' },
    { id: 'played-vs-won', name: 'Played vs Won (Yearly)', component: 'MatchesPlayedVsWon' },
];

function App() {
  const [selectedYear, setSelectedYear] = useState(IPL_YEARS[IPL_YEARS.length - 1]);
  const [selectedView, setSelectedView] = useState('none');

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value)); 
  };

  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
  };
  

  const renderSingleViewWithPhoto = (Component, props = {}) => {
      return (

          <div style={{ 
              display: 'flex', 
              width: '95%',
              height: '70vh', 
              margin: '20px auto', 
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
              borderRadius: '8px',
              overflow: 'hidden', 
              backgroundColor: '#fff'
          }}>
              {/* Left Half: Sehwag Photo - Takes exactly 50% of the container width */}
              <div style={{ 
                  flex: '1 1 50%', 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px',
                  backgroundColor: '#f8f9fa' // Slightly different background for contrast
              }}>
                   <h3 style={{ textAlign: 'center', color: '#dc3545', marginBottom: '10px' }}>Legend View</h3>
                   <img 
                       src={sehwagPhoto} 
                       alt="Virender Sehwag" 
                       style={{ 
                           maxWidth: '100%', 
                           maxHeight: '80%', // Limit image height to fit text
                           objectFit: 'contain', // Ensures the entire image is visible
                           borderRadius: '4px' 
                       }}
                   />
                   <p style={{ textAlign: 'center', fontSize: '0.9em', color: '#6c757d', marginTop: '10px' }}>
                       Virender Sehwag: The Nawab of Najafgarh
                   </p>
              </div>
              
              {/* Right Half: Analytical Chart - Takes exactly 50% of the container width */}
              <div style={{ 
                  flex: '1 1 50%', // Grow, shrink, base 50%
                  display: 'flex', 
                  alignItems: 'center', // Center the chart vertically
                  justifyContent: 'center', // Center the chart horizontally
                  padding: '20px' // Add some padding around the chart
              }}>
                  <Component {...props} />
              </div>
          </div>
      );
  };


  const renderContent = () => {
    switch (selectedView) {
      case 'none':
        return (
            <div style={{ padding: '50px', textAlign: 'center', color: '#6c757d' }}>
                <h2 style={{ marginBottom: '20px' }}>Welcome to the IPL Data Dashboard</h2>
                <p style={{ fontSize: '1.1em' }}>Please select an analysis view from the dropdown above to begin.</p>
                <p style={{ fontSize: '0.9em', marginTop: '10px' }}>You can also choose "All Charts (Overview)" for a comprehensive look.</p>
            </div>
        );
        
      case 'matches-per-year':
        return renderSingleViewWithPhoto(MatchesPerYear);
        
      case 'matches-won-per-team':
        return renderSingleViewWithPhoto(MatchesWonPerTeam);
        
      case 'extras-per-team':
        return renderSingleViewWithPhoto(ExtrasPerTeam, { year: selectedYear });
        
      case 'top-bowlers':
        return renderSingleViewWithPhoto(TopEconomicalBowlers, { year: selectedYear });
        
      case 'played-vs-won':
        return renderSingleViewWithPhoto(MatchesPlayedVsWon, { year: selectedYear });
        
      case 'all':
      default:
        // 'All Charts (Overview)' view, displays all charts without Sehwag photo
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', padding: '20px', width: '95%', margin: '0 auto' }}>
                <MatchesPerYear />
                <MatchesWonPerTeam />
                <ExtrasPerTeam year={selectedYear} />
                <TopEconomicalBowlers year={selectedYear} />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <MatchesPlayedVsWon year={selectedYear} />
                </div>
            </div>
        );
    }
  };

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#f4f7f9' }}>
      
      <header style={{ 
        backgroundColor: '#007bff', 
        padding: '20px', 
        color: 'white', 
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
             <img 
                 src={iplLogo} 
                 alt="IPL Official Logo" 
                 style={{ height: '70px', marginRight: '20px' }}
             />
             <h1 style={{ margin: 0 }}>Indian Premier League (IPL) Dashboard</h1>
        </div>
        <p>Complete Analysis of INDIAN PRIMER LEAGUE</p>
        
        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '30px' }}>
            <label>
                Select View:
                <select 
                    value={selectedView} 
                    onChange={handleViewChange}
                    style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }}
                >
                    {VIEWS.map(view => (
                        <option key={view.id} value={view.id}>{view.name}</option>
                    ))}
                </select>
            </label>

            {/* Year selector visibility logic remains the same */}
            {['all', 'extras-per-team', 'top-bowlers', 'played-vs-won'].includes(selectedView) && (
                <label>
                    Select Year for Filtered Charts:
                    <select 
                        value={selectedYear} 
                        onChange={handleYearChange}
                        style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }}
                    >
                        {IPL_YEARS.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </label>
            )}
        </div>
      </header>
      
      <main style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '20px', 
        padding: '20px' 
      }}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;