import { render, screen, fireEvent } from '@testing-library/react';
import { AddPlayer } from './AddPlayer';
import { Sport, POSITIONS, SLOT_LABELS, SlotIndex } from '../../types/depthChart';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';

const renderComponent = (sport: Sport, onAddPlayer = jest.fn()) => {
    return render(
        <ThemeProvider theme={theme}>
            <AddPlayer sport={sport} onAddPlayer={onAddPlayer} />
        </ThemeProvider>
    );
};

describe('AddPlayer', () => {
    let mockOnAddPlayer: jest.Mock;

    beforeEach(() => {
        mockOnAddPlayer = jest.fn();
        jest.clearAllMocks();
    });

    it('renders all form elements correctly', () => {
        renderComponent('NFL', mockOnAddPlayer);

        expect(screen.getByLabelText('Player Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Number')).toBeInTheDocument();
        expect(screen.getByLabelText('Position')).toBeInTheDocument();
        expect(screen.getByLabelText('Slot')).toBeInTheDocument();
        expect(screen.getByText('Add Player')).toBeInTheDocument();
        expect(screen.getByText('Fields with * are required')).toBeInTheDocument();
    });

    it('renders correct positions based on sport - NFL', () => {
        renderComponent('NFL', mockOnAddPlayer);

        const positionSelects = screen.getAllByLabelText('Position');
        const nflPositionSelect = positionSelects[0];
        POSITIONS.NFL.forEach(position => {
            expect(nflPositionSelect).toHaveTextContent(position);
        });
    });
    
    it('renders correct positions based on sport - Soccer', () => {
        renderComponent('Soccer', mockOnAddPlayer);

        const positionSelects = screen.getAllByLabelText('Position');
        const soccerPositionSelect = positionSelects[0];
        POSITIONS.Soccer.forEach(position => {
            expect(soccerPositionSelect).toHaveTextContent(position);
        });
    });

    it('renders all slot options', () => {
        renderComponent('NFL', mockOnAddPlayer);
        
        const slotSelect = screen.getByLabelText('Slot');
        SLOT_LABELS.forEach(slot => {
            expect(slotSelect).toHaveTextContent(slot);
        });
    });

    it('disables add button when form is invalid', () => {
        renderComponent('NFL', mockOnAddPlayer);
        
        const addButton = screen.getByText('Add Player');
        expect(addButton).toBeDisabled();

        // Fill in only name
        fireEvent.change(screen.getByLabelText('Player Name'), {
            target: { value: 'John Doe' }
        });
        expect(addButton).toBeDisabled();

        // Fill in name and number
        fireEvent.change(screen.getByLabelText('Number'), {
            target: { value: '8' }
        });
        expect(addButton).toBeDisabled();

        // Fill in name, number, and position
        fireEvent.change(screen.getByLabelText('Position'), {
            target: { value: 'QB' }
        });
        expect(addButton).not.toBeDisabled();
    });

    it('calls onAddPlayer with correct parameters when form is submitted', () => {
        renderComponent('NFL', mockOnAddPlayer);

        // Fill in all required fields
        fireEvent.change(screen.getByLabelText('Player Name'), {
            target: { value: 'John Doe' }
        });
        fireEvent.change(screen.getByLabelText('Number'), {
            target: { value: '8' }
        });
        fireEvent.change(screen.getByLabelText('Position'), {
            target: { value: 'QB' }
        });
        fireEvent.change(screen.getByLabelText('Slot'), {
            target: { value: 'Starter' }
        });

        // Submit form
        fireEvent.click(screen.getByText('Add Player'));

        expect(mockOnAddPlayer).toHaveBeenCalledWith(
            { name: 'John Doe', number: 8 },
            'QB',
            SlotIndex.Starter
        );
    });

    it('calls onAddPlayer without slot index when no slot is selected', () => {
        renderComponent('NFL', mockOnAddPlayer);

        // Fill in required fields without slot
        fireEvent.change(screen.getByLabelText('Player Name'), {
            target: { value: 'John Doe' }
        });
        fireEvent.change(screen.getByLabelText('Number'), {
            target: { value: '8' }
        });
        fireEvent.change(screen.getByLabelText('Position'), {
            target: { value: 'QB' }
        });

        // Submit form
        fireEvent.click(screen.getByText('Add Player'));

        expect(mockOnAddPlayer).toHaveBeenCalledWith(
            { name: 'John Doe', number: 8 },
            'QB',
            undefined
        );
    });

    it('resets form after adding a player', () => {
        renderComponent('NFL', mockOnAddPlayer);

        // Fill in all fields
        fireEvent.change(screen.getByLabelText('Player Name'), {
            target: { value: 'John Doe' }
        });
        fireEvent.change(screen.getByLabelText('Number'), {
            target: { value: '8' }
        });
        fireEvent.change(screen.getByLabelText('Position'), {
            target: { value: 'QB' }
        });
        fireEvent.change(screen.getByLabelText('Slot'), {
            target: { value: 'Starter' }
        });

        // Submit form
        fireEvent.click(screen.getByText('Add Player'));

        // Check all fields are reset
        const nameInput = screen.getByLabelText('Player Name');
        const numberInput = screen.getByLabelText('Number');
        const positionSelect = screen.getByLabelText('Position');
        const slotSelect = screen.getByLabelText('Slot');

        expect(nameInput).toHaveValue('');
        expect(numberInput).toHaveValue(null);
        expect(positionSelect).toHaveValue('');
        expect(slotSelect).toHaveValue('');
    });

    it('validates number input is a valid number', () => {
        renderComponent('NFL', mockOnAddPlayer);

        // Fill in name and position
        fireEvent.change(screen.getByLabelText('Player Name'), {
            target: { value: 'John Doe' }
        });
        fireEvent.change(screen.getByLabelText('Position'), {
            target: { value: 'QB' }
        });

        // Try invalid number
        fireEvent.change(screen.getByLabelText('Number'), {
            target: { value: 'abc' }
        });
        expect(screen.getByText('Add Player')).toBeDisabled();

        // Try valid number
        fireEvent.change(screen.getByLabelText('Number'), {
            target: { value: '8' }
        });
        expect(screen.getByText('Add Player')).not.toBeDisabled();
    });
}); 