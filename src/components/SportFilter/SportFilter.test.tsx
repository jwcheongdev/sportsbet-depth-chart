import { render, screen, fireEvent } from '@testing-library/react';
import { SportFilter } from './SportFilter';
import { AVAILABLE_SPORTS, Sport } from '../../types/depthChart';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';

const renderComponent = (selectedSport?: Sport, onSportSelect = jest.fn()) => {
    return render(
        <ThemeProvider theme={theme}>
            <SportFilter selectedSport={selectedSport} onSportSelect={onSportSelect} />
        </ThemeProvider>
    );
};

describe('SportFilter', () => {
    const mockOnSportSelect = jest.fn();

    beforeEach(() => {
        mockOnSportSelect.mockClear();
    });

    it('on load - renders all available sports with nothing selected', () => {
        renderComponent(undefined, mockOnSportSelect);
        
        AVAILABLE_SPORTS.forEach(sport => {
            expect(screen.getByText(sport)).toBeInTheDocument();
        });
    });

    it('highlights the selected sport', () => {
        const selectedSport = 'NFL';
        renderComponent(selectedSport, mockOnSportSelect);
        
        const selectedButton = screen.getByText(selectedSport);
        expect(selectedButton).toHaveStyle({ backgroundColor: theme.colors.primary.main });
    });

    it('calls onSportSelect with the correct sport when clicked', () => {
        renderComponent(undefined, mockOnSportSelect);
        
        const sportToClick = 'Soccer';
        const button = screen.getByText(sportToClick);
        fireEvent.click(button);
        
        expect(mockOnSportSelect).toHaveBeenCalledTimes(1);
        expect(mockOnSportSelect).toHaveBeenCalledWith(sportToClick);
    });
}); 