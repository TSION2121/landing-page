// FileUploadToApiToApi.js
import React, {useEffect, useState} from 'react';
import * as XLSX from 'xlsx';
import API_ENDPOINTS from "../Api/API_ENDPOINTS";
import { Box, Container, Typography, Alert, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import Checkbox from "@mui/material/Checkbox";


const FileUploadToApi = ({ setData }) => {
    const [message, setMessage] = useState('Please upload Excel files of the students, advisors, or coordinators.');
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [excelData, setExcelData] = useState([]);
    const [userRole, setUserRole] = useState('');
    const [isCoordinatorAdded, setIsCoordinatorAdded] = useState(false);
    const [academicYear, setAcademicYear] = useState('');
    const [searchYear, setSearchYear] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Determine the current academic year based on the current date
    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        // If the current month is before September, subtract one year
        const calculatedAcademicYear = currentMonth < 8 ? currentYear - 1 : currentYear;
        setAcademicYear(calculatedAcademicYear.toString());
        setSearchYear(calculatedAcademicYear.toString());
    }, []);

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
    const handleFileUpload = async (file) => {
        setMessage('Uploading file...');
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(API_ENDPOINTS.UPLOAD_FILE, {
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
            } else {
                setMessage('Failed to upload and process the file.');
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
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
                const workbook = XLSX.read(e.target.result, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const data = XLSX.utils.sheet_to_json(sheet);
                // Set local state with the Excel data
                setExcelData(data);
                // Call the function to handle file upload and API call
                handleFileUpload(file);
            } catch (error) {
                setMessage('Error reading the file.');
            }
        };
        reader.onerror = () => {
            setMessage('Error uploading the file.');
        };
        reader.readAsBinaryString(file);
    };


    // Filter data based on the search year and user role
    const filteredData = searchTerm
        ? excelData.filter((data) => data.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : excelData;

    // Handle search term change
    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleSearchYearChange = (event) => {
        // Your logic to handle the change event
    };


    // Render the search and add coordinator section
    const renderSearchAndAddSection = () => {
        return (
            <Container sx={{ backgroundColor: 'lightgray', padding: '12px', margin:'20px 0'}}>
                <TextField
                    id  ="search-name"
                    label="Search by Name"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Add as Coordinator</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            // Implement the logic to handle checkbox state
                                            // onChange={...}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        );
    };


    return (
        <>
            <Box bgcolor={"darkblue"}>
                <Typography color={"white"} variant="h3"> Please Upload an Excel file to register your users </Typography>
            </Box>
            <Container sx={{ backgroundColor: 'lightblue', padding: '12px', margin:'20px 0'}}>

                {/* ... User Role Selection */}
                {userRole === 'Advisor' && !isFileUploaded && (
                    <>
                        <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
                        {message && <Alert severity={'error'}>{message}</Alert>}
                    </>
                )}
                {userRole === 'Advisor' && isFileUploaded && renderSearchAndAddSection()}
                {/* ... Table display logic for uploaded data */}

                <FormControl fullWidth margin="normal">
                    <TextField
                        id="search-year"
                        label="Search by Academic Year"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={searchYear}
                        onChange={handleSearchYearChange}
                    />
                </FormControl>

            <FormControl fullWidth margin="normal">
                    <InputLabel id="user-role-label">User Role</InputLabel>
                    <Select
                        labelId="user-role-label"
                        id="user-role-select"
                        value={userRole}
                        label="User Role"
                        onChange={handleUserRoleChange}
                    >
                        <MenuItem value={'Student'}>Student</MenuItem>
                        <MenuItem value={'Coordinator'}>Coordinator</MenuItem>
                        <MenuItem value={'Advisor'} disabled={!isCoordinatorAdded}>Advisor</MenuItem>
                    </Select>
                </FormControl>
                {/*<FormControl fullWidth margin="normal">*/}
                {/*    <TextField*/}
                {/*        id="academic-year"*/}
                {/*        label="Academic Year"*/}
                {/*        type="number"*/}
                {/*        InputLabelProps={{*/}
                {/*            shrink: true,*/}
                {/*        }}*/}
                {/*        value={academicYear}*/}
                {/*        onChange={handleAcademicYearChange}*/}
                {/*    />*/}
                {/*</FormControl>*/}
                {userRole && (
                    <>
                        <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} disabled={userRole === 'Student' && isFileUploaded} />
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
            </Container>
        </>
    );
};

export default FileUploadToApi;
