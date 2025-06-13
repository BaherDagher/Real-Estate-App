import React, { createContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from '../../theme';

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const stored = localStorage.getItem('darkMode');
        return stored === 'true';
    });

    useEffect(() => {
        localStorage.setItem('darkMode', isDarkMode);
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;