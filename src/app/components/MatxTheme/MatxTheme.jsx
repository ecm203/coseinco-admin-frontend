import React from 'react'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import MatxCssVars from './MatxCssVars'
import useSettings from 'app/hooks/useSettings'

// import cssVars from "css-vars-ponyfill";

const MatxTheme = ({ children }) => {
    const { settings } = useSettings()
    let activeTheme = { ...settings.themes[settings.activeTheme] }
    // console.log(activeTheme)
    // cssVars();
    // activeTheme.direction = settings.direction;
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={activeTheme}>
                <CssBaseline />
                <MatxCssVars> {children} </MatxCssVars>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default MatxTheme
