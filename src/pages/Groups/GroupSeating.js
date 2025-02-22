import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button, Pagination, Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';
import {CheckCircleOutline} from "@mui/icons-material";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import GroupDetailsDialog from "./GroupDetailsDialog";

export default function GroupSeating() {
    const [groups, setGroups] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;
    const [loading, setLoading] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
        setLoading(true);
        const year = selectedDate.getFullYear();
        // Fetch groups from the API based on the selected year
        axios.get(`http://localhost:3002/mockGroups?year=${year}`)
            .then(response => {
                // If the API call is successful, use the data from the API
                setGroups(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the groups!', error);
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
        <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    views={['year']}
                    label="Select Year"
                    value={selectedDate}
                    onChange={handleDateChange}
                    sx={{
                        width: { xs: '100%', sm: 'auto' },
                        '& .MuiSvgIcon-root': {
                            color: 'darkblue',
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            size="small"
                        />
                    )}
                />
                <Box sx={{ my: 1 }}></Box>
            </LocalizationProvider>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    Loading
                </Box>
            ) : currentGroups.length > 0 ? (
                <Grid container spacing={2} sx={{ '@media (max-width:600px)': { spacing: 1 }, height: '0vh' }}>
                    {currentGroups.map((group, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Paper elevation={3} sx={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                                        {group.projectTitle.substring(0, 20)}{group.projectTitle.length > 20 ? '...' : ''}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        {group.status === 'complete' ? (
                                            <CheckCircleOutline sx={{ color: 'green' }} />
                                        ) : (
                                            <NewReleasesIcon sx={{ color: 'grey' }} />
                                        )}
                                    </Box>
                                </Box>
                                <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <Box>
                                        <Typography variant="h6">
                                            {group.name}
                                        </Typography>
                                        <Typography variant="body1">
                                            {group.advisor}
                                        </Typography>
                                    </Box>
                                    <Button variant="outlined" sx={{ alignSelf: 'flex-end' }} onClick={() => setSelectedGroup(group)}>
                                        View Group
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                    {selectedGroup && (
                        <GroupDetailsDialog
                            group={selectedGroup}
                            open={Boolean(selectedGroup)}
                            onClose={() => setSelectedGroup(null)}
                        />
                    )}
                    <Pagination
                        count={Math.ceil(filteredGroups.length / itemsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        color="primary"
                        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                    />
                </Grid>
            ) : (
                <Typography variant="subtitle1" sx={{ textAlign: 'center', mt: 2 }}>
                    No data available.
                </Typography>
            )}
        </Box>
    );
}
