import React from 'react';
import { Sport, Player, SportChart, } from '../../types/depthChart';
import { AddPlayer } from '../AddPlayerForm/AddPlayer';
import { DepthChartTable } from '../DepthChartTable/DepthChartTable';
import { ClearChartButton } from '../ClearButton/ClearButton';

interface SportChartProps {
    sport: Sport;
    sportChart: SportChart;
    onAddPlayer: (player: Player, position: string, slotIndex?: number) => void;
    onChartUpdate: (newChart: SportChart) => void;
    onClearChart: () => void;
}

export const SportDepthChart: React.FC<SportChartProps> = ({ sport, sportChart, onAddPlayer, onChartUpdate, onClearChart }) => {
    return (
        <div>
            <AddPlayer
                sport={sport}
                onAddPlayer={onAddPlayer}
            />
            <DepthChartTable    
                chart={sportChart}
                sport={sport}
                onChartUpdate={onChartUpdate}
            />
            <ClearChartButton onClearChart={onClearChart} />
        </div>
    )
}