import styled from 'styled-components';

export const ClearButton = styled.button`
  background-color: ${props => props.theme.colors.semantic.error};
  color: ${props => props.theme.colors.primary.contrast};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-top: ${props => props.theme.spacing.space.medium};
  margin-bottom: ${props => props.theme.spacing.space.large};
  padding: ${props => props.theme.spacing.space.small} ${props => props.theme.spacing.space.large};
  border: none;
  border-radius: ${props => props.theme.spacing.borderRadius.medium};
  cursor: pointer;
  height: 42px;
  width: 100%;
`;
