import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const theme = {
    colors,
    typography,
    spacing,
} as const;

export type Theme = typeof theme;

export default theme; 