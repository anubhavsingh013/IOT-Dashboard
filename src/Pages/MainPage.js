
import React from 'react';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import ReportsCard from '../components/Dashboard/Reports/ReportsCard'
import OverviewCard from '../components/Dashboard/OverView/OverviewCard'
import DataUsageCard from '../components/Dashboard/DataUsage/DataUsageCard';
import TopUsageCard from '../components/Dashboard/TopUsage/TopUsageCard';
import { Grid, useMediaQuery, useTheme } from '@mui/material';

const MainPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const mainContentStyle = {
    marginLeft: isMobile?0:'250px',
    padding: '20px',
    marginTop: '50px', 
  };
  return (
    
    <div className="dashboard-container" style={{overflow:'hidden'}}>
      <Navbar style={mainContentStyle}/>
      <div style={mainContentStyle}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} >
            <Header />
          </Grid>
          <Grid item xs={12}>
            <OverviewCard />
          </Grid>
          <Grid item xs={isMobile?12:6}>
            <DataUsageCard />
          </Grid>
          <Grid item xs={isMobile?12:6}>
            <TopUsageCard />
          </Grid>
          <Grid item xs={12}>
            <ReportsCard />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MainPage;
