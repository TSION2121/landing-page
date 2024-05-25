import React, {Suspense, useState} from 'react';
import {Routes, Route, Link, BrowserRouter, Outlet} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Home from './pages/Home/Home';
import Courses from './pages/Courses/Courses';
import About from './pages/About/About';
import News from './pages/News/News';
import Login from './pages/Contact/Login';
import styled from 'styled-components';
// import Logo from './utils/images/logo.svg';
import Logo from './utils/images/logo-trans.png';
import AdminRoutes from "./AdminRoutes";
import MainPage from "./pages/Admin/Main";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container"; // Make sure the path to your logo is correct
// import theme from './pages/Admin/theme';
import UsersPage from "./pages/Admin/UsersPage";
import FileUpload from "./pages/Admin/FileUpload";
import FileUploadToApi from "./pages/Admin/FileUploadToApi";
import Dashboard from "./pages/Admin/Dashboard";
import Dashboard2 from "./pages/Admin/Dashboard2";
import LayoutNews from "./components/LayoutNews";
import Newss from "./Newss";
import DrawerAppBar from "./DrawerAppBar";
import Insertion from "./pages/Admin/Insertion";
import CoDashboard from "./pages/Coordinator/CoDashboard";
import DynamicForm from "./pages/Admin/FormInsertion";
import SendMessage from "./components/SendMessage";
import MessagePage from "./components/MessagePage";
import ChatInterface from "./components/SendMessage";
import CalendarPage from "./components/Calendar/CalendarPage";
import CalendarView from "./components/Calendar/CalendarView";

const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: '#f44336',
        },
        warning: {
            main: '#ff9800',
        },
        info: {
            main: '#2196f3',
        },
        success: {
            main: '#4caf50',
        },
        // Define other colors as needed
    },
    // ... other theme configurations
});

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const customTheme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        // ... (other palette colors)
    },
    // ... (other theme configurations)
});
const App = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    // const theme = deepmerge(muiTheme, joyTheme);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                IETP
            </Typography>
            <List>
                <ListItem button component={StyledLink} to="/">
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={StyledLink} to="/about">
                    <ListItemText primary="About" />
                </ListItem>
                <ListItem button component={StyledLink} to="/news">
                    <ListItemText primary="Notice" />
                </ListItem>
                <ListItem button component={StyledLink} to="/login">
                    <ListItemText primary="Login" />
                </ListItem>
            </List>
        </Box>
    );

    return (

        <>
            <CssBaseline />
            <Container maxWidth="lg" >
                <DrawerAppBar />
                {/*<Box sx={{ display: 'inline' } }>*/}

                {/*</Box>*/}
                <Box component="main" sx={{ p: 10 }}>
                    <Routes>
                        <Route path="/sendMessage" element={<ChatInterface />} />
                        <Route path="/MessagePage" element={<MessagePage />} />
                        <Route path="/addCalendar" element={<CalendarPage />} />
                        <Route path="/view" element={<CalendarView />} />
                        <Route path="/sendMessage/:recipientId" element={<ChatInterface />} />
                        <Route path="/MessagePage/:messageId" element={<MessagePage />} />
                        <Route path="/newss" element={<Newss />} />
                        <Route path="/forminsertion" element={<DynamicForm />} />

                        <Route path="/insert" element={<Insertion />} />
                        <Route path="/coordinator/dashboard" element={<CoDashboard />} />


                        <Route path="/layout-news" element={<LayoutNews />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/file" element={<FileUpload />} />
                        <Route path="/fileapi" element={<FileUploadToApi />} />

                        <Route path="/analysis" element={<MainPage />} />
                        <Route path='/users' element={<UsersPage />}/>
                        <Route path="/dashboard/*" element={<Dashboard />} /> {/* Nested admin routes */}
                        <Route path="/dashboard2/*" element={<Dashboard2 />} /> {/* Nested admin routes */}



                        <Route path="admin/*" element={<AdminRoutes />} /> {/* Nested admin routes */}








                    </Routes>


                </Box>

            </Container>
        </>

    );
}

export default App;
