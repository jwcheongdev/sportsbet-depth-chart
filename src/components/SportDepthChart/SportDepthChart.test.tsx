import { render, screen, fireEvent } from '@testing-library/react';
import { SportDepthChart } from './SportDepthChart';
import { mockNFLChart, mockSoccerChart } from '../../mocks/DepthChart';
import { Sport, SlotIndex, SportChart } from '../../types/depthChart';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';

describe('SportDepthChart', () => {
    let mockOnAddPlayer: jest.Mock;
    let mockOnChartUpdate: jest.Mock;
    let mockOnClearChart: jest.Mock;
    
    beforeEach(() => {
        mockOnAddPlayer = jest.fn();
        mockOnChartUpdate = jest.fn();
        mockOnClearChart = jest.fn();
        jest.clearAllMocks();
    });

    const renderComponent = (sport: Sport, sportChart: SportChart) => {
        return render(
            <ThemeProvider theme={theme}>
                <SportDepthChart
                    sport={sport}
                    sportChart={sportChart}
                    onAddPlayer={mockOnAddPlayer}
                    onChartUpdate={mockOnChartUpdate}
                    onClearChart={mockOnClearChart}
                />
            </ThemeProvider>
        );
    };

    it('renders the component with NFL sport', () => {
        renderComponent('NFL', mockNFLChart);

        // Check form inputs rendered
        expect(screen.getByLabelText('Player Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Position')).toBeInTheDocument();
        expect(screen.getByLabelText('Slot')).toBeInTheDocument();
        expect(screen.getByText('Add Player')).toBeInTheDocument();
        expect(screen.getByText('Fields with * are required')).toBeInTheDocument();

        // Check QB header rendered
        const qbHeader = screen.getByRole('rowheader', { name: 'QB' });
        expect(qbHeader).toBeInTheDocument();

        // Check players rendered
        expect(screen.getByText('(#12) Tom Brady')).toBeInTheDocument();
        expect(screen.getByText('(#10) Jimmy Garoppolo')).toBeInTheDocument();
    });

    it('renders the component with Soccer sport', () => {
        renderComponent('Soccer', mockSoccerChart);

        // Check form inputs rendered
        expect(screen.getByLabelText('Player Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Position')).toBeInTheDocument();
        expect(screen.getByLabelText('Slot')).toBeInTheDocument();
        const gkHeader = screen.getByRole('rowheader', { name: 'GK' });
        expect(gkHeader).toBeInTheDocument();
    });

    it('calls onAddPlayer with correct parameters when form is submitted', () => {
        renderComponent('NFL', mockNFLChart);

        // Add a player
        fireEvent.change(screen.getByLabelText('Player Name'), {
            target: { value: 'John Doe' }
        });
        fireEvent.change(screen.getByLabelText('Number'), {
            target: { value: '1' }
        });
        fireEvent.change(screen.getByLabelText('Position'), {
            target: { value: 'QB' }
        });
        fireEvent.change(screen.getByLabelText('Slot'), {
            target: { value: 'Starter' }
        });
        fireEvent.click(screen.getByText('Add Player'));

        expect(mockOnAddPlayer).toHaveBeenCalledWith(
            { name: 'John Doe', number: 1 },
            'QB',
            SlotIndex.Starter
        );
    });

    it('does not call onAddPlayer when form is invalid', () => {
        renderComponent('NFL', mockNFLChart);

        // Try to click Add Player without filling out form
        fireEvent.click(screen.getByText('Add Player'));

        expect(mockOnAddPlayer).not.toHaveBeenCalled();
    });

    it('calls onChartUpdate when a player is removed', () => {
        renderComponent('NFL', mockNFLChart);

        // Click the first remove button found, this should be for Tom Brady in QB Starter
        const removeButtons = screen.getAllByLabelText('Remove player button');
        fireEvent.click(removeButtons[0]);

        expect(mockOnChartUpdate).toHaveBeenCalled();
    });
}); 