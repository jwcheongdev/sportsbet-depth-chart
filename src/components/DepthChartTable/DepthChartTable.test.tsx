import { render, screen, fireEvent } from '@testing-library/react';
import { DepthChartTable } from './DepthChartTable';
import { mockNFLChart, mockSoccerChart } from '../../mocks/DepthChart';
import { Sport } from '../../types/depthChart';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';

describe('DepthChartTable', () => {
    let mockOnChartUpdate: jest.Mock;

    beforeEach(() => {
        mockOnChartUpdate = jest.fn();
        jest.clearAllMocks();
    });

    const renderComponent = (sport: Sport, chart = mockNFLChart) => {
        return render(
            <ThemeProvider theme={theme}>
                <DepthChartTable
                    sport={sport}
                    chart={chart}
                    onChartUpdate={mockOnChartUpdate}
                />
            </ThemeProvider>
        );
    };

    it('renders the table with NFL data', () => {
        renderComponent('NFL');

        // Check if position headers are rendered
        expect(screen.getByText('Position')).toBeInTheDocument();
        expect(screen.getByText('Starter')).toBeInTheDocument();
        expect(screen.getByText('Second')).toBeInTheDocument();
        expect(screen.getByText('Third')).toBeInTheDocument();
        expect(screen.getByText('Fourth')).toBeInTheDocument();

        // Check NFL positions rendered
        expect(screen.getByText('QB')).toBeInTheDocument();
        expect(screen.getByText('WR')).toBeInTheDocument();
        expect(screen.getByText('RB')).toBeInTheDocument();

        // Check players rendered
        expect(screen.getByText('(#12) Tom Brady')).toBeInTheDocument();
        expect(screen.getByText('(#10) Jimmy Garoppolo')).toBeInTheDocument();
        expect(screen.getByText('(#18) Justin Jefferson')).toBeInTheDocument();
    });

    it('renders the table with Soccer data', () => {
        renderComponent('Soccer', mockSoccerChart);

        // Check Soccer positions rendered
        expect(screen.getByText('GK')).toBeInTheDocument();
        expect(screen.getByText('RB')).toBeInTheDocument();
        expect(screen.getByText('ST')).toBeInTheDocument();

        // Check players rendered
        expect(screen.getByText('(#1) Alisson Becker')).toBeInTheDocument();
        expect(screen.getByText('(#66) Trent Alexander-Arnold')).toBeInTheDocument();
    });

    it('calls onChartUpdate when a player is removed', () => {
        renderComponent('NFL');

        // Click the first remove button found, this should be for Tom Brady in QB Starter
        const removeButtons = screen.getAllByLabelText('Remove player button');
        fireEvent.click(removeButtons[0]);

        // Check onChartUpdate was called
        expect(mockOnChartUpdate).toHaveBeenCalledTimes(1);
        expect(mockOnChartUpdate).toHaveBeenCalledWith(expect.objectContaining({
            QB: [
                { name: 'Jimmy Garoppolo', number: 10 },
                { name: 'Trey Lance', number: 5 }
            ],
            WR: [
                { name: 'Justin Jefferson', number: 18 },
                { name: 'Tyreek Hill', number: 10 }
            ],
            RB: [
                { name: 'Derrick Henry', number: 22 },
                { name: 'Nick Chubb', number: 24 },
                { name: 'Saquon Barkley', number: 26 },
                { name: 'Christian McCaffrey', number: 23 }
            ]
        }));
    });
}); 