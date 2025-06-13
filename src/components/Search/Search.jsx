import { useContext, useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import SearchBar from "./SearchBar";
import PropertyCard from "../PropertyCard/PropertyCard";
import FilterDrawer from "./FilterDrawer";
import FilterSidebar from "./FilterSideBar";
import { FilterContext } from "../../context/FilterContextProvider";
import Loader from "../Loader/Loader";

const Search = () => {
  const { filteredResults } = useContext(FilterContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [didInitialLoad, setDidInitialLoad] = useState(false);

  useEffect(() => {
    if (didInitialLoad) {
      window.scrollTo({ top: 10, behavior: "smooth" });
    } else {
      setDidInitialLoad(true);
    }
  }, [filteredResults, didInitialLoad]);

  return (
    <Box sx={{ px: { xs: 9, md: 10 }, py: 4 }}>
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          letterSpacing: "2px",
          textTransform: "uppercase",
          textAlign: "center",
          mt: 2,
          mb: 3,
          color: "#FF8000",
          fontSize: { xs: "28px", sm: "30px", md: "2.5rem" },
        }}
      >
        Search for Property
      </Typography>

      {/* Search Bar */}
      <Box
        sx={{
          backgroundColor: 'background.paper',
          mb: 4,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <SearchBar isMobile={isMobile} setDrawerOpen={setDrawerOpen} />
      </Box>

      {/* Filters + Results */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: '100%',
          mx: "auto",
        }}
      >
        {/* Mobile Drawer vs Desktop Sidebar */}
        {isMobile ? (
          <FilterDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          />
        ) : (
          <Box
            sx={{
              width: '23%',
              position: 'sticky',
              top: '100px',
              alignSelf: 'flex-start',
              backgroundColor: 'background.paper',
              zIndex: 1000,
              px: 1,
              mt: 2
            }}
          >
            <FilterSidebar />
          </Box>
        )}
        <Box sx={{ width: { xs: '100%', md: '77%' } }}>
          {filteredResults?.length > 0 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: {
                  xs: 'center',
                  sm: 'center',
                  md: 'flex-start',
                },
                flexWrap: 'wrap',
                backgroundColor: 'background.default',
                px: { xs: 2, sm: 3, md: 5, lg: 8 },
                gap: 4
              }}
            >
              {
                filteredResults.map((property) => (
                  <Box
                    key={property.id}
                    sx={{
                      flex: {
                        xs: '0 0 100%',
                        sm: '0 0 45%',
                        md: '0 0 calc(100%/2 - 32px)', // 4 * 8 = 32px 
                      },
                      boxSizing: 'border-box',
                      my: 1,
                      overflow: 'hidden',
                      borderRadius: 2,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    }}>
                    <PropertyCard property={property} />
                  </Box >
                ))
              }
            </Box >
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h6" sx={{ mt: 4 }}>
                No properties match your search.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
