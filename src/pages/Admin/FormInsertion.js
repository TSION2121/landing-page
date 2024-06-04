import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Paper,
    FormHelperText
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useLocation } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';

const DynamicForm = () => {
    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        if (state && state.role) {
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
        date: null,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleDateChange = (newValue) => {
        setFormData({ ...formData, date: newValue });
        setErrors({ ...errors, date: '' });
    };

    const validateFields = () => {
        let tempErrors = {};
        let isValid = true;

        // Fields that are always required
        const alwaysRequiredFields = ['firstName', 'lastName', 'email','date'];

        // Validate always required fields
        alwaysRequiredFields.forEach(field => {
            if (!formData[field]) {
                tempErrors[field] = 'This field is required';
                isValid = false;
            }
        });

        // Validate fields based on the role
        if (formData.role === 'Add Students') {
            const studentFields = ['studentId', 'fieldOfEngineering', 'cgpa', 'gender'];
            studentFields.forEach(field => {
                if (!formData[field]) {
                    tempErrors[field] = 'This field is required';
                    isValid = false;
                }
            });
            if (!formData.date) {
                tempErrors.date = 'This field is required';
                isValid = false;
            }
        } else if (['Add Teachers', 'Add Coordinators'].includes(formData.role)) {
            const staffFields = ['teacherId'];
            staffFields.forEach(field => {
                if (!formData[field]) {
                    tempErrors[field] = 'This field is required';
                    isValid = false;
                }
            });
            // For date, check if it's not null
            if (!formData.date) {
                tempErrors.date = 'This field is required';
                isValid = false;
            }
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/formData', formData);
            console.log('Form submitted successfully:', response.data);

            // Reset the form but keep the role
            setFormData(prevFormData => ({
                ...prevFormData,
                studentId: '',
                teacherId: '',
                firstName: '',
                lastName: '',
                email: '',
                fieldOfEngineering: '',
                cgpa: '',
                gender: '',
                date: null,
            }));

            // Clear any errors except for the role
            setErrors(prevErrors => ({
                ...prevErrors,
                studentId: '',
                teacherId: '',
                firstName: '',
                lastName: '',
                email: '',
                fieldOfEngineering: '',
                cgpa: '',
                gender: '',
                date: '',
            }));

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box bgcolor={"cornflowerblue"}>
                <Typography color={"white"} variant="h5" sx={{ textAlign: 'center' }}>
                    {formData.role}
                </Typography>
            </Box>
            <Paper sx={{
                mt: 1,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                gap: 2,
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: 'lavender',
                border: '2px solid #888',
                margin: '10px',
                width: 'calc(100% - 20px)',
                boxSizing: 'border-box',
                '& .MuiTextField-root': { m: 1 },
            }} component="form" onSubmit={handleSubmit} noValidate>

                <TextField
                    required
                    name="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName || ''}
                />
                <TextField
                    required
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName || ''}
                />
                <TextField
                    required
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email || ''}
                />

                <FormControl margin="normal" error={Boolean(errors.role)}>
                    <InputLabel id="role-select-label">Role</InputLabel>
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
                        <MenuItem value={'Add Teachers'}>Teacher</MenuItem>
                    </Select>

                    {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                </FormControl>
                <DatePicker
                    label="Select Date"
                    value={formData.date}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={Boolean(errors.date)}
                            helperText={errors.date || ''}
                        />
                    )}
                />
                {formData.role === 'Add Students' && (
                    <>

                        <TextField
                            required
                            size="small"
                            name="studentId"
                            label="Student ID"
                            value={formData.studentId}
                            onChange={handleChange}
                            error={Boolean(errors.studentId)}
                            helperText={errors.studentId || ''}
                        />
                        <TextField
                            required
                            size="small"
                            name="fieldOfEngineering"
                            label="Field of Engineering"
                            value={formData.fieldOfEngineering}
                            onChange={handleChange}
                            error={Boolean(errors.fieldOfEngineering)}
                            helperText={errors.fieldOfEngineering || ''}
                        />
                        <TextField
                            required
                            size="small"
                            name="cgpa"
                            label="CGPA"
                            value={formData.cgpa}
                            onChange={handleChange}
                            error={Boolean(errors.cgpa)}
                            helperText={errors.cgpa || ''}
                        />
                        <FormControl margin="normal" error={Boolean(errors.gender)}>
                            <InputLabel id="gender-select-label">Gender</InputLabel>
                            <Select
                                labelId="gender-select-label"
                                id="gender-select"
                                name="gender"
                                value={formData.gender}
                                label="Gender"
                                onChange={handleChange}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </Select>
                            {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                        </FormControl>

                    </>
                )}
                {['Add Teachers', 'Add Coordinators'].includes(formData.role) && (
                    <>
                        <TextField
                            required
                            size="small"
                            name="teacherId"
                            label="Teacher ID"
                            value={formData.teacherId}
                            onChange={handleChange}
                            error={Boolean(errors.teacherId)}
                            helperText={errors.teacherId || ''}
                        />

                    </>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 3,
                        mb: 2,
                        gridColumn: "1 / -1",
                        width: "100%",
                        maxWidth: "300px",
                        alignSelf: "center",
                        justifySelf: "center"
                    }}
                >
                    Submit
                </Button>
            </Paper>
        </LocalizationProvider>
    );
};

export default DynamicForm;
