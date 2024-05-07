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
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container"; // Make sure the path to your logo is correct
import theme from './pages/Admin/theme';
import UsersPage from "./pages/Admin/UsersPage";
import FileUpload from "./pages/Admin/FileUpload";
import FileUploadToApi from "./pages/Admin/FileUploadToApi";
import Dashboard from "./pages/Admin/Dashboard";
import Dashboard2 from "./pages/Admin/Dashboard2"; // Import your custom theme



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

        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg" >

                <Box sx={{ display: 'inline' } }>
                    <AppBar position="relative" sx={{ width: { sm: `calc(100% - ${0}px)` }, ml: { sm: `${0}px` } ,
                        backgroundColor:'lightblue' , color:'black'
                    }}>
                        <Toolbar >
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { sm: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Box component="img" src={Logo} alt="Logo" sx={{  height: 80, width:'200px', display: { xs: 'none', sm: 'block' } }} />
                            <Typography variant="h4" component="div" sx={{ flexGrow: 1 , my: 2 , marginLeft:'30px'}}>
                                IETP
                            </Typography>
                            <Box sx={{ display: { xs: 'none', sm: 'block' }, ml: '30px' }}>

                                <Button color="inherit" component={StyledLink} to="/">Home</Button>
                                <Button color="inherit" component={StyledLink} to="/about">About</Button>
                                <Button color="inherit" component={StyledLink} to="/news">Notice</Button>
                                <Button color="inherit" component={StyledLink} to="/analysis">Analysis</Button>
                                <Button color="inherit" component={StyledLink} to="/file"> Upload Users</Button>
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
                        <Routes>
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
                </Box>

            </Container>
        </ThemeProvider>

    );
}

export default App;
