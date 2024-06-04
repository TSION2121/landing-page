import * as React from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import Button from '@mui/material/Button';
import GroupSeating from "../Groups/GroupSeating";
import {Menu, MenuItem, Select, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import MailIcon from '@mui/icons-material/Mail';
import EventIcon from '@mui/icons-material/Event';

const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'lightblue',
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'center',
    color:'white',
}));


// Mock API function to simulate fetching group data
const fetchGroupsMock = async () => {
    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return ['Group one', 'Group two', 'Group three', 'Group four'];
};

// Real API call to fetch groups
const fetchGroupsReal = async () => {
    try {
        const response = await fetch('https://your-api-endpoint.com/groups');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.groups; // Adjust according to your API response structure
    } catch (error) {
        console.error('Fetching groups failed:', error);
        return []; // Return an empty array in case of an error
    }
};



const MessageMenu = [
    {
        id: 'send',
        label: 'Send Message',
        children: [
            { id: 'Advisors', label: 'Send to Advisors' },
            { id: 'Students', label: 'Send to Students' },
            { id: 'All', label: 'Send to All Groups' },
            { id: 'Coordinators', label: 'Send to  Coordinators' },
            // { id: 'specific-groups', label: 'Send to Group select' },
            // Add more children as needed
        ],
    },
    {
        id: 'read',
        label: 'Read Message',
        children: [
            { id: 'Read-Advisors-only', label: 'Read from Advisors' },
            { id: 'Read-Students-only', label: 'Read from Students' },
            { id: 'Read-specific-groups', label: 'Read from All' },
            { id: 'Read-specific-coordinator', label: 'Read from Coordinators' },
            // Add more children as needed
        ],
    },
    // Add more menu items as needed
];


const CalendarMenu = [

            {
                id: 'add',
                label: 'Add Calendar',
            },
            {
                id: 'view',
                label: 'View Calendar',

            },
];
const fetchGroups = async () => {
    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return ['Group one', 'Group two', 'Group three', 'Group four'];
};
const CoDashboard = () => {
    const [expandedItems, setExpandedItems] = useState([]);
    const [messageAnchorEl, setMessageAnchorEl] = useState(null);
    const [calendarAnchorEl, setCalendarAnchorEl] = useState(null);

// Modify your handleClick function to handle both buttons
    const handleClick = (event, menuType) => {
        if (menuType === 'message') {
            setMessageAnchorEl(event.currentTarget);
        } else if (menuType === 'calendar') {
            setCalendarAnchorEl(event.currentTarget);
        }
    };

// Modify your handleClose function to handle both menus
    const handleClose = (menuType) => {
        if (menuType === 'message') {
            setMessageAnchorEl(null);
        } else if (menuType === 'calendar') {
            setCalendarAnchorEl(null);
        }
        setOpen(false);
    };    const [selectedItem, setSelectedItem] = useState(null);
    const [open, setOpen] = useState(false);
    const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
    const [parentItem, setParentItem] = useState(null);

    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Choose whether to use the mock API or the real API
        const useMockAPI = true; // Set this to false to use the real API
        const fetchGroups = useMockAPI ? fetchGroupsMock : fetchGroupsReal;

        fetchGroups().then(setGroups);
    }, []);

    // Function to handle group selection and navigation
    const handleGroupSelect = (group) => {
        navigate(`/sendMessage/${group}`);
    };
    const handleResultClick = () => {
        navigate('/result');
    };




    const handleSubMenuOpen = (event, item) => {
        if (parentItem === item) {
            setOpen(false);
            setParentItem(null);
        } else {
            setSubMenuAnchorEl(event.currentTarget);
            setOpen(true);
            setParentItem(item);
        }
    };

    const handleSubMenuClose = () => {
        setSubMenuAnchorEl(null);
        setOpen(false);
    };



    return (
        <>
            <Box sx={{ flexGrow: 1 , overflow: 'hidden'}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid xs={4}>
                        <Item>
                            <Box sx={{ flexGrow: 1, maxWidth: 400 }}>
                                {/* Message Menu */}
                                <Button onClick={(event) => handleClick(event, 'message')}>
                                    <MailIcon /> Message
                                </Button>
                                <Menu
                                    anchorEl={messageAnchorEl}
                                    open={Boolean(messageAnchorEl)}
                                    onClose={() => handleClose('message')}
                                >
                                    {MessageMenu.map((item) => (
                                        <MenuItem
                                            key={item.id}
                                            onClick={(event) => handleSubMenuOpen(event, item)}
                                        >
                                            {item.label}
                                            {item.children && (
                                                <Menu
                                                    anchorEl={subMenuAnchorEl}
                                                    open={open && parentItem === item}
                                                    onClose={() => handleClose('message')}
                                                >
                                                    {item.children.map((child) => (
                                                        <MenuItem
                                                            key={child.id}
                                                            onClick={() => {
                                                                setSelectedItem(child.id);
                                                                handleSubMenuClose();
                                                                handleClose();
                                                            }}
                                                        >
                                                            <Link to={`/${child.id === 'Coordinators'|| child.id ==="All" || child.id ==="Students" ||child.id === "Advisors" ? 'sendMessage' : 'MessagePage'}/${child.id}`}>
                                                                {child.label}
                                                            </Link>
                                                        </MenuItem>
                                                    ))}
                                                </Menu>
                                            )}
                                        </MenuItem>
                                    ))}
                                </Menu>

                            </Box>

                        </Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item>
                            <Box sx={{ flexGrow: 1, maxWidth: 400 }}>
                                {/* Message Menu */}
                                <Button onClick={(event) => handleClick(event, 'calendar')}>
                                    <EventIcon /> Calendar
                                </Button>
                                <Menu
                                    anchorEl={calendarAnchorEl}
                                    open={Boolean(calendarAnchorEl)}
                                    onClose={() => handleClose('calendar')}
                                >
                                    {CalendarMenu.map((item) => (
                                        <MenuItem
                                            key={item.id}
                                            onClick={(event) => handleSubMenuOpen(event, item)}
                                        >
                                            {item && (

                                                            <Link to={`/${item.id === 'add'? 'addCalendar' : 'view'}`}>
                                                                {item.label}
                                                            </Link>

                                            )}
                                        </MenuItem>
                                    ))}
                                </Menu>

                            </Box>

                        </Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item>
                            <Box sx={{ flexGrow: 1, maxWidth: 400 }}>
                                {/* Message Menu */}
                                <Button onClick={handleResultClick}>
                                    <EventIcon /> Result
                                </Button>


                            </Box>

                        </Item>
                    </Grid>


                </Grid>
            </Box>

            {/*<GroupsLayout />*/}
            <Typography variant="h5" gutterBottom sx={{
                color: 'white',
                bgcolor: 'cornflowerblue',
                margin: { xs: '2px 0', sm: '2px 0' },
                fontSize: { xs: '1rem', sm: '1.25rem' }
            }}>
                Groups List
            </Typography>
<Box>

</Box>
            <GroupSeating />
        </>
    );

}
export default CoDashboard;