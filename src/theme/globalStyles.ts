import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    html, body, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        overflow-x: hidden;
        box-sizing: border-box;
    }

    #root {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    body {
        min-height: 100vh;
        background-color: ${props => props.theme.colors.background.default};
        color: ${props => props.theme.colors.text.primary};
        font-family: ${props => props.theme.typography.fontFamily.primary};
        line-height: ${props => props.theme.typography.lineHeight.normal};
    }

    *, *::before, *::after {
        box-sizing: inherit;
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
        font-weight: ${props => props.theme.typography.fontWeight.bold};
    }

    button {
        font-family: ${props => props.theme.typography.fontFamily.primary};
    }

    input, select {
        font-family: ${props => props.theme.typography.fontFamily.primary};
    }
`; 