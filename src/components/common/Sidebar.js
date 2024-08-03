import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, IconButton, Accordion,useTheme,useMediaQuery, Drawer } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DevicesIcon from '@mui/icons-material/Devices';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeIndex, setActiveIndex] = useState(1); 
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleListItemClick = (index) => {
    if (index === expandedIndex) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
    setActiveIndex(index);
  };

  const sidebarStyle = {
    width: '240px',
    height: '100vh',
    backgroundColor: '#fff',
    position: 'fixed',
    left: 0,
    top: 64,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    margin: 0,
    padding: 0,
  };

  const listItemStyle = {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    paddingLeft: '16px',
    position: 'relative',
  };

  const activeItemStyle = {
    backgroundColor: '#d8d8d8',
    borderLeft: '4px solid #F6288F',
    paddingLeft: '12px',
  };

  return (
    <>
    {!isMobile?<div style={sidebarStyle} >
      <List sx={{ padding: 0, margin: 0 }}>
        <ListItem
          sx={{
            ...listItemStyle,
            ...(activeIndex === 0 ? activeItemStyle : {}),
          }}
          onClick={() => handleListItemClick(0)}
        >
          <ListItemIcon>
            <HomeOutlinedIcon sx={{ color: activeIndex === 0 ? '#F6288F' : '#555' }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
          <IconButton sx={{ position: 'absolute', right: 10, color: '#555' }}>
          </IconButton>
        </ListItem>
        {expandedIndex === 0 && (
          <Accordion sx={{ mt: '0px', boxShadow: 0, '&:hover': { background: '#f0f0f0' }, cursor: 'pointer', height: '40px' }}>
            
              <ListItem
                sx={{
                  ...listItemStyle,
                  ...(activeIndex === 100 ? activeItemStyle : {}),
                }}
                onClick={() => setActiveIndex(100)}
              >
                <ListItemText primary="Overview" sx={{ paddingLeft: '71px' }} />
              </ListItem>
            
          </Accordion>
        )}

        <ListItem
          sx={{
            ...listItemStyle,
            ...(activeIndex === 1 ? activeItemStyle : {}),
          }}
          onClick={() => handleListItemClick(1)}
        >
          <ListItemIcon>
            <DevicesIcon sx={{ color: activeIndex === 1 ? '#F6288F' : '#555' }} />
          </ListItemIcon>
          <ListItemText primary="Internet of Things" />
          <IconButton sx={{ position: 'absolute', right: 10, color: '#555' }}>
          </IconButton>
        </ListItem>
        {expandedIndex === 1 && (
          <Accordion sx={{ mt: '0px', boxShadow: 0, '&:hover': { background: '#f0f0f0' }, cursor: 'pointer', height: '40px' }}>
          
              <ListItem
                sx={{
                  ...listItemStyle,
                  ...(activeIndex === 101 ? activeItemStyle : {}),
                }}
                onClick={() => setActiveIndex(101)}
              >
                <ListItemText primary="Overview" sx={{ paddingLeft: '71px' }} />
              </ListItem>
          </Accordion>
        )}

        <ListItem
          sx={{
            ...listItemStyle,
            ...(activeIndex === 2 ? activeItemStyle : {}),
          }}
          onClick={() => handleListItemClick(2)}
        >
          <ListItemIcon>
            <SignalCellularAltIcon sx={{ color: activeIndex === 2 ? '#F6288F' : '#555' }} />
          </ListItemIcon>
          <ListItemText primary="Advanced Network" />
          <IconButton sx={{ position: 'absolute', right: 6, color: '#555' }}>
          </IconButton>
        </ListItem>
        {expandedIndex === 2 && (
          <Accordion sx={{ mt: '0px', boxShadow: 0, '&:hover': { background: '#f0f0f0' }, cursor: 'pointer', height: '40px', }}>
              <ListItem
                sx={{
                  ...listItemStyle,
                  ...(activeIndex === 102 ? activeItemStyle : {}),
                }}
                onClick={() => setActiveIndex(102)}
              >
                <ListItemText primary="Overview" sx={{ paddingLeft: '71px' }} />
              </ListItem>
          </Accordion>
        )}

        <ListItem
          sx={{
            ...listItemStyle,
            ...(activeIndex === 3 ? activeItemStyle : {}),
          }}
          onClick={() => handleListItemClick(3)}
        >
          <ListItemIcon>
            <VpnKeyOutlinedIcon sx={{ color: activeIndex === 3 ? '#F6288F' : '#555' }} />
          </ListItemIcon>
          <ListItemText primary="Security" />
          <IconButton sx={{ position: 'absolute', right: 10, color: '#555' }}>
          </IconButton>
        </ListItem>
        {expandedIndex === 3 && (
          <Accordion sx={{ mt: '0px', boxShadow: 0, '&:hover': { background: '#f0f0f0' }, cursor: 'pointer', height: '48px' }}>
              <ListItem
                sx={{
                  ...listItemStyle,
                  ...(activeIndex === 103 ? activeItemStyle : {}),
                }}
                onClick={() => setActiveIndex(103)}
              >
                <ListItemText primary="Overview" sx={{ paddingLeft: '71px' }} />
              </ListItem>
          </Accordion>
        )}

        <ListItem
          sx={{
            ...listItemStyle,
            borderTop: '1px solid #ddd',
            paddingRight: '40px',
            ...(activeIndex === 4 ? activeItemStyle : {}),
          }}
          onClick={() => handleListItemClick(4)}
        >
          <ListItemIcon>
            <StarOutlineOutlinedIcon sx={{ color: activeIndex === 4 ? '#F6288F' : '#555' }} />
          </ListItemIcon>
          <ListItemText primary="Favourites" />
          <IconButton sx={{ position: 'absolute', right: 10, color: '#555' }}>
            <ArrowDropDown />
          </IconButton>
        </ListItem>
      </List>
    </div>:<div/>}
    </>
  );
};

export default Sidebar;
