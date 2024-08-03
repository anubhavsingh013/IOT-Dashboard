
import React, { useState, useMemo } from "react";
import {Box,Drawer,Tabs,Tab,List,ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
  Button,
  useMediaQuery,
  useTheme
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FilterListIcon from "@mui/icons-material/FilterList";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import Data from "../../data.json";
import SortFilterDrawer from "./SortFilterDrawer";

const AlertsDrawer = ({ drawerOpen, toggleDrawer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [tabIndex, setTabIndex] = useState(0);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [filterSelected, setFilterSelected] = useState(false);

  const [newAlerts, setNewAlerts] = useState(Data.newAlerts);
  const [alertLogs, setAlertLogs] = useState(Data.alertLogs);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleCloseAlert = (alertId, type) => {
    if (type === "new") {
      setNewAlerts((prevAlerts) =>
        prevAlerts.filter((alert) => alert.id !== alertId)
      );
    } else {
      setAlertLogs((prevAlerts) =>
        prevAlerts.filter((alert) => alert.id !== alertId)
      );
    }
  };

  const handleFilterDrawerOpen = () => {
    setFilterDrawerOpen(true);
  };

  const handleFilterDrawerClose = () => {
    setFilterDrawerOpen(false);
  };

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleClearFilter = () => {
    setFilterSelected(false);
    setSortOption("");
  };

  const handleApplyFilter = () => {
    setFilterSelected(true);
    handleFilterDrawerClose();
  };

  const sortedAndFilteredAlertLogs = useMemo(() => {
    let filteredLogs = [...alertLogs];

    const severityMap = {
      low: 1,
      high: 3,
    };

    if (sortOption === "lowToHigh") {
      filteredLogs = filteredLogs.sort(
        (a, b) => severityMap[a.severity] - severityMap[b.severity]
      );
    } else if (sortOption === "timestamp") {
      filteredLogs = filteredLogs.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
    } else if (sortOption === "highToLow") {
      filteredLogs = filteredLogs.sort(
        (a, b) => severityMap[b.severity] - severityMap[a.severity]
      );
    } else if (sortOption === "lastHour") {
      const oneHourAgo = new Date().getTime() - 3600000;
      filteredLogs = filteredLogs.filter(
        (alert) => new Date(alert.timestamp).getTime() >= oneHourAgo
      );
    } else if (sortOption === "last24Hours") {
      const oneDayAgo = new Date().getTime() - 86400000;
      filteredLogs = filteredLogs.filter(
        (alert) => new Date(alert.timestamp).getTime() >= oneDayAgo
      );
    } else if (sortOption === "last7Days") {
      const sevenDaysAgo = new Date().getTime() - 604800000;
      filteredLogs = filteredLogs.filter(
        (alert) => new Date(alert.timestamp).getTime() >= sevenDaysAgo
      );
    }
    return filteredLogs;
  }, [alertLogs, sortOption]);

  const drawerContent = (
    <Box sx={{ width:isMobile?'90%': 350, padding: 2, transition: "width 0.3s" }}>
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
          Alerts
          <OpenInNewIcon
            sx={{
              marginLeft: "16px",
              cursor: "pointer",
              width: "20px",
              height: "20px",
            }}
          />
        </Box>
        <IconButton onClick={toggleDrawer(false)}>
          <ArrowForwardIcon sx={{ color: "#333" }} />
        </IconButton>
      </Typography>

      <Tabs value={tabIndex} onChange={handleTabChange} TabIndicatorProps={{sx: {
        backgroundColor: '#F6288F',},}}>
        <Tab 
          label="New alerts" sx={{color:'black','&.Mui-selected':{color:'black'} }}
        />
        <Tab 
          label="Alert logs" sx={{ ml: 'auto', color:'black','&.Mui-selected':{color:'black'}}} 
        />
      </Tabs>


      {tabIndex === 0 && (
        <List >
          {newAlerts.map((alert, index) => (
            <ListItem
              key={index}
              sx={{ display: "flex", alignItems: "flex-start",borderBottom:'1px solid #d8d8d8', }}
            >
              <ListItemIcon sx={{ minWidth: "auto", marginRight: "8px" }}>
                <FiberManualRecordIcon
                  sx={{ color: "#478CCF", fontSize: "small", mt: "8px" }}
                />
              </ListItemIcon>
              <ListItemText
               
                primary={
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems:'flex-start',
                        flexDirection:'column',
                        width: "100%",
                      }}
                    >
                      <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: "bold", }}
                          >
                            SIM activation
                          </Typography>
                          <IconButton
                            size="small"
                            sx={{ color: "#777",height:'20px',width:'20px', }}
                            onClick={() => handleCloseAlert(alert.id, "new")}
                          >
                            <CloseIcon />
                          </IconButton>
                      </Box>
                      <Typography
                      variant="caption"
                      sx={{ display: "block", marginTop: "2px" }}
                    >
                      {alert.timestamp}
                    </Typography>
                    <Typography variant="body2" sx={{ display: "block" }}>
                      {alert.message}
                    </Typography>
                    <Typography variant="caption" sx={{ display: "block" }}>
                      {alert.id}
                    </Typography>

                    </Box>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      {tabIndex === 1 && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              startIcon={<FilterListIcon />}
              onClick={handleFilterDrawerOpen}
              sx={{
                color: "#F6288F",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Sort & Filter
            </Button>
            <Button
              startIcon={<CachedOutlinedIcon />}
              onClick={handleClearFilter}
              sx={{
                color: filterSelected ? "#F6288F" : "#777",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Clear Filter
            </Button>
          </Box>

          <List >
            {sortedAndFilteredAlertLogs.map((alert, index) => (
              <ListItem
                key={index}
                sx={{ display: "flex", alignItems: "flex-start",borderBottom:'1px solid #d8d8d8', }}
              >
                <ListItemIcon sx={{ minWidth: "auto", marginRight: "8px" }}>
                  <FiberManualRecordIcon
                    sx={{ color: "#478CCF", fontSize: "small", mt: "8px" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems:'flex-start',
                        flexDirection:'column',
                        width: "100%",
                      }}
                    >
                      <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: "bold", }}
                          >
                            SIM activation
                          </Typography>
                          <IconButton
                            size="small"
                            sx={{ color: "#777",height:'20px',width:'20px', }}
                            onClick={() => handleCloseAlert(alert.id, "new")}
                          >
                            <CloseIcon />
                          </IconButton>
                      </Box>
                      <Typography
                      variant="caption"
                      sx={{ display: "block", marginTop: "2px" }}
                    >
                      {alert.timestamp}
                    </Typography>
                    <Typography variant="body2" sx={{ display: "block" }}>
                      {alert.message}
                    </Typography>
                    <Typography variant="caption" sx={{ display: "block" }}>
                      {alert.id}
                    </Typography>
                    <Typography variant="caption" sx={{ display: "block",fontWeight:'bold',color:'#555' }}>
                      {alert.severity}
                    </Typography>
                    </Box>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );

  return (
    <>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ transition: "width 0.4s" }}
      >
        {drawerContent}
      </Drawer>
      <SortFilterDrawer
        filterDrawerOpen={filterDrawerOpen}
        handleFilterDrawerClose={handleFilterDrawerClose}
        handleSortOptionChange={handleSortOptionChange}
        handleClearFilter={handleClearFilter}
        handleApplyFilter={handleApplyFilter}
        sortOption={sortOption}
      />
    </>
  );
};

export default AlertsDrawer;
