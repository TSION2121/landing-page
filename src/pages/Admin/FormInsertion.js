import React, {useEffect, useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {useLocation, useNavigate} from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const DynamicForm = () => {
    const location = useLocation(); // Hook to access the navigation state
    const { state } = location; // Destructure to get the state object


    useEffect(() => {
        console.log(state); // Check what's inside the state
        if (state && state.role) {
            // You should spread the state object into setFormData
            setFormData({ ...formData, role: state.role });
        }
    }, [state]);


    const [formData, setFormData] = useState({
        role: '',
        studentId: '',
        teacherId: '',
        firstName: '',
        lastName: '',
        email: '',
        fieldOfEngineering: '',
        cgpa: '',
        gender: '',
        date: null, // For the calendar
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (newValue) => {
        setFormData({ ...formData, date: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form data:', formData);
        // Submit logic here
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Typography>{formData.role} </Typography>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="role-select-label">Role</InputLabel>
                    {formData.role &&
                        <Select
                        labelId="role-select-label"
                        id="role-select"
                        name="role"
                        value={formData.role}
                        label="Role"
                        onChange={handleChange}
                    >
                            <MenuItem value={'Add Students'}>Student</MenuItem>
                            <MenuItem value={'Add Coordinators'}>Coordinator</MenuItem>
                            <MenuItem value={'Add Teachers'} >Teacher</MenuItem>
                    </Select>}
                </FormControl>

                {/* Common fields */}
                <TextField name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} fullWidth margin="normal" />
                <TextField name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} fullWidth margin="normal" />
                <TextField name="email" label="Email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />

                {/* Fields for Students */}
                {formData.role === 'Add Students' && (
                    <>
                        <TextField name="studentId" label="Student ID" value={formData.studentId} onChange={handleChange} fullWidth margin="normal" />
                        <TextField name="fieldOfEngineering" label="Field of Engineering" value={formData.fieldOfEngineering} onChange={handleChange} fullWidth margin="normal" />
                        <TextField name="cgpa" label="CGPA" value={formData.cgpa} onChange={handleChange} fullWidth margin="normal" />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select labelId="gender-label" name="gender" value={formData.gender} label="Gender" onChange={handleChange}>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}

                {/* Fields for Teachers and Coordinators */}
                {['Add Teachers', 'Add Coordinators'].includes(formData.role) && (
                    <>
                        <TextField name="teacherId" label="Teacher ID" value={formData.teacherId} onChange={handleChange} fullWidth margin="normal" />
                        <DatePicker
                            label="Select Date"
                            value={formData.date}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                        />
                    </>
                )}

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Submit
                </Button>
            </Box>
        </LocalizationProvider>
    );
};



export default  DynamicForm;
