import React from "react";
import {Box,Drawer,Typography,IconButton,Button,RadioGroup,FormControlLabel,Radio,useTheme,           
  useMediaQuery,} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const SortFilterDrawer = ({filterDrawerOpen,handleFilterDrawerClose,handleSortOptionChange,
  handleClearFilter,
  handleApplyFilter,
  sortOption,
}) => {
    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const filterDrawerContent = (
    <Box sx={{ width:isMobile?'300px': 368, padding: 2, transition: "width 0.3s" }}>
      <Typography
        variant="h5"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          Sort & Filter
          <IconButton sx={{ color: "#333", ml: 2 }} onClick={handleFilterDrawerClose}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <IconButton onClick={handleFilterDrawerClose}>
          <ArrowForwardIcon sx={{ color: "#333" }} />
        </IconButton>
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
        Sort by
      </Typography>
      <RadioGroup value={sortOption} onChange={handleSortOptionChange}>
        <FormControlLabel
          value="lowToHigh"
          control={<Radio sx={{ "&.Mui-checked": { color: "#F6288F" } }} />}
          label="Severity Low to High"
        />
        <FormControlLabel
          value="highToLow"
          control={<Radio sx={{ "&.Mui-checked": { color: "#F6288F" } }} />}
          label="Severity High to Low"
        />
        <FormControlLabel
          value="timestamp"
          control={<Radio sx={{ "&.Mui-checked": { color: "#F6288F" } }} />}
          label="Timestamp"
        />
      </RadioGroup>
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
        Filter by date range
      </Typography>
      <RadioGroup value={sortOption} onChange={handleSortOptionChange}>
        <FormControlLabel
          value="lastHour"
          control={<Radio sx={{ "&.Mui-checked": { color: "#F6288F" } }} />}
          label="Last Hour"
        />
        <FormControlLabel
          value="last24Hours"
          control={<Radio sx={{ "&.Mui-checked": { color: "#F6288F" } }} />}
          label="Last 24 Hours"
        />
        <FormControlLabel
          value="last7Days"
          control={<Radio sx={{ "&.Mui-checked": { color: "#F6288F" } }} />}
          label="Last 7 Days"
        />
      </RadioGroup>

      <Box sx={{ display: "flex", flexDirection: "column", mt: 3 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#F6288F",
            mb: 2,
            "&:hover": {
              bgcolor: "#F6288F",
            },
          }}
          onClick={handleApplyFilter}
        >
          Apply Filter
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "black",
            border: "1px solid black",
            "&:hover": {
              borderColor: "black",
              bgcolor: "transparent",
            },
          }}
          onClick={handleClearFilter}
        >
          Clear Selection
        </Button>
      </Box>
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      open={filterDrawerOpen}
      onClose={handleFilterDrawerClose}
      sx={{ transition: "width 0.4s" }}
    >
      {filterDrawerContent}
    </Drawer>
  );
};

export default SortFilterDrawer;
