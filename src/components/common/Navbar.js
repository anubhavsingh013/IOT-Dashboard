import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Search, AccountCircle, ArrowDropDown } from '@mui/icons-material';

const Navbar = () => {
  const [anchorEl,setAnchorE1]=useState(null);
  const handleMenuOpen=(event)=>{
    setAnchorE1(event.currentTarget)
  }
  const handleclose=()=>{
    setAnchorE1(null);
  }
  const ismenuOpen=Boolean(anchorEl);
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#000', color: '#fff',boxShadow:0 }}>
      <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
        <Box display="flex" alignItems="flex-start" >
          <Box
            component="img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmmRGbjdCp4ZT26RhgaijJ9dm2D0B_N4GNCA&s"
            sx={{
              height: '39px',
              width: '60px',
            }}
          />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              T-MOBILE
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              FOR BUSINESS
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              position: 'relative',
              borderRadius: 1,
              backgroundColor: 'rgba(255,255,255,0.15)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.25)' },
              mr: 2,
            }}
          >
            <Box sx={{ pl: 2, pr: 2, display: 'flex', alignItems: 'center',
                 }}>
              <Search />
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ color: 'inherit', ml: 1 }}
              />
            </Box>
          </Box>
          <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={handleMenuOpen}>
            <IconButton sx={{ color: 'inherit' }}>
              <AccountCircle />
            </IconButton>
            <Typography variant="body2" component="div">
              My account
            </Typography>
            <ArrowDropDown />
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={ismenuOpen}
            onClose={handleclose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
           >
            <MenuItem>Profile</MenuItem>
            <MenuItem>Account</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
