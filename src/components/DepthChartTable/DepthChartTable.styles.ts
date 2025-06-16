import styled from 'styled-components';

export const Table = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: ${props => props.theme.spacing.space.small};
    color: ${props => props.theme.colors.text.primary};

    @media (max-width: ${props => props.theme.spacing.breakpoints.md}) {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
    }
`;


export const HeaderCell = styled.th`
    border: 1px solid ${props => props.theme.colors.neutral.gray300};
    padding: ${props => props.theme.spacing.space.large};
    text-align: center;
    min-width: 120px;
    background-color: transparent;
    font-weight: ${props => props.theme.typography.fontWeight.bold};

    @media (max-width: ${props => props.theme.spacing.breakpoints.sm}) {
        padding: ${props => props.theme.spacing.space.small};
        min-width: 100px;
    }
`;

export const PlayerSpan = styled.span`
    display: block;
    text-align: left;
    padding-right: ${props => props.theme.spacing.space.small};
`

export const Cell = styled.td`
    padding: ${props => props.theme.spacing.space.large};
    border-bottom: 1px solid ${props => props.theme.colors.neutral.gray300};
    min-width: 120px;
    position: relative;
    background-color: transparent;

    @media (max-width: ${props => props.theme.spacing.breakpoints.sm}) {
        padding: ${props => props.theme.spacing.space.small};
        min-width: 100px;
    }

    &:hover {
        background-color: ${props => props.theme.colors.background.paper};
        opacity: 0.8;
    }
`;

export const RemoveButton = styled.button`
    position: absolute;
    top: ${props => props.theme.spacing.space.tiny};
    right: ${props => props.theme.spacing.space.tiny};
    padding: ${props => props.theme.spacing.space.tiny} ${props => props.theme.spacing.space.tiny};
    font-size: ${props => props.theme.typography.fontSize.xs};
    cursor: pointer;
    background: none;
    border-radius: ${props => props.theme.spacing.borderRadius.small};
    color: ${props => props.theme.colors.semantic.error};
    border: none;

    &:hover {
        background-color: ${props => props.theme.colors.background.paper};
    }
`;