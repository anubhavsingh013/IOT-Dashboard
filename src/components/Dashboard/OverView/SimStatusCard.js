import React from 'react';
import { Card, CardContent, Typography, Grid, Box, useTheme, useMediaQuery } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import Data2 from '../../../iotdata.json';

const SIMStatusCard = () => {
  const simStatus = Data2.iotOverview.deviceDetailsExperience[0].simStatus;

  const pieChartData1 = [
    { name: "Active", value: parseFloat(simStatus.active) / 1000, color: "#402E7A" },
    { name: "Suspended", value: parseFloat(simStatus.suspended) / 1000, color: "#F6288F" },
    { name: "Cancelled", value: parseFloat(simStatus.cancelled) / 1000, color: "#19A7CE" }
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const total = pieChartData1.reduce((sum, entry) => sum + entry.value, 0);
  const activeEntry = pieChartData1.find(entry => entry.name === 'Active');
  const percentage = total > 0 ? ((activeEntry.value / total) * 100).toFixed(0) : 0;

  const filteredData = pieChartData1.filter(entry => entry.value > 0);

  const renderCustomizedLabel = ({ cx, cy }) => {
    return (
      <>
        <text
          x={cx}
          y={cy - 10}
          fill="black"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={isMobile ? 20 : 25}
          fontWeight="bold"
        >
          {`${total}K`}
        </text>
        <text
          x={cx}
          y={cy + 10}
          fill="black"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={15}
          color='gray'
        >
          Total SIMs
        </text>
      </>
    );
  };

  return (
    <Card sx={{ boxShadow: 0, borderRadius: '0px', borderRight: '1px solid #e0e0e0' }}>
      <CardContent>
        <Typography 
          variant="body1" 
          sx={{ fontWeight: 'bold', color: '#000', alignItems: 'left' }} 
        >
          SIMs status
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Last Updated: {new Date(simStatus.lastUpdatedDate).toLocaleDateString()}
        </Typography>
        <Grid container spacing={2} alignItems="center" direction={isMobile ? 'column' : 'row'}>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <PieChart width={isMobile ? 150 : 200} height={isMobile ? 150 : 200}>
              <Pie
                labelLine={false}
                data={pieChartData1}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={75}
                fill="#8884d8"
                label={renderCustomizedLabel}
              >
                {pieChartData1.map((entry, index) => (
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
                    {entry.name === 'Active' && (
                      <Typography sx={{ color: '#555', ml: 1 }}>
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

export default SIMStatusCard;
