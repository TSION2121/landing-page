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
        // Add more colors as needed
    },
    // You can also add additional properties to the theme
});

export default theme;
