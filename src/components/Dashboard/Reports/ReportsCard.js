import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField, TablePagination, InputAdornment, Box, IconButton, Stack, useTheme, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GetAppIcon from '@mui/icons-material/GetApp';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import Data2 from '../../../iotdata.json';

const ReportsCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength - 3) + '...';
    }
    return str;
  }

  const tmpdata = Data2.iotReport.reportList[0].reportData;
  const reportsData = tmpdata.map((item) => ({
    category: item.reportCategory,
    reportName: item.reportName,
    source: item.source,
    description: item.reportDesc,
    lastUpdated: item.lastReportDate
  }));

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const filteredData = reportsData.filter(report =>
    report.reportName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const highlightSearchText = (text, query) => {
    if (!query) return text;
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) return text;

    const before = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const after = text.substring(index + query.length);

    return (
      <>
        {before}
        <span style={{ backgroundColor: 'yellow' }}>{match}</span>
        {after}
      </>
    );
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const customLabelDisplayedRows = ({ page }) => {
    return `page ${page + 1} of ${totalPages}`;
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Reports (36)
          </Typography>
          <IconButton size="small" sx={{ ml: 1, color: 'black', mr: '7px' }}>
            <OpenInNewIcon fontSize="small" />
          </IconButton>
        </Box>
        <TextField 
          label="Search" 
          variant="outlined" 
          fullWidth 
          margin="normal"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: isMobile ? '100%' : '28%' }}
        />
        {isMobile ? (
          <Stack spacing={2}>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((report, index) => (
              <Box key={index} sx={{ border: '1px solid #ddd', borderRadius: '4px', p: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{report.category}</Typography>
                <Typography variant="h6">{highlightSearchText(report.reportName, searchQuery)}</Typography>
                <Typography variant="body2">{report.source}</Typography>
                <Typography variant="body2">{truncateString(report.description, 20)}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="body2">{report.lastUpdated}</Typography>
                  <IconButton size="small" sx={{ ml: 1 }}>
                    <GetAppIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Stack>
         ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ '&:hover': { background: '#f0f0f0' } }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Reports</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Source</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Last updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((report, index) => (
                <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                  <TableCell>{report.category}</TableCell>
                  <TableCell>{highlightSearchText(report.reportName, searchQuery)}</TableCell>
                  <TableCell>{report.source}</TableCell>
                  <TableCell>{truncateString(report.description, 20)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {report.lastUpdated}
                      <IconButton size="small" sx={{ ml: 1 }}>
                        <GetAppIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TablePagination
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={isMobile ? [] : [5, 10, 15]} 
            labelRowsPerPage={isMobile ? '' : 'Rows per page'}
            labelDisplayedRows={customLabelDisplayedRows}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReportsCard;
