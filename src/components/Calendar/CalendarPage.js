import * as React from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {Button, IconButton, Typography} from '@mui/material';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Box from "@mui/system/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";


export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [role, setRole] = React.useState('');
    const [milestone, setMilestone] = React.useState('');
    const navigate = useNavigate();


    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleMilestoneChange = (event) => {
        setMilestone(event.target.value);
    };

    const handleSubmit = async () => {
        const formattedDate = selectedDate.toISOString().split('T')[0];

        const data = {
            date: formattedDate,
            role: role,
            milestone: milestone
        };

        try {
            const response = await fetch('http://localhost:3001/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);
            // Handle success here, such as displaying a success message or clearing the form
        } catch (error) {
            console.error('Error:', error);
            // Handle errors here, such as displaying an error message
        }
    };
    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ border: 1, borderColor: 'grey.300', borderRadius: 2, p: 2, m: 2 }}>
                <IconButton onClick={handleBack} sx={{ color: 'white' }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" gutterBottom>
                    Add Calendar for Roles with Milestones
                </Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" }, // Stack on small screens, row on others
                    justifyContent: "left",
                    alignItems: "center", // Align items vertically
                    flexWrap: "wrap",
                    gap: 2, // Spacing between items
                }}>
                <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} size="small" />}
                />
                <FormControl sx={{ width: { xs: '100%', sm: '30%' } }} margin="normal" size="small">
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                        labelId="role-select-label"
                        id="role-select"
                        value={role}
                        label="Role"
                        onChange={handleRoleChange}
                    >
                        <MenuItem value="coordinator">Coordinator</MenuItem>
                        <MenuItem value="advisor">Advisor</MenuItem>
                        <MenuItem value="all">All</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                <TextField
                    label="Milestone"
                    value={milestone}
                    onChange={handleMilestoneChange}
                    margin="normal"
                    fullWidth
                    size="small"
                />
                <Button variant="contained" onClick={handleSubmit} size="small">
                    Submit
                </Button>
            </Box>
        </LocalizationProvider>    );
}
