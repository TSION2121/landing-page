// SearchPage.js
import React, { useState } from 'react';
import { Container, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from '@mui/material';

const SearchPage = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTeachers, setSelectedTeachers] = useState({});

    // Filter data based on the search term
    const filteredData = data.filter((teacher) => teacher.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Handle search term change
    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Handle checkbox change
    const handleCheckboxChange = (teacherId) => {
        setSelectedTeachers((prevSelectedTeachers) => ({
            ...prevSelectedTeachers,
            [teacherId]: !prevSelectedTeachers[teacherId]
        }));
    };

    return (
        <Container>
            <TextField
                id="search-name"
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
                        {filteredData.map((teacher) => (
                            <TableRow key={teacher.id}>
                                <TableCell component="th" scope="row">
                                    {teacher.name}
                                </TableCell>
                                <TableCell align="right">
                                    <Checkbox
                                        checked={!!selectedTeachers[teacher.id]}
                                        onChange={() => handleCheckboxChange(teacher.id)}
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

export default SearchPage;
