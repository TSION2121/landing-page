import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Group', headerName: 'Group', width: 130 },
    { field: 'StudentID', headerName: 'Student ID', width: 130 },
    { field: 'Department', headerName: 'Department', width: 130 },
    { field: 'Total', headerName: 'Total', width: 90 },
    { field: 'eP-factor', headerName: 'eP-factor', width: 90 },
    { field: 'FinalMark', headerName: 'Final Mark', width: 90 },
    { field: 'Grade', headerName: 'Grade', width: 90 },
];

const Result = () => {
    const [data, setData] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('All');

    useEffect(() => {
        // Fetch data from the JSON Server API
        axios.get('http://localhost:3000/Result')
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    const getFilteredRows = () => {
        return selectedDepartment === 'All' ? data : data.filter(item => item.Department === selectedDepartment);
    };

    return (
        <Box sx={{ height: 400, width: '100%' }}>
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
                    <MenuItem value="Software">Software</MenuItem>
                </Select>
            </FormControl>
            <DataGrid
                rows={getFilteredRows()}
                columns={columns}
                components={{
                    Toolbar: GridToolbar,
                }}
                disableSelectionOnClick
            />
        </Box>
    );
};

export default Result;
