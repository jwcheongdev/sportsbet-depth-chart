import { addPlayer, removePlayer } from './addRemovePlayer';
import { DepthChart, Player } from '../types/depthChart';
import { mockNFLChart, mockSoccerChart } from '../mocks/DepthChart';

describe('addRemovePlayer util functions', () => {
    const mockDepthChart: DepthChart = {
        NFL: mockNFLChart,
        Soccer: mockSoccerChart
    };

    describe('addPlayer function', () => {
        it('should add a new player to an empty position', () => {
            const player: Player = { name: 'Patrick Mahomes', number: 15 };
            const result = addPlayer(mockDepthChart, 'NFL', player, 'TE');
            expect(result.NFL.TE).toEqual([player]);
        });

        it('should add a player to the next empty slot', () => {
            const player: Player = { name: 'Patrick Mahomes', number: 15 };
            const result = addPlayer(mockDepthChart, 'NFL', player, 'QB');
            expect(result.NFL.QB).toEqual([
                { name: 'Tom Brady', number: 12 },
                { name: 'Jimmy Garoppolo', number: 10 },
                { name: 'Trey Lance', number: 5 },
                player
            ]);
        });

        it('should add a player at specified index', () => {
            const player: Player = { name: 'Patrick Mahomes', number: 15 };
            const result = addPlayer(mockDepthChart, 'NFL', player, 'QB', 1);
            expect(result.NFL.QB).toEqual([
                { name: 'Tom Brady', number: 12 },
                player,
                { name: 'Jimmy Garoppolo', number: 10 },
                { name: 'Trey Lance', number: 5 }
            ]);
        });

        it('should limit position slots to 4 players', () => {
            const player1: Player = { name: 'Patrick Mahomes', number: 15 };
            const player2: Player = { name: 'Aaron Rodgers', number: 8 };
            const player3: Player = { name: 'Russell Wilson', number: 3 };
            const player4: Player = { name: 'Josh Allen', number: 17 };
            const player5: Player = { name: 'Lamar Jackson', number: 8 };

            const result = addPlayer(mockDepthChart, 'NFL', player1, 'QB');
            const result2 = addPlayer(result, 'NFL', player2, 'QB');
            const result3 = addPlayer(result2, 'NFL', player3, 'QB');
            const result4 = addPlayer(result3, 'NFL', player4, 'QB');
            const result5 = addPlayer(result4, 'NFL', player5, 'QB');
            expect(result5.NFL.QB).toHaveLength(4);
            expect(result5.NFL.QB).toEqual([
                { name: 'Tom Brady', number: 12 },
                { name: 'Jimmy Garoppolo', number: 10 },
                { name: 'Trey Lance', number: 5 },
                player1
            ]);
        });

        it('should throw error when adding player with the same number as an existing player', () => {
            const player: Player = { name: 'Different Player', number: 12 }; // Same number as Tom Brady
            expect(() => addPlayer(mockDepthChart, 'NFL', player, 'WR')).toThrow(
                'A player with player no. 12 already exists: Tom Brady'
            );
        });

        it('should throw error when adding player to slot they already occupy', () => {
            const player: Player = { name: 'Tom Brady', number: 12 };
            expect(() => addPlayer(mockDepthChart, 'NFL', player, 'QB', 0)).toThrow(
                '(#12) Tom Brady is already in the QB position in the Starter slot'
            );
        });

        it('should move player from one slot to another within the same position', () => {
            const player: Player = { name: 'Tom Brady', number: 12 };
            const result = addPlayer(mockDepthChart, 'NFL', player, 'QB', 2)
            expect(result.NFL.QB).toEqual([
                { name: 'Jimmy Garoppolo', number: 10 },
                { name: 'Trey Lance', number: 5 },
                player
            ]);
        });
    });

    describe('removePlayer function', () => {
        it('should remove an existing player from a position', () => {
            const player: Player = { name: 'Tom Brady', number: 12 };
            const result = removePlayer(mockDepthChart, 'NFL', player, 'QB');
            expect(result.NFL.QB).toEqual([
                { name: 'Jimmy Garoppolo', number: 10 },
                { name: 'Trey Lance', number: 5 }
            ]);
        });

        it('should not modify depth chart if player does not exist', () => {
            const player: Player = { name: 'Patrick Mahomes', number: 15 };
            const result = removePlayer(mockDepthChart, 'NFL', player, 'QB');
            expect(result).toEqual(mockDepthChart);
        });
    });
}); 