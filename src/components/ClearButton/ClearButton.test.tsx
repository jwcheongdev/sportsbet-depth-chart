import { render, screen, fireEvent } from '@testing-library/react';
import { ClearChartButton } from './ClearButton';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';

const renderComponent = (onClearChart = jest.fn()) => {
    return render(
        <ThemeProvider theme={theme}>
            <ClearChartButton onClearChart={onClearChart} />
        </ThemeProvider>
    );
};

describe('ClearChartButton', () => {
    let mockOnClearChart: jest.Mock;

    beforeEach(() => {
        mockOnClearChart = jest.fn();
        jest.clearAllMocks();
    });

    it('renders the clear button', () => {
        renderComponent(mockOnClearChart);
        expect(screen.getByText('Clear all')).toBeInTheDocument();
    });

    it('calls onClearChart when clicked', () => {
        renderComponent(mockOnClearChart);
        const button = screen.getByText('Clear all');
        fireEvent.click(button);
        expect(mockOnClearChart).toHaveBeenCalledTimes(1);
    });
});
