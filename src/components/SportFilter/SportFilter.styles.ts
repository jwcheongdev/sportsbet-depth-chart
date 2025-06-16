import styled from 'styled-components';

export const SportFilterContainer = styled.div`
    margin-top: ${props => props.theme.spacing.space.large};
    margin-bottom: ${props => props.theme.spacing.space.large};
    display: flex;
    justify-content: center;
    gap: ${props => props.theme.spacing.space.large};
    padding: 0 ${props => props.theme.spacing.space.large};
    flex-wrap: wrap;

    @media (max-width: ${props => props.theme.spacing.breakpoints.sm}) {
        gap: ${props => props.theme.spacing.space.small};
    }
`;

export const SportButton = styled.button<{ $isSelected: boolean }>`
    padding: ${props => props.theme.spacing.space.small} ${props => props.theme.spacing.space.large};
    background-color: ${props => props.$isSelected ? props.theme.colors.primary.main : props.theme.colors.background.paper};
    color: ${props => props.$isSelected ? props.theme.colors.primary.contrast : props.theme.colors.text.primary};
    border: none;
    border-radius: ${props => props.theme.spacing.borderRadius.medium};
    cursor: pointer;

    @media (max-width: ${props => props.theme.spacing.breakpoints.sm}) {
        padding: ${props => props.theme.spacing.space.small} ${props => props.theme.spacing.space.medium};
        font-size: ${props => props.theme.typography.fontSize.sm};
    }

    &:hover {
        opacity: 0.9;
    }
`;