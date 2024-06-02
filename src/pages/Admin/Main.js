// src/components/MainPage.js
import React, { useState, useEffect } from 'react';
import ToggleView from './ToggleView';
import DataTable from './DataTable';
import DataChart from './DataChart';
import {Paper, Typography, Box, Select, MenuItem, Button, useTheme, useMediaQuery} from '@mui/material';
import {Route, Routes} from "react-router-dom";
import UsersPage from "./UsersPage";
import Grid from "@mui/material/Grid";


const MainPage = () => {
    const theme = useTheme();
    const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmall = useMediaQuery(theme.breakpoints.up('sm'));
    const [view, setView] = useState('table');
    const [data, setData] = useState([]); // This should be set to the parsed data
    const [parameter, setParameter] = useState('cgpa'); // State to control the chart parameter

    // Mock data for testing
    const mockData = [
        { id: 1, name: 'John Doe', gender: 'Male', department: 'Engineering', cgpa: 3.5 },
        { id: 2, name: 'John Doe', gender: 'Male', department: 'Engineering', cgpa: 3.5 },
        { id: 3, name: 'John Doe', gender: 'Male', department: 'Engineering', cgpa: 3.5 },
        { id: 4, name: 'John Doe', gender: 'Male', department: 'Engineering', cgpa: 1.8 },
        { id: 5, name: 'John Doe', gender: 'Male', department: 'Engineering', cgpa: 3.5 },
        { id: 6, name: 'Jane Smith', gender: 'Female', department: 'Science', cgpa: 3.8 },
        { id: 2, name: 'John Doe', gender: 'Female', department: 'Engineering', cgpa: 2.5 },
        { id: 3, name: 'John Doe', gender: 'Female', department: 'Engineering', cgpa: 1.5 },
        { id: 4, name: 'John Doe', gender: 'Male', department: 'Engineering', cgpa: 2.5 },
        { id: 5, name: 'John Doe', gender: 'Female', department: 'Engineering', cgpa: 3.5 },
        { id: 6, name: 'Jane Smith', gender: 'Female', department: 'Science', cgpa: 1.89 },
    ];

    useEffect(() => {
        // Function to simulate file upload and parsing
        const handleFileUpload = () => {
            // In a real scenario, you would parse the Excel file here
            // For testing, we're using mock data
            setData(mockData);
        };


// Analysis functions
        const countGenders = (data) => {
            const males = data.filter((item) => item.gender === 'Male').length;
            const females = data.filter((item) => item.gender === 'Female').length;
            return { males, females };
        };

        const listDepartments = (data) => {
            const departments = [...new Set(data.map((item) => item.department))];
            return departments;
        };

        // Call the handleFileUpload function to load the mock data
        // In a real scenario, this would be triggered by a file input change event
        handleFileUpload();

        setData(mockData); // Set the data when the component mounts
    }, []); // The empty array ensures this effect runs only once


    return (
        <Paper elevation={3} sx={{ bgcolor: 'transparent', p: theme.spacing(2), m: 'auto' }}>
            <Box bgcolor={"cornflowerblue"} p={2} mb={2}>
                <Typography color={"white"} variant={isXSmall ? 'h6' : 'h5'} textAlign='center'>
                    Student Data Analysis
                </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: 'center', my: 2 }}>
                <Box sx={{
                    bgcolor: 'lightblue',
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    justifyContent: 'center',
                    p: 2,
                    mb: 2
                }}>
                    <Button sx={{ bgcolor: 'goldenrod', mr: 1 }} variant='contained' href='users'>See Users Details</Button>
                    <ToggleView view={view} setView={setView} />
                    <Select value={parameter} onChange={(e) => setParameter(e.target.value)} sx={{ ml: 1 }}>
                        <MenuItem value="cgpa">CGPA</MenuItem>
                        <MenuItem value="department">Department</MenuItem>
                        <MenuItem value="gender">Gender</MenuItem>
                    </Select>
                </Box>
            </Box>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    {view === 'table' ? <DataTable data={data} parameter={parameter} /> : <DataChart data={data} parameter={parameter} />}
                </Grid>
                {/* Add more Grid items here for additional charts or tables */}
            </Grid>
            <Routes>
                <Route path='/users' element={<UsersPage />} />
            </Routes>
        </Paper>
    );
};

export default MainPage;
