import React from 'react';
import { ClearButton } from './ClearButton.styles';

interface ClearChartButtonProps {
    onClearChart: () => void;
}

export const ClearChartButton: React.FC<ClearChartButtonProps> = ({ onClearChart }) => {
    return (
        <ClearButton onClick={onClearChart}>Clear all</ClearButton>
    );
};
