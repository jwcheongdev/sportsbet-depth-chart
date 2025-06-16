import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import type { ReactNode } from 'react';

type TestWrapperProps = {
  children: ReactNode;
};

export function TestWrapper({ children }: TestWrapperProps) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
} 