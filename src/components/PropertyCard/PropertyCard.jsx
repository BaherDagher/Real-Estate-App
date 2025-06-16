import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, CardActionArea } from '@mui/material';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { hoverColor, primaryColor } from '../../../theme';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useContext } from 'react';
import { FavouritesContext } from '../../context/FavouritesContextProvider';
import { useState } from 'react';
import { useEffect } from 'react';

const PropertyCard = React.memo(({ property }) => {

    const { favouriteList, addToFavouriteList, removeFromFavouriteList } = useContext(FavouritesContext)
    const theme = useTheme();


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
    }, [favouriteList, property.id])

    return (
        <>
            <Card
                sx={{ mx: { xs: 'auto', md: '0' } }}
                className='slickWidth'
            >
                <CardActionArea
                    component={Link}
                    to={`/property/${property.id}`}
                    sx={{
                        '&:hover .image-zoom': {
                            transform: 'scale(1.05)',
                        }
                    }}
                >
                    <Box
                        className="image-container"
                        sx={{
                            overflow: 'hidden',
                            height: { sx: 200, md: 300 }
                        }}
                    >
                        <Box
                            className="image-zoom"
                            sx={{
                                transition: 'transform 0.5s ease-in-out',
                                height: { sx: 200, md: 300 }
                            }}
                        >
                            <LazyLoadImage
                                alt={property.name}
                                src={property.image_url}
                                effect="blur"
                                width="100%"
                                height="100%"
                                wrapperProps={{
                                    style: { transitionDelay: "125ms" },
                                }}
                            />
                        </Box>
                    </Box>

                    <CardContent>

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" component="div" sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                display: 'block',
                                maxWidth: '100%',
                                fontSize: { xs: 14, md: 18 },
                                // fontWeight: { xs: 'bold' }
                            }}>
                                {property.name}
                            </Typography>

                            <Typography variant="h6" component="div" sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                display: 'block',
                                maxWidth: '100%',
                                fontSize: { xs: 14, md: 18 }

                            }} >
                                {property.for_rent ? property.rent_price : property.price}
                            </Typography>
                        </Box>


                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.secondary',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                display: 'block',
                                maxWidth: '100%',
                                marginLeft: "1px",
                                marginTop: 1,
                                fontSize: { xs: 13, md: 14 },

                            }}
                        >
                            {property.description}
                        </Typography>


                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mt: 2,
                                gap: 1,
                                flexWrap: 'nowrap',
                            }}
                        >
                            <LocationOnIcon sx={{ marginLeft: "-5px" }} />

                            <Box
                                sx={{
                                    flexBasis: '80%',
                                    overflow: 'hidden',
                                }}
                            >
                                <Typography
                                    variant='body2'
                                    sx={{
                                        color: 'text.secondary',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        fontSize: { xs: 12, md: 14 },
                                    }}
                                >
                                    {`${property.address} , ${property.district}, ${property.city}`}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    flexBasis: '20%',
                                    textAlign: 'right',
                                }}
                            >
                                <Typography
                                    variant='body2'
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: { xs: 12, md: 14 },
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {property.for_rent ? 'For Rent' : 'For Sale'}
                                </Typography>
                            </Box>
                        </Box>


                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                            <SingleBedIcon sx={{ fontSize: 26, marginLeft: "-5px" }} />
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {property.bedrooms}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary', opacity: 0.4 }}
                            >
                                |
                            </Typography>

                            <BathtubOutlinedIcon sx={{ fontSize: 22, marginTop: "-5px" }} />
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {property.bathrooms}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary', opacity: 0.4 }}
                            >
                                |
                            </Typography>

                            <CropFreeOutlinedIcon sx={{ fontSize: 22 }} />
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {property.area_sqm} m²
                            </Typography>
                        </Box>
                    </CardContent>


                </CardActionArea>

                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 1,
                        px: '12px',
                    }}
                >
                    <Button
                        size="small"
                        variant="outlined"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: 'white',
                            borderRadius: 2,
                            flex: 0.9,
                            ':hover': {
                                backgroundColor: hoverColor,
                            },
                            fontSize: { xs: 12, md: 14 },

                        }}
                        onClick={() => window.open(`tel:${property.phone}`)}
                    >
                        <CallOutlinedIcon sx={{ marginRight: 1 }} />
                        Call
                    </Button>

                    <Button
                        size="small"
                        variant="outlined"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: 'white',
                            borderRadius: 2,
                            flex: 0.9,
                            ':hover': {
                                backgroundColor: hoverColor,
                            },
                            fontSize: { xs: 12, md: 14 },

                        }}
                        onClick={() => window.open(`mailto:${property.email}`)}
                    >
                        <EmailOutlinedIcon sx={{ marginRight: 1 }} />
                        Email
                    </Button>

                    <Button
                        size="small"
                        variant="outlined"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: 'white',
                            borderRadius: 2,
                            flex: 0.9,
                            ':hover': {
                                backgroundColor: hoverColor,
                            },
                            fontSize: { xs: 12, md: 14 },

                        }}
                        onClick={() => {
                            favouriteAction(property);
                        }}
                    >
                        <FavoriteIcon sx={{ marginRight: 1, color: favouriteColor }} />
                        Fav
                    </Button>

                </CardActions>

            </Card >
        </>
    );
})

export default PropertyCard;
