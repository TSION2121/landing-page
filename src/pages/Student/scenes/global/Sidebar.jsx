import React from "react";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import ListIcon from '@mui/icons-material/List';



import SettingsIcon from '@mui/icons-material/Settings';
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");


  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Task Board
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
          <Box mb="25px">
          <Box display="flex" justifyContent="center" alignItems="center">
           
              <AccountCircleIcon
                style={{ cursor: "pointer", fontSize: "100" }}
              />
          
          </Box>
          <Box textAlign="center">
            <Typography
              variant="h2"
              color={colors.grey[100]}
              fontWeight="bold"
              sx={{ m: "10px 0 0 0" }}
            >
              User
            </Typography>
          </Box>
        </Box>
      )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Menu
            </Typography>
            <Item
              title="Task List"
              to="/task"
              icon={<ListIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Messages"
              to="/messages"
              icon={<MessageIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Notifications"
              to="/notifications"
              icon={<NotificationsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reporting"
              to="/report"
              icon={<SummarizeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar View"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Account
            </Typography>
          
            
            <Item
              title="Account"
              to="/account"
              icon={<PersonIcon />}
              selected={selected}
              setSelected={setSelected}
            /> 
            <Item
              title="Settings"
              to="/setting"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            /> 
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
