import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button, Pagination, Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

// Mock data for testing
const mockGroups = [
    { projectTitle:"smart home", status:"incomplete", name: 'Group 1', advisor: 'Advisor A', year: 2023 },
    { projectTitle:"", status:"incomplete", name: 'Group 2', advisor: 'Advisor B', year: 2023 },
    { projectTitle:"", status:"incomplete", name: 'Group 3', advisor: 'Advisor A', year: 2023 },
    { projectTitle:"", status:"incomplete", name: 'Group 4', advisor: 'Advisor B', year: 2023 },
    { projectTitle:"", status:"incomplete", name: 'Group 1', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 2', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 3', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 4', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 5', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 6', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 1', advisor: 'Advisor A', year: 2023 },
    { projectTitle:"", status:"incomplete", name: 'Group 2', advisor: 'Advisor B', year: 2023 },
    { projectTitle:"", status:"incomplete", name: 'Group 3', advisor: 'Advisor A', year: 2023 },
    { projectTitle:"", status:"incomplete", name: 'Group 4', advisor: 'Advisor B', year: 2023 },
    { projectTitle:"", status:"incomplete", name: 'Group 1', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 2', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 3', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 4', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 5', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 6', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 1', advisor: 'Advisor A', year: 2023 },
    { projectTitle:"", status:"incomplete", name: 'Group 2', advisor: 'Advisor B', year: 2023 },
    { projectTitle:"", status:"incomplete", name: 'Group 3', advisor: 'Advisor A', year: 2023 },
    { projectTitle:"", status:"incomplete", name: 'Group 4', advisor: 'Advisor B', year: 2023 },
    { projectTitle:"", status:"incomplete", name: 'Group 1', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 2', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 3', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 4', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 5', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 6', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 1', advisor: 'Advisor A', year: 2023 },
    { projectTitle:"", status:"incomplete", name: 'Group 2', advisor: 'Advisor B', year: 2023 },
    { projectTitle:"", status:"incomplete", name: 'Group 3', advisor: 'Advisor A', year: 2023 },
    { projectTitle:"", status:"incomplete", name: 'Group 4', advisor: 'Advisor B', year: 2023 },
    { projectTitle:"", status:"incomplete", name: 'Group 1', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 2', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 3', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 4', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 5', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"", status:"incomplete", name: 'Group 6', advisor: 'Advisor B', year: 2024 }];

export default function GroupSeating() {
    const [groups, setGroups] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const year = selectedDate.getFullYear();
        // Fetch groups from the API based on the selected year
        // Replace with your actual API endpoint
        axios.get(`https://your-api.com/groups?year=${year}`)
            .then(response => {
                // If the API call is successful, use the data from the API
                setGroups(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the groups!', error);
                // Fallback to mock data if API call fails
                const filteredMockData = mockGroups.filter(group => group.year === year);
                setGroups(filteredMockData);
                setLoading(false);
            });
    }, [selectedDate]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setPage(1); // Reset to first page when date changes
    };

    // Filter groups based on the selected year
    const filteredGroups = groups.filter(group => group.year === selectedDate.getFullYear());

    // Calculate the current groups to display on the page
    const currentGroups = filteredGroups.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <Box sx={{ width: '100%' }}>
            <LocalizationProvider  dateAdapter={AdapterDateFns}>
                <DatePicker
                    sx={{color:'goldenrod',  margin: " 5px 0"}}
                    views={['year']}
                    label="Select Year"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField                     sx={{color:'goldenrod', bgcolor: '#00ff00', margin: " 15px 0"}}
                                                                            {...params} />}
                />
            </LocalizationProvider>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <Grid container spacing={2}>
                    {currentGroups.map((group, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} >
                            <Paper elevation={3} sx={{ backgroundColor: 'gray', color:'goldenrod',padding: 2}}>
                                <Typography variant="h6">{group.name}</Typography>
                                <Typography variant="subtitle1">{group.advisor}</Typography>
                                {group.projectTitle &&
                                <Typography variant="subtitle1">{group.projectTitle}</Typography>}
                                <Typography variant="status">{group.status}</Typography>

                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
            <Pagination
                count={Math.ceil(filteredGroups.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
                color="primary"
                sx={{ marginTop: 2 }}
            />
        </Box>
    );
}
