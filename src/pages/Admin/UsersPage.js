// Example usage in MainPage.js or another parent component
import React, {useEffect, useState} from 'react';
import UsersDataTable from "./UsersDataTable";
import {Container, TablePagination, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
// ... (rest of your imports)

const MainPage = () => {

    const [userData, setUserData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        axios.get('http://localhost:3002/users')
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the user data:', error);
            });
    }, []); // The empty array ensures this effect runs once on mount

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Calculate the current page data
    const currentPageData = userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Container sx={{height:"300px"}} >
            {/* ... (rest of your JSX) */}
            <Box bgcolor={"cornflowerblue"}>
                <Typography color={"white"} variant="h5" sx={{textAlign:'center'}}>
                    Users Information
                </Typography>
            </Box>
            <UsersDataTable data={currentPageData} />
            <TablePagination
                component="div"
                count={userData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </Container>
    );
};

export default MainPage;
