import { SportChart } from "../types/depthChart";

export const mockNFLChart: SportChart = {
    QB: [
      { name: 'Tom Brady', number: 12 },
      { name: 'Jimmy Garoppolo', number: 10 },
      { name: 'Trey Lance', number: 5 },
    ],
    WR: [
      { name: 'Justin Jefferson', number: 18 },
      { name: 'Tyreek Hill', number: 10 },
    ],
    RB: [
      { name: 'Derrick Henry', number: 22 },
      { name: 'Nick Chubb', number: 24 },
      { name: 'Saquon Barkley', number: 26 },
      { name: 'Christian McCaffrey', number: 23 },
    ],
    TE: [],
    K: [{ name: 'Justin Tucker', number: 9 }],
    P: [],
    KR: [],
    PR: [],
  };
  
  export const mockSoccerChart: SportChart = {
    GK: [
      { name: 'Alisson Becker', number: 1 },
      { name: 'Ederson', number: 31 },
    ],
    RB: [
      { name: 'Trent Alexander-Arnold', number: 66 },
      { name: 'Reece James', number: 24 },
    ],
    LB: [
      { name: 'Jordi Alba', number: 18 },
    ],
    CDM: [
      { name: 'Casemiro', number: 5 },
      { name: 'Rodri', number: 16 },
    ],
    CAM: [
      { name: 'Kevin De Bruyne', number: 17 },
      { name: 'Martin Ødegaard', number: 8 },
    ],
    RW: [
      { name: 'Mohamed Salah', number: 11 },
    ],
    LW: [
      { name: 'Vinícius Jr.', number: 7 },
      { name: 'Phil Foden', number: 47 },
    ],
    SS: [
      { name: 'Paulo Dybala', number: 21 },
    ],
    ST: [
      { name: 'Erling Haaland', number: 9 },
      { name: 'Harry Kane', number: 10 },
      { name: 'Robert Lewandowski', number: 9 },
    ],
  };
  