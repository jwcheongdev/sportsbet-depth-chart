import styled from 'styled-components';

export const AddPlayerContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.space.large};
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.space.xlarge};
  flex-wrap: wrap;
  padding: 0 ${props => props.theme.spacing.space.large};

  @media (max-width: ${props => props.theme.spacing.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${props => props.theme.spacing.space.small};
  }
`;

export const TextInput = styled.input`
  padding: ${props => props.theme.spacing.space.small} ${props => props.theme.spacing.space.medium};
  border: 1px solid ${props => props.theme.colors.neutral.gray300};
  border-radius: ${props => props.theme.spacing.borderRadius.medium};
  background-color: ${props => props.theme.colors.background.paper};
  color: ${props => props.theme.colors.text.primary};
  flex: 2;
  min-width: 180px;

  @media (max-width: ${props => props.theme.spacing.breakpoints.md}) {
    width: 100%;
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.hint};
  }
`;

export const NumberInput = styled.input`
  padding: ${props => props.theme.spacing.space.small} ${props => props.theme.spacing.space.medium};
  border: 1px solid ${props => props.theme.colors.neutral.gray300};
  border-radius: ${props => props.theme.spacing.borderRadius.medium};
  background-color: ${props => props.theme.colors.background.paper};
  color: ${props => props.theme.colors.text.primary};
  flex: 2;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;

   @media (min-width: ${props => props.theme.spacing.breakpoints.md}) {
    max-width: 80px;
  }

  @media (max-width: ${props => props.theme.spacing.breakpoints.md}) {
    width: 100%;
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.hint};
  }
`;

export const SelectInput = styled.select`
  padding: ${props => props.theme.spacing.space.small} ${props => props.theme.spacing.space.medium};
  border-radius: ${props => props.theme.spacing.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.neutral.gray300};
  background-color: ${props => props.theme.colors.background.paper};
  color: ${props => props.theme.colors.text.primary};
  flex: 1;
  min-width: 140px;

  @media (max-width: ${props => props.theme.spacing.breakpoints.md}) {
    width: 100%;
  }
`;

export const AddButton = styled.button`
  background-color: ${props => props.theme.colors.secondary.main};
  color: ${props => props.theme.colors.primary.contrast};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  padding: ${props => props.theme.spacing.space.small} ${props => props.theme.spacing.space.large};
  border: none;
  border-radius: ${props => props.theme.spacing.borderRadius.medium};
  cursor: pointer;
  white-space: nowrap;
  height: 42px;

  @media (max-width: ${props => props.theme.spacing.breakpoints.md}) {
    width: 100%;
  }

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const RequiredTextParagraph = styled.p`
  width: 100%;
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
  text-align: left;
  margin-top: 0;
`;