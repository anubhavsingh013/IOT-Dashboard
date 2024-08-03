import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import Data from '../../../iotdata.json'; 

const TopUsageCard = () => {
  const topusage=Data.iotTopUsage.usageDataList[0].usages;
  const usageData = topusage.map((item) => ({
    msisdn: item.mobileNumber,
    status: item.mobileNumberStatus,
    usage: `${item.dataUsage}GB` 
  }));

  return (
    <Card sx={{ boxShadow: 2, borderRadius: 2, overflow: 'hidden', height: '100%' }} >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: '20px', mt: '13px' }}>
          Top Usage
        </Typography>
        <TableContainer component={Paper} sx={{ mt: '40px', overflow: 'hidden', boxShadow: 0 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>MSISDN</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Usage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usageData.map((item, index) => (
                <TableRow key={index} sx={{'&:hover': { backgroundColor: '#f0f0f0',},}}>
                  <TableCell>{item.msisdn}</TableCell>
                  <TableCell>
                    {item.status === 'Active' ? (
                      <CheckCircle style={{ color: 'green', verticalAlign: 'middle',width:'20px',height:'20px' }} />
                    ) : (
                      <Cancel style={{ color: 'red', verticalAlign: 'middle',width:'20px',height:'20px'  }} />
                    )}
                    {` ${item.status}`}
                  </TableCell>
                  <TableCell>{item.usage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TopUsageCard;
