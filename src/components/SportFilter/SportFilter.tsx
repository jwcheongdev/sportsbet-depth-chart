import React, { useCallback, memo } from 'react';
import { Sport, AVAILABLE_SPORTS } from '../../types/depthChart';
import { SportFilterContainer, SportButton } from './SportFilter.styles';

interface SportFilterProps {
    selectedSport: Sport | undefined;
    onSportSelect: (sport: Sport) => void;
}

export const SportFilter: React.FC<SportFilterProps> = memo(({ selectedSport, onSportSelect }) => {
    const handleSportSelect = useCallback((sport: Sport) => {
        onSportSelect(sport);
    }, [onSportSelect]);

    return (
        <SportFilterContainer>
            {AVAILABLE_SPORTS.map((sport) => (
                <SportButton 
                    key={sport}
                    onClick={() => handleSportSelect(sport)}
                    $isSelected={selectedSport === sport}
                >
                    {sport}
                </SportButton>
            ))}
        </SportFilterContainer>
    );
}); 