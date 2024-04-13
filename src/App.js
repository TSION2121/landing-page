import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Home from './pages/Home/Home';
import Courses from './pages/Courses/Courses';
import About from './pages/About/About';
import News from './pages/News/News';
import Login from './pages/Contact/Login';
import styled from 'styled-components';
import Logo from './utils/images/logo.svg'; // Make sure the path to your logo is correct

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
                    <ListItemText primary="News" />
                </ListItem>
                <ListItem button component={StyledLink} to="/login">
                    <ListItemText primary="Login" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Router>
            <Box sx={{ display: 'inline' } }>
                <AppBar position="relative" sx={{ width: { sm: `calc(100% - ${240}px)` }, ml: { sm: `${240}px` } }}>
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
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 , my: 2 }}>
                            IETP
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Button color="inherit" component={StyledLink} to="/">Home</Button>
                            <Button color="inherit" component={StyledLink} to="/about">About</Button>
                            <Button color="inherit" component={StyledLink} to="/news">News</Button>
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
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}

export default App;
