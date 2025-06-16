import { useCallback, useMemo } from 'react'
import { Sport, Player, POSITIONS, SportChart, DepthChart, AVAILABLE_SPORTS } from './types/depthChart'
import { addPlayer } from './utils/addRemovePlayer';
import { SportDepthChart } from './components/SportDepthChart/SportDepthChart';
import { SportFilter } from './components/SportFilter/SportFilter';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { GlobalStyles } from './theme/globalStyles';
import { AppContainer } from './App.styles';
import { useLocalStorage } from './hooks/useLocalStorage';

// eslint-disable-next-line
import { mockNFLChart, mockSoccerChart } from './mocks/DepthChart';

function App() {
  const initialDepthChart: DepthChart = useMemo(() => ({
    NFL: Object.fromEntries(POSITIONS.NFL.map((position) => [position, []])),
    Soccer: Object.fromEntries(POSITIONS.Soccer.map((position) => [position, []])),
  }), []);

  // Leaving this here for testing purposes
  // const mockDepthChart: DepthChart = {
  //   NFL: mockNFLChart,
  //   Soccer: mockSoccerChart,
  // }
  // const [depthChartData, setDepthChartData] = useLocalStorage<DepthChart>('depthChartData', mockDepthChart);

  const [depthChartData, setDepthChartData] = useLocalStorage<DepthChart>('depthChartData', initialDepthChart);
  const [selectedSport, setSelectedSport] = useLocalStorage<Sport | undefined>('selectedSport', undefined);

  const handleAddPlayer = useCallback((sport: Sport, position: string, player: Player, slotIndex?: number) => {
    try {
      const newChart = addPlayer(depthChartData, sport, player, position, slotIndex);
      setDepthChartData(newChart);
    } catch (error) {
      // Display error message to user
      alert(error instanceof Error ? error.message : 'An error occurred while adding the player');
    }
  }, [depthChartData, setDepthChartData]);

  const handleChartUpdate = useCallback((sport: Sport, newSportChart: SportChart) => {
    setDepthChartData({
      ...depthChartData,
      [sport]: newSportChart
    });
  }, [depthChartData, setDepthChartData]);

  const handleClearChart = useCallback(() => {
    setDepthChartData(initialDepthChart);
  }, [initialDepthChart, setDepthChartData]);

  const handleSportSelect = useCallback((sport: Sport) => {
    setSelectedSport(sport);
  }, [setSelectedSport]);

  const visibleSports = useMemo(() => 
    AVAILABLE_SPORTS.filter(sport => selectedSport === sport),
    [selectedSport]
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <h1>Sportsbet Depth Charts</h1>
        <SportFilter 
          selectedSport={selectedSport} 
          onSportSelect={handleSportSelect}
        />
        <div>
          {visibleSports.map((sport) => (
            <SportDepthChart
              key={sport}
              sport={sport}
              sportChart={depthChartData[sport]}
              onAddPlayer={(player, position, slotIndex) => {
                handleAddPlayer(sport, position, player, slotIndex);
              }}
              onChartUpdate={(newSportChart) => {
                handleChartUpdate(sport, newSportChart);
              }}
              onClearChart={handleClearChart}
            />
          ))}
        </div>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
