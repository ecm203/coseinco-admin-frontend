import React from 'react'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles'
import useSettings from 'app/hooks/useSettings'

const SidenavTheme = ({ children }) => {
    const theme = useTheme()
    const { settings } = useSettings()
    const sidenavTheme =
        settings.themes[settings.layout1Settings.leftSidebar.theme] || theme

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={sidenavTheme}>{children}</ThemeProvider>
        </StyledEngineProvider>
    );
}

export default SidenavTheme
