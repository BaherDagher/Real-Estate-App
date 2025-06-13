import React, { useContext } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SearchContext } from "../../context/SearchContextProvider";
import { useTheme } from "@emotion/react";
import { primaryColor } from "../../../theme";


const StyledTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: 35,
  padding: "4px",
  minHeight: "auto",
  "& .MuiTabs-indicator": {
    display: "none",
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  minHeight: "auto",
  minWidth: 80,
  fontWeight: 500,

  color: theme.palette.primary.main,
  borderRadius: 20,
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const TabsComponent = () => {
  const { searchCriteria, setsearchCriteria } = useContext(SearchContext);
  const theme = useTheme();


  const handleChange = (_, newValue) => {
    setsearchCriteria((prev) => ({
      ...prev,
      for_rent: newValue === 1,
    }));
  };

  return (
    <Box display="flex" justifyContent="center">
      <StyledTabs
        value={searchCriteria.for_rent ? 1 : 0}
        onChange={handleChange}
        sx={{
          backgroundColor: theme.palette.background.paper, border: `1px solid ${primaryColor}`,
        }}

      >
        <StyledTab label="Buy" />
        <StyledTab label="Rent" />
      </StyledTabs>
    </Box>
  );
};

export default TabsComponent;
