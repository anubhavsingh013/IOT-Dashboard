import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box,useMediaQuery,useTheme } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AlertsDrawer from "./AlertsDrawer";
import Data from '../../data.json';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const newAlertsCount = Data.newAlerts?.length; 

  const headerStyle = {
    backgroundColor: "#ffffff",
    boxShadow: "none",
    px: "2px",
    py: "12px",
    width: "100%",
    position: "relative",
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" &&(event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const badgeStyle = {
    position: 'absolute',
    top: 2,
    right: 53,
    background: '#F6288F',
    color: 'white',
    borderRadius: '50%',
    width: '16px',
    height: '16px',  
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
  };
  return (
    <AppBar position="static" sx={headerStyle}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: isMobile?"center":'flex-start',
          width: "100%",
        }}
      >
        <Typography variant="body2" sx={{ color: "#333", marginBottom: "4px" }}>
          Home / Internet of Things
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            flexDirection:isMobile?'column':'row'
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#000",
              flexGrow: 1,
              textAlign: "left",
              marginLeft: 0,
            }}
          >
            Internet of Things Dashboard
          </Typography>
          <Box style={{ display: "flex", alignItems: "center", position: 'relative' }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#000", marginRight: "15px" }}
            >
              Account number: 123456789
            </Typography>
            <Button
              sx={{
                border: "2px solid black",
                mr: "24px",
                color: "black",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                // position: 'relative',
              }}
              onClick={toggleDrawer(true)}
            >
              <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <NotificationsIcon sx={{ color: "black" }} />
                {newAlertsCount > 0 && (
                  <Box sx={badgeStyle}>
                    {newAlertsCount}
                  </Box>
                )}
                
                <Typography
                  variant="h7"
                  sx={{ fontWeight: "bold", color: "black", marginLeft: "8px" }}
                >
                  Alerts
                </Typography>
              </Box>
            </Button>
          </Box>
        </Box>
      </Toolbar>
      <AlertsDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
    </AppBar>
  );
};

export default Header;
