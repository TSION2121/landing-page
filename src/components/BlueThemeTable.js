import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // This is a blue shade from the Material-UI color palette
        },
        // You can also define other theme properties here
    },
});

function BlueThemeTable() {
    return (
        <ThemeProvider theme={theme}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/*<TableCell>Column 1</TableCell>*/}
                            {/*<TableCell align="right">Column 2</TableCell>*/}
                            {/*<TableCell align="right">Column 3</TableCell>*/}
                            {/*<TableCell align="right">Column 4</TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Insert TableRows and TableCells here */}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    );
}

export default BlueThemeTable;