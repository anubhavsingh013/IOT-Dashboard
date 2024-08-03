import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Link, useMediaQuery, useTheme } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SIMConnectivityCard from './SimConnectivityCard';
import SIMStatusCard from './SimStatusCard';
import Data from '../../../iotdata.json';

const OverviewCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { sims, simStatus, simConnectivity } = Data.iotOverview.deviceDetailsExperience[0];
  
  const totalSim = parseInt(sims.totalSimCount, 10)/1000;
  const activeSim = parseInt(sims.active, 10)/1000;
  const inactiveSim = parseInt(sims.inactive, 10)/1000;

  return (
    <Card sx={{ boxShadow: 2, borderRadius: 2, overflow: 'hidden', p: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2,flexDirection:isMobile?'column':'row' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
            Overview
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', color: '#333' }}>
            <Typography variant="body2" sx={{ marginRight: '5px' }}>
              Last Updated: {new Date(simStatus.lastUpdatedDate).toLocaleString()}
            </Typography>
            <Link href="#" target="_blank" rel="noopener noreferrer" sx={{ color: '#333' }}
              onClick={(e) => { e.preventDefault(); }}>
              <OpenInNewIcon fontSize="small" />
            </Link>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ boxShadow: 0, borderRadius: 2, border: '1px solid #e0e0e0', bgcolor: 'white' }}>
              <CardContent>
                <Typography variant="body2" sx={{ color: '#555' }}>Total SIMs</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>{totalSim.toLocaleString()}K</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ boxShadow: 0, borderRadius: 2, border: '1px solid #e0e0e0', bgcolor: 'white' }}>
              <CardContent>
                <Typography variant="body2" sx={{ color: '#555' }}>Active SIMs</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>{activeSim.toLocaleString()}K</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ boxShadow: 0, borderRadius: 2, border: '1px solid #e0e0e0', bgcolor: 'white' }}>
              <CardContent>
                <Typography variant="body2" sx={{ color: '#555' }}>Inactive SIMs</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>{inactiveSim.toLocaleString()}K</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 1 }}>
              <SIMStatusCard />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ p: 1 }}>
              <SIMConnectivityCard />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
