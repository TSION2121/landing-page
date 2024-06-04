import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Select, MenuItem, FormControl, InputLabel, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Group', headerName: 'Group', width: 130 },
    { field: 'StudentID', headerName: 'Student ID', width: 130 },
    { field: 'Department', headerName: 'Department', width: 130 },
    { field: 'Total', headerName: 'Total', width: 90 },
    { field: 'eP-factor', headerName: 'eP-factor', width: 90 },
    { field: 'FinalMark', headerName: 'Final Mark', width: 90 },
    { field: 'Grade', headerName: 'Grade', width: 90 },
    { field: 'year', headerName: 'Year', width: 90 },
];

const Result = () => {
    const [data, setData] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedYear, setSelectedYear] = useState(new Date());
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Set to 5 rows per page

    useEffect(() => {
        axios.get('http://localhost:3002/Result')
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    const handleYearChange = (date) => {
        setSelectedYear(date);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getFilteredRows = () => {
        return data.filter(item =>
            (selectedDepartment === 'All' || item.Department === selectedDepartment) &&
            (!selectedYear || item.year === selectedYear.getFullYear().toString())
        );
    };

    const exportToCSV = (apiData, fileName) => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="department-select-label">Department</InputLabel>
                <Select
                    labelId="department-select-label"
                    id="department-select"
                    value={selectedDepartment}
                    label="Department"
                    onChange={handleDepartmentChange}
                >
                    <MenuItem value="All">All Departments</MenuItem>
                    <MenuItem value="Architecture">Architecture</MenuItem>
                    <MenuItem value="Chemical">Chemical</MenuItem>
                    <MenuItem value="Civil">Civil</MenuItem>
                    <MenuItem value="Electromechanical">Electromechanical</MenuItem>
                    <MenuItem value="Electrical">Electrical</MenuItem>
                    <MenuItem value="Environmental">Environmental</MenuItem>
                    <MenuItem value="Mechanical">Mechanical</MenuItem>
                    <MenuItem value="Software">Software</MenuItem>                </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    views={['year']}
                    label="Year"
                    value={selectedYear}
                    onChange={handleYearChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Button
                variant="contained"
                color="primary"
                onClick={() => exportToCSV(getFilteredRows(), 'result_data')}
                sx={{ mb: 2 }}
            >
                Download Results
            </Button>
            <Paper sx={{ width: '100%', mb: 2, maxHeight: '60vh' }}>
                <TableContainer style={{ maxHeight: '60vh' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                        key={column.field}
                                        align={column.align}
                                        style={{ minWidth: column.width }}
                                    >
                                        {column.headerName}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getFilteredRows().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map(column => (
                                        <TableCell key={column.field} align={column.align}>
                                            {row[column.field]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={getFilteredRows().length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default Result;
