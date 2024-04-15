import React, { useState } from 'react';
import {Routes, Route, Link, BrowserRouter} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Home from './pages/Home/Home';
import Courses from './pages/Courses/Courses';
import About from './pages/About/About';
import News from './pages/News/News';
import Login from './pages/Contact/Login';
import styled from 'styled-components';
import Logo from './utils/images/logo.svg';
import Dashboard from "./pages/Student/scenes/dashboard";
import Task from "./pages/Student/scenes/task";
import Messages from "./pages/Student/scenes/messages";
import Notifications from "./pages/Student/scenes/notifications";
import Reports from "./pages/Student/scenes/report";
import Calendar from "./pages/Student/scenes/calendar";
import Accounts from "./pages/Student/scenes/account";
import Settings from "./pages/Student/scenes/setting"; // Make sure the path to your logo is correct



const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const App = () => {
    const [mobileOpen, setMobileOpen] = useState(false);


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
<BrowserRouter>
            <Box sx={{ display: 'inline' } }>
                <AppBar position="relative" sx={{ width: { sm: `calc(100% - ${0}px)` }, ml: { sm: `${0}px` } ,
                    // backgroundColor:'red'
                }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box component="img" src={Logo} alt="Logo" sx={{ height: 50, display: { xs: 'none', sm: 'block' } }} />
                        <Typography variant="h4" component="div" sx={{ flexGrow: 1 , my: 2 , marginLeft:'30px'}}>
                            IETP
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Button color="inherit" component={StyledLink} to="/">Home</Button>
                            <Button color="inherit" component={StyledLink} to="/about">About</Button>
                            <Button color="inherit" component={StyledLink} to="/news">Notice</Button>
                            <Button color="inherit" component={StyledLink} to="/login">Login</Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box component="nav">
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
                        sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 } }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box component="main" sx={{ p: 3 }}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/student" element={<Dashboard />} />
                        <Route path="/student/task" element={<Task />} />
                        <Route path="/student/messages" element={<Messages />} />
                        <Route path="/student/notifications" element={<Notifications />} />
                        <Route path="/student/report" element={<Reports />} />
                        <Route path="/student/calendar" element={<Calendar/>}/>
                        <Route path="/student/account" element={<Accounts/>}/>
                        <Route path="/student/setting" element={<Settings/>}/>



                    </Routes>


                </Box>
            </Box></BrowserRouter>

    );
}

export default App;
