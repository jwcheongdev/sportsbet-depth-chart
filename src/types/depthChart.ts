export type Player = {
    name: string;
    number: number; // we use a player's number as the unique identifier
};

export const SLOT_LABELS = ['Starter', 'Second', 'Third', 'Fourth'] as const;
export type SlotLabel = typeof SLOT_LABELS[number];

export type PositionSlots = Player[] // index 0=Starter, 1=Second, 2=Third, 3=Fourth
export enum SlotIndex {
    Starter = 0,
    Second = 1,
    Third = 2,
    Fourth = 3
}

export type Sport = 'NFL' | 'Soccer';

export const AVAILABLE_SPORTS = ['NFL', 'Soccer'] as const;

export const POSITIONS:  { [key in Sport]: string[] } = {
    NFL: ['QB', 'WR', 'RB', 'TE', 'K', 'P', 'KR', 'PR'],
    Soccer: ['GK', 'RB', 'LB', 'CDM', 'CAM', 'RW', 'LW', 'SS', 'ST'],
}

// Depth Chart for 1 sport
export type SportChart = {
    [position: string]: PositionSlots
}

// Depth Chart for all
export type DepthChart = {
    [key in Sport]: SportChart;
}