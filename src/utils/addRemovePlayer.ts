import {
    Sport,
    Player,
    PositionSlots,
    DepthChart,
    SLOT_LABELS
} from '../types/depthChart';


export const addPlayer = (
    allDepthCharts: DepthChart,
    sport: Sport,
    player: Player,
    position: string,
    index?: number
) => {
    const newDepthChart: DepthChart = structuredClone(allDepthCharts);
    const positionSlots: PositionSlots = [...(newDepthChart[sport][position] || [])];

    // Check depthchart for player number conflict
    const allPositions = Object.keys(newDepthChart[sport]);
    for (const pos of allPositions) {
        const playersInPosition = newDepthChart[sport][pos] || [];
        const existingPlayer = playersInPosition.find(p => p.number === player.number);
        if (existingPlayer && existingPlayer.name !== player.name) {
            throw new Error(`A player with player no. ${player.number} already exists: ${existingPlayer.name}`);
        }
    }

    // Check if player already exists in the target slot
    const targetIndex = index ?? positionSlots.length;
    const existingPlayerInSlot = positionSlots[targetIndex];
    if (existingPlayerInSlot && existingPlayerInSlot.number === player.number) {
        const slotLabel = SLOT_LABELS[targetIndex];
        throw new Error(`(#${player.number}) ${player.name} is already in the ${position} position in the ${slotLabel} slot`);
    }

    // Now that we know there's no player number conflict, we can match by player number
    // Remove the player from their current position if they exist
    const existingIndex = positionSlots.findIndex(p => p.number === player.number);
    if (existingIndex !== -1) {
        // Remove player from current position
        positionSlots.splice(existingIndex, 1);
    }

    // And add player to the index if provided, otherwise add to the end
    positionSlots.splice(targetIndex, 0, player);

    // Update newDepthChart with the modified positionSlots
    newDepthChart[sport][position] = positionSlots.slice(0, 4);

    return newDepthChart;
}

export const removePlayer = (
    allDepthCharts: DepthChart,
    sport: Sport,
    player: Player,
    position: string
) => {
    const newDepthChart: DepthChart = structuredClone(allDepthCharts);
    const positionSlots: PositionSlots = [...(newDepthChart[sport][position] || [])];

    // Find and remove the player if they exist
    const existingIndex = positionSlots.findIndex(p => p.number === player.number);
    if (existingIndex !== -1) {
        positionSlots.splice(existingIndex, 1);
        newDepthChart[sport][position] = positionSlots;
    }

    return newDepthChart;
}
