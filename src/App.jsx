import { AppBar, Drawer, IconButton, List, ListItem, Typography, ListItemText, ListItemIcon } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PieChartIcon from '@mui/icons-material/PieChart';

function App() {

  const [drawerOpen, setDrawerOpen] = useState(false);

  const listItemStyle = {
    color: 'green'
  };

  const iconStyle = {
    color: 'green'
  };

  return (
    <div className="App">
      <AppBar position="sticky" style={{ background: "green" }}>
        <div style={{ display: "flex" }}>
          <IconButton onClick={() => setDrawerOpen(true)} style={{ color: "white" }}>
            <MenuIcon sty />
          </IconButton>
          <Typography variant="h6" style={{ marginTop: "3px" }}>Personal trainer app</Typography>
        </div>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          <ListItem component={Link} to="/" >
            <ListItemIcon>
              <HomeIcon style={iconStyle} />
            </ListItemIcon>
            <ListItemText primary="Home" style={listItemStyle} />
          </ListItem>
          <ListItem component={Link} to="/trainings">
            <ListItemIcon>
              <FitnessCenterIcon style={iconStyle} />
            </ListItemIcon>
            <ListItemText primary="Trainings" style={listItemStyle} />
          </ListItem>
          <ListItem component={Link} to="/customers">
            <ListItemIcon>
              <PeopleIcon style={iconStyle} />
            </ListItemIcon>
            <ListItemText primary="Customers" style={listItemStyle} />
          </ListItem>
          <ListItem component={Link} to="/calendar">
            <ListItemIcon>
              <CalendarMonthIcon style={iconStyle} />
            </ListItemIcon>
            <ListItemText primary="Calendar" style={listItemStyle} />
          </ListItem>
          <ListItem component={Link} to="/statistics">
            <ListItemIcon>
              <PieChartIcon style={iconStyle} />
            </ListItemIcon>
            <ListItemText primary="Statistics" style={listItemStyle} />
          </ListItem>
        </List>
      </Drawer>
      <Outlet />
    </div>
  );
}

export default App;