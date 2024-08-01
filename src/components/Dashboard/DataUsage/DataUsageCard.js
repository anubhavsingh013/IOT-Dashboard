import React, { useState, useMemo } from 'react';
import { Card, CardContent, Typography, Grid, Box, Link, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import Data from '../../../iotdata.json';

const transformData = (dataUsage) => {
  return dataUsage.map(entry => ({
    date: new Date(entry.date),
    usage: entry.dataUsage,
    day: new Date(entry.date).toLocaleDateString('en-US', { 
      // day: 'numeric', month: 'short'
      weekday:'short'
     })
  }));
};

const aggregateDataByMonth = (data) => {
  const monthlyData = data.reduce((acc, entry) => {
    const monthYear = `${entry.date.getFullYear()}-${entry.date.getMonth() + 1}`;
    if (!acc[monthYear]) {
      acc[monthYear] = { name: `${entry.date.toLocaleDateString('en-US', { month: 'short' })} ${entry.date.getFullYear()}`, usage: 0 };
    }
    acc[monthYear].usage += entry.usage;
    return acc;
  }, {});

  return Object.values(monthlyData);
};

const filterDataByTimeRange = (data, range) => {
  const today = new Date();
  let startDate;
  if (range === '7 days') {
    startDate = new Date(today.setDate(today.getDate() - 7));
  } else if (range === '3 month') {
    startDate = new Date(today.setMonth(today.getMonth() - 3));
  } else if (range === '6 month') {
    startDate = new Date(today.setMonth(today.getMonth() - 6));
  }
  
  return data.filter(entry => entry.date >= startDate);
};

const DataUsageCard = () => {
  const [timeRange, setTimeRange] = useState('7 days');
  const dataUsage = Data.dataUsageDefaultData.dataUsageGraphResponse[0].dataUsage;
  const data = useMemo(() => transformData(dataUsage), [dataUsage]);

  const filteredData = useMemo(() => {
    const timeFilteredData = filterDataByTimeRange(data, timeRange);
    return timeRange === '7 days' ? timeFilteredData : aggregateDataByMonth(timeFilteredData);
  }, [data, timeRange]);

  const handleChange = (event) => {
    setTimeRange(event.target.value);
  };

  const CustomLabel = ({ x, y, width, value }) => {
    return (
      <text x={x + width / 2} y={y - 10} fill="#333" textAnchor="middle" fontSize={13}>
        {`${value} GB`}
      </text>
    );
  };

  const CustomTick = ({ x, y, payload }) => {
    const formattedValue = timeRange === '7 days' ? payload.value : payload.value;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
          {formattedValue}
        </text>
      </g>
    );
  };

  // const totalUsage = filteredData.reduce((acc, day) => acc + day.usage, 0).toFixed(2);
  // const dailyAverage = (totalUsage / filteredData.length).toFixed(2);
  const totalUsage=Data.dataUsageDefaultData.dataUsageGraphResponse[0].totalDataUsage;
  const dailyAverage=Data.dataUsageDefaultData.dataUsageGraphResponse[0].dataAverage;

  return (
    <Card sx={{ boxShadow: 2, borderRadius: 2, overflow: 'hidden', height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
            Data Usage
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="time-range-select-label">View</InputLabel>
              <Select
                labelId="time-range-select-label"
                id="time-range-select"
                value={timeRange}
                label="View"
                onChange={handleChange}
              >
                <MenuItem value={'7 days'}>7 days</MenuItem>
                <MenuItem value={'3 month'}>3 month</MenuItem>
                <MenuItem value={'6 month'}>6 month</MenuItem>
              </Select>
            </FormControl>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#333', ml: 2 }}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <OpenInNewIcon fontSize="small" />
            </Link>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                boxShadow: 0,
                borderRadius: 2,
                border: '1px solid #e0e0e0',
                bgcolor: 'white',
                height: '100%',
                m: '0px',
                p: '0px',
              }}
            >
              <CardContent>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  Total Usage
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
                  {totalUsage} GB
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{ boxShadow: 0, borderRadius: 2, border: '1px solid #e0e0e0', bgcolor: 'white' }}>
              <CardContent>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  Daily Average
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
                  {dailyAverage} GB
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ height: '100%', boxShadow: 0 }}>
            <CardContent sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData} margin={{ top: 20, right: 5, left: 1, bottom: 5 }} barSize={25}>
                  <CartesianGrid strokeDasharray="4 4" horizontal={true} vertical={false} />
                  <XAxis dataKey={timeRange === '7 days' ? 'day' : 'name'} tick={<CustomTick />} />
                  <Tooltip formatter={(value) => `${value} GB`} />
                  <Bar dataKey="usage" fill="#F6288F" radius={[4, 4, 0, 0]}>
                    <LabelList content={<CustomLabel />} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DataUsageCard;
