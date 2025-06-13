import { useContext } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Paper,
  Autocomplete,
  useTheme,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { RealEstateContext } from "../../context/RealEstateContextProvider";
import { SearchContext } from "../../context/SearchContextProvider";
import TabsComponent from "./TabsComponent";
import { hoverColor } from "../../../theme";
import { FilterContext } from "../../context/FilterContextProvider";

const SearchBar = ({ setDrawerOpen, isMobile }) => {
  const { allProperties } = useContext(RealEstateContext);
  const { searchCriteria, setsearchCriteria, handleSearchReset } =
    useContext(SearchContext);
  const { handleFilterReset } = useContext(FilterContext);
  const theme = useTheme();

  const uniqueValues = (key) => {
    const filtered = allProperties.filter(
      (item) => item.for_rent === searchCriteria.for_rent
    );
    return [
      ...new Set(
        filtered.map((item) => {
          if (key === "city") return item.city;
          return item[key];
        })
      ),
    ];
  };
  const renderAuto = (field, label, icon, options) => (
    <Autocomplete
      options={options}
      value={searchCriteria[field] || ""}
      onChange={(_, newValue) =>
        setsearchCriteria((prev) => ({
          ...prev,
          [field]: newValue || "",
        }))
      }
      sx={{ width: 240 }}
      isOptionEqualToValue={(option, value) => option === value}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={label}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 10,
              height: 45,
              marginRight: 2,
              alignItems: "center",
              justifyContent: "center",
            },
            "& .MuiInputAdornment-root": {
              marginLeft: 2,
            },
            "& .MuiAutocomplete-endAdornment": {
              marginRight: 2,
            },
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          }}
        />
      )}
    />
  );

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        p: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 2,
        backgroundColor: theme.palette.background.default,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        gap={2.5}
        justifyContent="center"
      >
        <TabsComponent />
        {renderAuto(
          "name",
          "Name",
          <BusinessIcon color="primary" />,
          uniqueValues("name")
        )}
        {renderAuto(
          "city",
          "City",
          <LocationOnIcon color="primary" />,
          uniqueValues("city")
        )}
        {renderAuto(
          "developer",
          "Developer",
          <EngineeringIcon color="primary" />,
          uniqueValues("developer")
        )}
        {renderAuto(
          "property_type",
          "Property Type",
          <HomeWorkIcon color="primary" />,
          uniqueValues("property_type")
        )}
      </Box>
      {isMobile ? (
        // display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2}
        //display={"flex"} flexBasis={"row"} gap={2}
        <Box display={"flex"} flexDirection={"row"} gap={2}>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "white",
              borderRadius: 5,
              height: "40px",
              // width: 240,
              px: 3,
              ":hover": {
                backgroundColor: hoverColor,
              },
            }}
            onClick={() => setDrawerOpen(true)}
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "white",
              borderRadius: 5,
              height: "40px",
              // width: 240,
              px: 3,
              ":hover": {
                backgroundColor: hoverColor,
              },
            }}
            onClick={() => {
              handleSearchReset();
              handleFilterReset();
            }}
          >
            Reset All
          </Button>
        </Box>
      ) : (
        <Button
          variant="outlined"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
            borderRadius: 5,
            height: "40px",
            px: 3,
            ":hover": {
              backgroundColor: hoverColor,
            },
          }}
          onClick={() => handleSearchReset()}
        >
          Reset
        </Button>
      )}
    </Paper>
  );
};

export default SearchBar;
