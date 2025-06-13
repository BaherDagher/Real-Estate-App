import { createTheme } from '@mui/material/styles';

export const primaryColor = '#6c5ce7';
export const hoverColor = '#5948c2';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: primaryColor,
            dark: hoverColor,
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
        text: {
            primary: '#000000',
            secondary: '#555555',
        },
        myButton: {
            main: primaryColor,
            dark: hoverColor,
        }
    }
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: primaryColor,
            dark: hoverColor,
        },
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
        text: {
            primary: '#ffffff',
            secondary: '#bbbbbb',
        },
    },
});