// src/components/MainPage.js
import React, { useState, useEffect } from 'react';
import ToggleView from './ToggleView';
import DataTable from './DataTable';
import DataChart from './DataChart';
import {Paper, Typography, Box, Select, MenuItem, Button} from '@mui/material';
import {Route, Routes} from "react-router-dom";
import UsersPage from "./UsersPage";

const MainPage = () => {
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
        <Paper elevation={3} style={{ padding: '24px', margin: '24px', borderRadius: '15px' }}>
            <Button href='users'>See Users Details</Button>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h4" component="h2" gutterBottom>
                    Data Analysis
                </Typography>
                <Select value={parameter} onChange={(e) => setParameter(e.target.value)}>
                    <MenuItem value="cgpa">CGPA</MenuItem>
                    <MenuItem value="department">Department</MenuItem>
                    <MenuItem value="gender">Gender</MenuItem>
                </Select>
                <ToggleView view={view} setView={setView} />
                {view === 'table' ? <DataTable data={data} parameter={parameter} /> : <DataChart data={data} parameter={parameter} />}
            </Box>
            <Routes>
                <Route path='/users' element={<UsersPage />}/>
            </Routes>
        </Paper>
    );
};

export default MainPage;
