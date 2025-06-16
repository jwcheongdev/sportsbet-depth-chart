import 'styled-components';
import { Theme } from './index';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: Theme['colors'];
        typography: Theme['typography'];
        spacing: Theme['spacing'];
    }
} 