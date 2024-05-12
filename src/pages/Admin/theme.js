import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        tertiary: {
            main: '#ffcc00', // Example color
        },
        quaternary: {
            main: '#ff5722', // Example color
        },
        warning: {
            main: '#ff9800', // This should be the main color for warning
            '300': '#ff9800', // You can keep this if you need specific shades
        },
        // Add more colors as needed
    },
    // You can also add additional properties to the theme
});

export default theme;
