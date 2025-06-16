export const spacing = {
    // Spacing units (in rem)
    space: {
        none: '0',
        tiny: '0.25rem',    // 4px
        small: '0.5rem',    // 8px
        medium: '0.75rem',  // 12px
        large: '1rem',      // 16px
        xlarge: '2rem',     // 32px
        xxlarge: '4rem',    // 64px
        xxxlarge: '8rem'    // 128px
    },
    
    breakpoints: {
        sm: '640px',  // Mobile breakpoint
        md: '768px'   // Tablet breakpoint
    },
    
    // Border radius
    borderRadius: {
        none: '0',
        small: '0.125rem',  // 2px
        medium: '0.25rem'   // 4px
    },

} as const; 