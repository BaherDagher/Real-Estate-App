import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Stack,
  Divider,
  Paper,
  useTheme,
  Button,
} from "@mui/material";
import { useContext } from "react";
import { FilterContext } from "../../context/FilterContextProvider";
import { hoverColor } from "../../../theme";

const FilterSidebar = () => {
  const {
    filterCriteria,
    setFilterCriteria,
    districts,
    bedroomsNum,
    bathroomsNum,
    priceValues,
    areaValues,
    handleFilterReset,
  } = useContext(FilterContext);

  const theme = useTheme();

  const handleChange = (field, value) => {
    setFilterCriteria((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRangeChange = (field, [min, max]) => {
    setFilterCriteria((prev) => ({
      ...prev,
      [field]: { min, max },
    }));
  };

  return (
    <Paper elevation={3} sx={{ width: 300, p: 4, height: 600 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Stack spacing={3}>
        <FormControl fullWidth>
          <InputLabel>Location</InputLabel>
          <Select
            value={filterCriteria.location}
            onChange={(e) => handleChange("location", e.target.value)}
            label="Location"
          >
            <MenuItem value="">All</MenuItem>
            {districts.map((district) => (
              <MenuItem key={district} value={district}>
                {district}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Bedrooms</InputLabel>
          <Select
            value={filterCriteria.bedrooms || ""}
            onChange={(e) =>
              handleChange(
                "bedrooms",
                e.target.value ? Number(e.target.value) : null
              )
            }
            label="Bedrooms"
          >
            <MenuItem value="">Any</MenuItem>
            {bedroomsNum.map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Bathrooms</InputLabel>
          <Select
            value={filterCriteria.bathrooms || ""}
            onChange={(e) =>
              handleChange(
                "bathrooms",
                e.target.value ? Number(e.target.value) : null
              )
            }
            label="Bathrooms"
          >
            <MenuItem value="">Any</MenuItem>
            {bathroomsNum.map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={[
              filterCriteria.priceRange.min ?? priceValues.min,
              filterCriteria.priceRange.max ?? priceValues.max,
            ]}
            onChange={(_, newValue) =>
              handleRangeChange("priceRange", newValue)
            }
            min={priceValues.min}
            max={priceValues.max}
            step={10000}
            valueLabelDisplay="auto"
          />
        </Box>

        <Box>
          <Typography gutterBottom>Area (m²)</Typography>
          <Slider
            value={[
              filterCriteria.areaRange.min ?? areaValues.minArea,
              filterCriteria.areaRange.max ?? areaValues.maxArea,
            ]}
            onChange={(_, newValue) => handleRangeChange("areaRange", newValue)}
            min={areaValues.minArea}
            max={areaValues.maxArea}
            step={10}
            valueLabelDisplay="auto"
          />
        </Box>
        <Box>
          <Button
            variant="outlined"
            sx={{
              mt: 4,
              backgroundColor: theme.palette.primary.main,
              color: "white",
              borderRadius: 2,
              width: "100%",
              height: "40px",
              ":hover": {
                backgroundColor: hoverColor,
              },
            }}
            onClick={handleFilterReset}
          >
            Reset filter
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default FilterSidebar;
