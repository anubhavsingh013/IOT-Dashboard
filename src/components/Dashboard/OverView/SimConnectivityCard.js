import React from 'react';
import { Card, CardContent, Typography, Grid, Box, useTheme, useMediaQuery } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import Data from '../../../iotdata.json'; 

const SIMConnectivityCard = () => {
  const simConnectivity = Data.iotOverview.deviceDetailsExperience[0].simConnectivity;

  const pieChartData2 = [
    { name: "Connected", value: parseFloat(simConnectivity.connected) / 1000, color: "#402E7A" },
    { name: "Disconnected", value: parseFloat(simConnectivity.disconnected) / 1000, color: "#F6288F" }
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const total = pieChartData2.reduce((sum, entry) => sum + entry.value, 0);
  const connectedEntry = pieChartData2.find(entry => entry.name === 'Connected');
  const percentage = total > 0 ? ((connectedEntry.value / total) * 100).toFixed(0) : 0;

  const filteredData = pieChartData2.filter(entry => entry.value > 0);

  const renderCustomizedLabel = ({ cx, cy }) => {
    return (
      <>
        <text
          x={cx}
          y={cy - 10}
          fill="black"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={isMobile ? 12 : 20}
          fontWeight="bold"
        >
          {`${connectedEntry.value}K`}
        </text>
        <text
          x={cx}
          y={cy + 10}
          fill="black"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={isMobile ? 10 : 16}
          color="gray"
        >
          Connected Sims
        </text>
      </>
    );
  };

  return (
    <Card sx={{ boxShadow: 0, borderRadius: 1 }}>
      <CardContent>
        <Typography 
          variant="body1" 
          sx={{ fontWeight: 'bold', color: '#000' }} 
        >
          SIMs Connectivity
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Last Updated: {new Date(simConnectivity.lastUpdatedDate).toLocaleDateString()}
        </Typography>
        <Grid container spacing={2} alignItems="center" direction={isMobile ? 'column' : 'row'}>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <PieChart width={isMobile ? 150 : 200} height={isMobile ? 150 : 200}>
              <Pie
                labelLine={false}
                data={pieChartData2}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={75}
                fill="#8884d8"
                label={renderCustomizedLabel}
              >
                {pieChartData2.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              {filteredData.map((entry) => (
                <Box key={entry.name} display="flex" alignItems="center" mb={1}>
                  <Box
                    width={isMobile ? 10 : 12}
                    height={isMobile ? 10 : 12}
                    bgcolor={entry.color}
                    mr={1}
                    borderRadius="1px"
                  />
                  <Typography
                    variant="body2"
                    fontSize={isMobile ? '0.75rem' : '0.875rem'}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Typography sx={{ color: '#555', mr: 1 }}>
                      {entry.name}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold', color: '#000' }}>
                      {entry.value}K
                    </Typography>
                    {entry.name === 'Connected' && (
                      <Typography
                        sx={{ color: '#555', ml: 1 }}
                      >
                        {`${percentage === '100' ? '100%' : `${percentage}%`}`}
                      </Typography>
                    )}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SIMConnectivityCard;
