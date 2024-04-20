// Example usage in MainPage.js or another parent component
import React, { useState } from 'react';
import UsersDataTable from "./UsersDataTable";
import {Typography} from "@mui/material";
// ... (rest of your imports)

const MainPage = () => {
    const [userData, setUserData] = useState([]); // This should be set to the actual user data
    const mockData = [
        { id: 1, name: 'John Doe', gender: 'Male', department: 'Engineering', cgpa: 3.5 },
        { id: 2, name: 'John Doe', gender: 'Male', department: 'Engineering', cgpa: 3.5 },
        { id: 3, name: 'John Doe', gender: 'Male', department: 'Engineering', cgpa: 3.5 },
        { id: 4, name: 'John Doe', gender: 'Male', department: 'Engineering', cgpa: 1.8 },
        { id: 5, name: 'John Doe', gender: 'Male', department: 'Engineering', cgpa: 3.5 },
        { id: 6, name: 'Jane Smith', gender: 'Female', department: 'Science', cgpa: 3.8 },
        { id: 7, name: 'John Doe', gender: 'Female', department: 'Engineering', cgpa: 2.5 },
        { id: 8, name: 'John Doe', gender: 'Female', department: 'Engineering', cgpa: 1.5 },
        { id: 9, name: 'John Doe', gender: 'Male', department: 'Engineering', cgpa: 2.5 },
        { id: 10, name: 'John Doe', gender: 'Female', department: 'Engineering', cgpa: 3.5 },
        { id: 11, name: 'Jane Smith', gender: 'Female', department: 'Science', cgpa: 1.89 },
    ];
    // ... (rest of your component logic)

    return (
        <div>
            {/* ... (rest of your JSX) */}
            <Typography variant='h2'> Users Information</Typography>
            <UsersDataTable data={mockData} />
            {/* ... (rest of your JSX) */}
        </div>
    );
};

export default MainPage;
