import React, { useContext, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect } from "react";
import { FavouritesContext } from "../../context/FavouritesContextProvider";
import { useTheme } from '@emotion/react';
import { Box, Button } from '@mui/material';

const PropertyDetailsImage = ({ property }) => {

    const theme = useTheme();

    const { favouriteList, addToFavouriteList, removeFromFavouriteList } = useContext(FavouritesContext)
    const [favouriteColor, setFavouriteColor] = useState('white');
    const [favouriteAction, setFavouriteAction] = useState(() => addToFavouriteList);

    const changeFavourite = () => {
        const isFavourite = favouriteList.some(
            fav => fav.propertyId?.toString() === (property.id?.toString())
        );
        if (isFavourite) {
            setFavouriteColor('red');
            setFavouriteAction(() => removeFromFavouriteList);
        } else {
            setFavouriteColor('white');
            setFavouriteAction(() => addToFavouriteList);
        }
    }


    useEffect(() => {
        changeFavourite()
    }, [favouriteList, property?.id])

    return (
        <>
            <Box sx={{ position: "relative", borderRadius: 4, overflow: "hidden", height: { xs: '200px', md: '400px' } }}>
                <Box
                    component="img"
                    src={property.image_url}
                    alt={property.name}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill",
                        display: "block"
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        backgroundColor: theme.palette.primary.main,
                        color: "#fff",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "bold",
                        boxShadow: 2
                    }}
                >
                    {property.for_rent ? "For Rent" : "For Sale"}
                </Box>

                <Button
                    sx={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        textTransform: "none",
                        fontWeight: "bold",
                        minWidth: "auto",
                    }}
                    onClick={() => {
                        favouriteAction(property);
                    }}
                >
                    <FavoriteIcon sx={{ fontSize: 28, marginRight: 1, color: favouriteColor }} />
                </Button>
            </Box>
        </>
    );
}

export default PropertyDetailsImage;
