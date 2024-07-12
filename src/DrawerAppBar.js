import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styled from "styled-components";
import Accordion from '@mui/material/Accordion';

import {Link, useNavigate} from "react-router-dom";
import Logo from "./utils/images/logo-trans.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./Context/AuthContext";
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const drawerWidth = 240;
// const navItems =[
//     {
//     id: 1 , name:'Home',url:"/"
//     },
//
//     { id: 2 ,name:'About',url:"/about"},
// {
//     id: 3 ,name:'Notice',url:"/news"},
//     {
//         id: 4 ,name:'Login',url:"/login"}
//     ];

function DrawerAppBar(props) {

    const { isAuthenticated, logout, userRole } = useContext(AuthContext);
    const [navItems, setNavItems] = useState([]);
    const [loggedOut, setLoggedOut] = useState(false); // Add this line


    useEffect(() => {
        let items;
        if (isAuthenticated) {
            items = [
                { id: 1, name: 'Home', url: `/${userRole}` },
                { id: 2, name: 'About', url: '/about' },
                { id: 3, name: 'Notice', url: '/news' },
                { id: 4, name: 'Logout', url: '/login', onClick: () => {logout(); setLoggedOut(true);} }
            ];
        } else {
            items = [
                { id: 1, name: 'Home', url: '/' },
                { id: 2, name: 'About', url: '/about' },
                { id: 3, name: 'Notice', url: '/news' },
                { id: 4, name: 'Login', url: '/login' }
            ];
        }
        setNavItems(items);
    }, [isAuthenticated, logout, userRole, loggedOut]);
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();


    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Box sx={{display:'flex' , flexDirection:'row' , flexGrow: 1}}>
                <img src={Logo} alt="Logo" style={{  height: 60,  display: { xs: 'none', sm: 'block' } }} />
            </Box>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={item.onClick}>
                            <Link color="inherit" component={StyledLink} to={item.url}>
                                <ListItemText primary={item.name}  />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
                {isAuthenticated ? (
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={logout}>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                ) : (
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <Link color="inherit" component={StyledLink} to="/login">
                                <ListItemText primary="Login" />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                )}
            </List>

        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', }}>
            <CssBaseline />
            <AppBar component="nav" sx={{backgroundColor:'white' , color:'black'}}>
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
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <Box sx={{display:"flex", flexDirection:'row',height: 70, width:'200px',backgroundColor:'transparent' , color:'black'}}>
                           <Box component='img' src={Logo} alt="Logo"  sx={{ width:'150px',  display: { xs: 'none', sm: 'block' } }}/>
                            <Typography variant="h6"  sx={{ flexGrow: 1, my: 2 ,}}>
                                IETP
                            </Typography>
                        </Box>

                    </Typography>

                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {/*{navItems.map((item) => (*/}
                        {/*    <Button key={item} sx={{ color: '#fff' }}>*/}
                        {/*        {item}*/}
                        {/*    </Button>*/}
                        {/*))}*/}
                        <IconButton   onClick={handleBack} sx={{ color: 'black' }}>
                            <ArrowBackIcon />
                        </IconButton>
                        {navItems.map((item) => (
                            <Button key={item.id} color="inherit" component={StyledLink} to={item.url} onClick={item.onClick}>
                                {item.name}
                            </Button>
                        ))}

                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>

        </Box>
    );
}

DrawerAppBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default DrawerAppBar;
