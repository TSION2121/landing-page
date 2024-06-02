import React, {useEffect, useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {useLocation, useNavigate} from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Paper from "@mui/material/Paper";


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
            <Box bgcolor={"cornflowerblue"}>
                <Typography color={"white"} variant="h5" sx={{textAlign:'center'}}>{formData.role}</Typography>
            </Box>
            <Paper sx={{mt: 1,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Stack on small screens, row on others
                justifyContent: "space-around",
                alignContent:"center",
                // alignItems: "center", // Align items vertically
                flexWrap: "wrap",
                gap: 4, // Spacing between items
                padding:"10px 10px 0 10px"



            }} component="form" onSubmit={handleSubmit} noValidate >


                {/* Common fields */}
                <TextField name="firstName" label="First Name" value={formData.firstName} onChange={handleChange}  />
                <TextField name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange}  />
                <TextField name="email" label="Email" value={formData.email} onChange={handleChange}  />
                <FormControl  margin="normal">
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
                {/* Fields for Students */}
                {formData.role === 'Add Students' && (
                    <>
                        <TextField
                                                size="small"
name="studentId" label="Student ID" value={formData.studentId} onChange={handleChange}  />
                        <TextField
                                                size="small"
name="fieldOfEngineering" label="Field of Engineering" value={formData.fieldOfEngineering} onChange={handleChange}  />
                        <TextField
                                                size="small"
name="cgpa" label="CGPA" value={formData.cgpa} onChange={handleChange}  />

                        <FormControl  margin="normal" sx={{width:"200px"}} >
                            <InputLabel id="gender-select-label">Gender</InputLabel>
                                <Select
                                labelId="gender-select-label"
                                id="gender-select"
                                name="gender"
                                value={formData.gender}
                                label="Gender"
                                onChange={handleChange}>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </Select>

                        </FormControl>
                    </>
                )}

                {/* Fields for Teachers and Coordinators */}
                {['Add Teachers', 'Add Coordinators'].includes(formData.role) && (
                    <>
                        <TextField
                                                size="small"
name="teacherId" label="Teacher ID" value={formData.teacherId} onChange={handleChange}  />
                        <DatePicker
                            label="Select Date"
                            value={formData.date}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField
                                                    size="small"
{...params}  />}
                        />
                    </>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3, mb: 2 , width:"20%" }}>
                    Submit
                </Button>
            </Paper>
        </LocalizationProvider>
    );
};



export default  DynamicForm;
