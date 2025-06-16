import React, { useCallback, memo } from 'react'
import { SportChart, SLOT_LABELS, Sport, Player, DepthChart } from '../../types/depthChart';
import { Table, HeaderCell, Cell, PlayerSpan, RemoveButton } from './DepthChartTable.styles';
import { removePlayer } from '../../utils/addRemovePlayer';

interface DepthChartTableProps {
    chart: SportChart;
    sport: Sport;
    onChartUpdate: (newChart: SportChart) => void; 
}

export const DepthChartTable: React.FC<DepthChartTableProps> = memo(({ chart, sport, onChartUpdate }) => {
    const handleRemovePlayer = useCallback((position: string, player: Player) => {
        const newChart = removePlayer({ [sport]: chart } as DepthChart, sport, player, position);
        onChartUpdate(newChart[sport]);
    }, [chart, sport, onChartUpdate]);

    return (
        <Table>
            <thead>
                <tr>
                    <HeaderCell>Position</HeaderCell>
                    {SLOT_LABELS.map((label) => (
                        <HeaderCell key={label}>{label}</HeaderCell>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.entries(chart).map(([position, players]) => (
                    <tr key={position}>
                        <HeaderCell role="rowheader">{position}</HeaderCell>
                        {SLOT_LABELS.map((slotLabel, index) => {
                            const player = players[index];
                            return (
                                <Cell key={slotLabel}>
                                    {player ? (
                                        <>
                                            <PlayerSpan>(#{player.number}) {player.name}</PlayerSpan>
                                            <RemoveButton 
                                                onClick={() => handleRemovePlayer(position, player)}
                                                aria-label="Remove player button"
                                            >
                                                ×
                                            </RemoveButton>
                                        </>
                                    ) : null}
                                </Cell>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
});