import React, { useContext, useEffect } from 'react';
import { FavouritesContext } from '../../context/FavouritesContextProvider.jsx';
import PropertyCard from '../PropertyCard/PropertyCard.jsx';
import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';

const Favourites = () => {
  const { favouriteList, removeFromFavouriteList } = useContext(FavouritesContext);
  const theme = useTheme();

  useEffect(() => {
    // Optional side effect if needed on favouriteList update
  }, [favouriteList]);

  return (
    <>
      {favouriteList.length > 0 ? (
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textAlign: 'center',
              mt: 4,
              mb: 3,
              color: '#FF8000',
              fontSize: { xs: '24px', sm: '30px', md: '2.5rem' },
            }}
          >
            Favourite Properties
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              flexWrap: 'wrap',
              backgroundColor: 'background.default',
              px: { xs: 2, sm: 3, md: 5, lg: 8 },
              gap: 4,
            }}
          >
            {favouriteList.map((favProperty) => (
              <Box
                key={favProperty.id}
                sx={{
                  flex: {
                    xs: '0 0 100%',
                    sm: '0 0 45%',
                    md: '0 0 calc(100% / 3 - 32px)',
                  },
                  boxSizing: 'border-box',
                  my: 1,
                  mx: { xs: 'auto', md: 0 },
                  overflow: 'hidden',
                  borderRadius: 2,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}
              >
                {/* Pass the whole favProperty but use propertyId for link */}
                <PropertyCard
                  property={{ ...favProperty, id: favProperty.propertyId }}
                  onRemoveFavourite={() => removeFromFavouriteList(favProperty)}
                  isFavourite
                />
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Box sx={{ marginTop: 15 }}>
          <Typography
            variant="h5"
            sx={{
              my: 3,
              color: theme.palette.text.primary,
              fontWeight: 'bold',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            You haven’t added any property to your favourites yet.
          </Typography>
          <Typography
            variant="h5"
            sx={{
              my: 3,
              color: theme.palette.text.primary,
              fontWeight: 'bold',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            Start exploring and add your favorites!
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Favourites;