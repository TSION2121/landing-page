import React, {useEffect, useState} from 'react';
import * as XLSX from 'xlsx';
import API_ENDPOINTS from "../Api/API_ENDPOINTS";
import { Box, Container, Typography, Alert, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Paper from "@mui/material/Paper";

const FileUploadToApi = ({ setData }) => {
    const [message, setMessage] = useState('Please upload Excel files of the students, advisors, or coordinators.');
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [excelData, setExcelData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null); // New state for the selected file
    const [userRole, setUserRole] = useState('');
    const [isCoordinatorAdded, setIsCoordinatorAdded] = useState(false);
    const [academicYear, setAcademicYear] = useState('');
    const [searchYear, setSearchYear] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const location = useLocation(); // Hook to access the navigation state
    const { state } = location; // Destructure to get the state object

    // Determine the current academic year based on the current date
    useEffect(() => {
        console.log(state); // Check what's inside the state

        if (state && state.role) {
            setUserRole(state.role);
        }

        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        // If the current month is before September, subtract one year
        const calculatedAcademicYear = currentMonth < 8 ? currentYear  : currentYear;
        setAcademicYear(calculatedAcademicYear.toString());
        setSearchYear(calculatedAcademicYear);
    }, [state]);

    // Pagination handlers
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Handle user role change
    const handleUserRoleChange = (event) => {
        const selectedRole = event.target.value;
        setUserRole(selectedRole);

        // Enable Advisor option only if Coordinator is selected
        if (selectedRole === 'Coordinator') {
            setIsCoordinatorAdded(true);
        }
    };

    // Handle academic year change
    const handleAcademicYearChange = (event) => {
        setAcademicYear(event.target.value);
    };

    // Function to handle file upload and API call
    const handleFileUpload = async () => {
        if (selectedFile) {
            setMessage('Uploading file...');
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('academicYearId', academicYear);

                console.log(academicYear);
                let uploadUrl;
                switch (userRole) {
                    case 'Add Students':
                        uploadUrl = API_ENDPOINTS.UPLOAD_STUDENTS;
                        break;
                    case 'Add Teachers':
                        uploadUrl = API_ENDPOINTS.UPLOAD_TEACHERS;
                        break;
                    case 'Add Coordinators':
                        uploadUrl = API_ENDPOINTS.UPLOAD_COORDINATORS;
                        break;
                    default:
                        throw new Error('Invalid user role');
                }

                const response = await fetch(uploadUrl, {
                    method: 'POST',
                    body: formData,
                    // Add headers if needed, for example, authorization headers
                });

                if (response.ok) {
                    const result = await response.json();
                    setMessage('File uploaded and data processed successfully.');
                    setIsFileUploaded(true);
                    // Assuming the response contains the processed data
                    setExcelData(result.data);
                    setData(result.data); // Update parent component's state if needed
                    console.log(academicYear);

                } else {
                    setMessage('Failed to upload and process the file.');
                }
            } catch (error) {
                setMessage(`Error: ${error.message}`);
            }
        } else {
            setMessage('No file selected.');
        }
    };

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Reset states
        setMessage('');
        setIsFileUploaded(false);

        // Validate file extension
        if (file && !file.name.match(/.(xlsx|xls)$/i)) {
            setMessage('Please upload an Excel file.');
            return;
        }

        // Read and process the file locally before uploading
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
                // Set local state with the Excel data
                setExcelData(jsonData);
                // Store the file in the state
                setSelectedFile(file);
            } catch (error) {
                setMessage('Error reading the file.');
            }
        };
        reader.onerror = () => {
            setMessage('Error uploading the file.');
        };
        reader.readAsArrayBuffer(file);
    };

    // Filter data based on the academic year and user role
    const filteredData = excelData.filter((data) => {
        return userRole === 'Advisor' ? data.year === academicYear && data.isActive : data.year === academicYear;
    });

    return (
        <>
            <Box bgcolor={"cornflowerblue"}>
                <Typography color={"white"} variant="h5" sx={{textAlign:'center'}}> Please Upload an Excel file to register your users </Typography>
            </Box>
            <Paper sx={{
                padding: '12px',
                margin:'20px 0'}}>
                <Typography>
                    {userRole}
                </Typography>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="user-role-label">User Role</InputLabel>
                    {userRole &&
                        <Select
                            labelId="user-role-label"
                            id="user-role-select"
                            value={userRole}
                            label="User Role"
                            onChange={handleUserRoleChange}
                        >
                            <MenuItem value={'Add Students'}>Student</MenuItem>
                            <MenuItem value={'Add Coordinators'}>Coordinator</MenuItem>
                            <MenuItem value={'Add Teachers'} disabled={!isCoordinatorAdded}>Teacher</MenuItem>
                        </Select>}
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        id="academic-year"
                        label="Academic Year"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={academicYear}
                        onChange={handleAcademicYearChange}
                    />
                </FormControl>

                {userRole && (
                    <>
                        <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} disabled={userRole === 'Student' && isFileUploaded} />
                        <button onClick={handleFileUpload}>Upload</button> {/* New upload button */}
                        {userRole === 'Advisor' && isFileUploaded && (
                            // Add the actual JSX elements for additional options here
                            <div>Additional options for Advisor</div>
                        )}

                        {message && <Alert severity={isFileUploaded ? 'success' : 'error'}>{message}</Alert>}
                        {isFileUploaded && filteredData.length > 0 && (
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {Object.keys(filteredData[0]).map((key, index) => (
                                                <TableCell key={index} sx={{ fontWeight: 'bold', color:'#ffffff', backgroundColor: '#0f0fff'}}>{key}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                                            <TableRow key={rowIndex}>
                                                {Object.values(row).map((value, cellIndex) => (
                                                    <TableCell key={cellIndex}>{value}</TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={filteredData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableContainer>
                        )}
                    </>
                )}
            </Paper>
        </>
    );
};

export default FileUploadToApi;
