import React, { useState, useEffect } from 'react';
import {Select, MenuItem, FormControl, InputLabel, Button, IconButton} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CalendarView() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [roleFilter, setRoleFilter] = useState('');
    const [dateFilter, setDateFilter] = useState(new Date());
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch events from your API
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:3001/events');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        // Filter events by role and date
        const filtered = events.filter(event => {
            const roleMatch = roleFilter ? event.role.toLowerCase() === roleFilter.toLowerCase() : true;
            const dateMatch = dateFilter ? new Date(event.date).toDateString() === dateFilter.toDateString() : true;
            return roleMatch && dateMatch;
        });
        setFilteredEvents(filtered);
    }, [roleFilter, dateFilter, events]);

    const handleRoleChange = (event) => {
        setRoleFilter(event.target.value);
    };

    const handleDateChange = (newValue) => {
        setDateFilter(newValue);

    };
    const reset = (newValue) => {
        setDateFilter(new Date());
        setRoleFilter('');

    };
    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>

            <h1>View Calendar Events</h1>
            <Button variant="contained" onClick={reset} size="small">
                Clear Filters
            </Button> <Box sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Stack on small screens, row on others
                justifyContent: "left",
                alignItems: "center", // Align items vertically
                flexWrap: "wrap",
                gap: 2, // Spacing between items
            }}>
                <FormControl sx={{ width: { xs: '100%', sm: '30%' } }} margin="normal" size="small">
                    <InputLabel id="role-filter-label">Filter by Role</InputLabel>
                    <Select
                        labelId="role-filter-label"
                        id="role-filter"
                        value={roleFilter}
                        label="Filter by Role"
                        onChange={handleRoleChange}
                        size="small"
                    >
                        <MenuItem value="coordinator">Coordinator</MenuItem>
                        <MenuItem value="Advisor">Advisor</MenuItem>
                        <MenuItem value="All">All</MenuItem>
                    </Select>
                </FormControl>
                <Box sx={{ width: { xs: '100%', sm: '30%' } }}>
                    <DesktopDatePicker
                        label="Filter by Date"
                        inputFormat="MM/dd/yyyy"
                        value={dateFilter}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} size="small" />}
                    />
                </Box>

            </Box>
            <div>
                {filteredEvents.length > 0 ? (
                    <ul>
                        {filteredEvents.map((event, index) => (
                            <li key={index}>
                                {event.date} - {event.milestone} - {event.role}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <Typography variant="subtitle1" sx={{ textAlign: 'center', mt: 2, width: '100%' }}>
                        No events found for the selected filters.
                    </Typography>                )}
            </div>
        </LocalizationProvider>
    );
}
