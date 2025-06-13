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
  Drawer,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { FilterContext } from "../../context/FilterContextProvider";

const FilterDrawer = ({ open, onClose }) => {
  const {
    filterCriteria,
    setFilterCriteria,
    districts,
    bedroomsNum,
    bathroomsNum,
    priceValues,
    areaValues,
  } = useContext(FilterContext);

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
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 300, p: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />

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
              onChange={(_, newValue) =>
                handleRangeChange("areaRange", newValue)
              }
              min={areaValues.minArea}
              max={areaValues.maxArea}
              step={10}
              valueLabelDisplay="auto"
            />
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;
