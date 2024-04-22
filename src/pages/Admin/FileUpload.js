import React, { useState } from 'react';
import {
    Button,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Container, Typography, Box
} from '@mui/material';
import * as XLSX from 'xlsx';
const FileUpload = ({ setData }) => {

const [message, setMessage] = useState('Please upload Excel files of the students, advisors, or coordinators.');
const [isFileUploaded, setIsFileUploaded] = useState(false);
const [excelData, setExcelData] = useState([]);
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);

// Pagination handlers
const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};
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

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const workbook = XLSX.read(e.target.result, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const data = XLSX.utils.sheet_to_json(sheet);
                setExcelData(data);
                setIsFileUploaded(true);
                setMessage('File uploaded successfully.');
            } catch (error) {
                setMessage('Error reading the file.');
            }
        };
        reader.onerror = () => {
            setMessage('Error uploading the file.');
        };
        reader.readAsBinaryString(file);
    };

    return (
        <>
            <Box bgcolor={"darkblue"}>
                <Typography color={"white"} variant="h3"> Please Upload an excel file to register your users    </Typography>
        </Box> <Container sx={{ backgroundColor: 'lightblue', padding: '12px', margin:'20px 0'}}>

            <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
            <Button variant="contained">Upload</Button>
            {message && <Alert severity={isFileUploaded ? 'success' : 'error'}>{message}</Alert>}
            {isFileUploaded && excelData.length > 0 && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {Object.keys(excelData[0]).map((key, index) => (
                                    <TableCell key={index} sx={{ fontWeight: 'bold' ,color:'#ffffff',  backgroundColor: '#0f0fff'}}>{key}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {excelData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                                <TableRow key={rowIndex} sx={rowIndex === 0 ? { } : {}}>
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
                        count={excelData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            )}
        </Container></>
    );
};

export default FileUpload;
