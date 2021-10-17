import React from 'react'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

const SecondarySidenavTheme = ({ theme, classes, children, open }) => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyledEngineProvider>
    );
}
export default SecondarySidenavTheme
