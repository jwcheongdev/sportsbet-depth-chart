import React, { useState, useCallback, memo } from 'react';
import { Sport, Player, POSITIONS, SLOT_LABELS, SlotLabel, SlotIndex } from "../../types/depthChart";
import { AddPlayerContainer, TextInput, NumberInput, SelectInput, AddButton, RequiredTextParagraph } from './AddPlayer.styles';

interface AddPlayerProps {
    sport: Sport;
    onAddPlayer: (player: Player, position: string, slotIndex?: number) => void;
}

export const AddPlayer: React.FC<AddPlayerProps> = memo(({ sport, onAddPlayer }) => {
    const [name, setName] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [position, setPosition] = useState<string | undefined>(undefined);
    const [slot, setSlot] = useState<SlotLabel | undefined>(undefined);

    const hasValidName = name.trim() !== '';
    const hasValidPosition = position !== undefined;
    const hasValidNumber = number !== '' && !isNaN(Number(number));
    
    const isFormValid = hasValidName && hasValidPosition && hasValidNumber;

    const handleAddButton = useCallback(() => {
        if (!isFormValid) return;
        const player: Player = {
            name: name.trim(),
            number: Number(number)
        };
        onAddPlayer(player, position, slot ? SlotIndex[slot] : undefined);
        // Reset form after adding a player
        setName('');
        setNumber('');
        setPosition(undefined);
        setSlot(undefined);
    }, [isFormValid, name, number, position, slot, onAddPlayer]);

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Only allow letters, spaces, hyphens, apostrophes, and periods
        if (value === '' || /^[a-zA-Z\s\-'.]+$/.test(value)) {
            setName(value);
        }
    }, []);

    const handleNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numValue = Number(value);
        // only allow numbers between 0-99
        if (value === '' || (numValue >= 0 && numValue <= 99)) {
            setNumber(value);
        }
    }, []);

    const handlePositionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setPosition(e.target.value || undefined);
    }, []);

    const handleSlotChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setSlot(e.target.value as SlotLabel || undefined);
    }, []);

    return (
        <AddPlayerContainer>
            <TextInput
                type="text"
                placeholder="Player Name *"
                value={name}
                onChange={handleNameChange}
                required
                aria-label="Player Name"
            />
            <NumberInput
                type="number"
                min="0"
                max="99"
                placeholder="No. *"
                value={number}
                onChange={handleNumberChange}
                required
                aria-label="Number"
            />
            <SelectInput
                value={position || ''}
                onChange={handlePositionChange}
                required
                aria-label="Position"
            >
                <option value="" disabled hidden>Position *</option>
                {POSITIONS[sport].map((pos) => (
                    <option key={pos} value={pos}>{pos}</option>
                ))}
            </SelectInput>
            <SelectInput
                value={slot || ''}
                onChange={handleSlotChange}
                aria-label="Slot"
            >
                <option value="" disabled hidden>Slot (Optional)</option>
                {SLOT_LABELS.map((label) => (
                    <option key={label} value={label}>{label}</option>
                ))}
            </SelectInput>
            <AddButton 
                onClick={handleAddButton}
                disabled={!isFormValid}
            >
                Add Player
            </AddButton>
            <RequiredTextParagraph>Fields with * are required</RequiredTextParagraph>
        </AddPlayerContainer>
    );
});