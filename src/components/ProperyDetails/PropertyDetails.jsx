import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { RealEstateContext } from "../../context/RealEstateContextProvider";
import { Typography, Divider, Box, Button, ListItemIcon, Grid, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneIcon from '@mui/icons-material/Phone';
import PaymentsIcon from '@mui/icons-material/Payments';
import SecurityIcon from "@mui/icons-material/Security";
import WifiIcon from "@mui/icons-material/Wifi";
import PoolIcon from "@mui/icons-material/Pool";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ParkIcon from "@mui/icons-material/Park";
import YardIcon from "@mui/icons-material/Yard";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import ElevatorIcon from "@mui/icons-material/Elevator";
import PropertyCard from "../PropertyCard/PropertyCard";
import { useEffect } from "react";
import { FavouritesContext } from "../../context/FavouritesContextProvider";
import Loader from '../Loader/Loader';
import PropertyDetailsImage from "./PropertyDetailsImage";
import PropertyLocationMap from "./PropertyLocationMap";
import { hoverColor, primaryColor } from "../../../theme";
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



const PropertyDetails = () => {


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

  const theme = useTheme();
  const { id } = useParams();

  const { allProperties } = useContext(RealEstateContext);
  const property = allProperties.find((m) => String(m.id) === id);

  const recommendedProperties = [...allProperties].sort(() => 0.5 - Math.random()).slice(0, 3);

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case "security":
        return <SecurityIcon color="primary" />;
      case "wi-fi":
      case "wifi":
        return <WifiIcon color="primary" />;
      case "swimming pool":
        return <PoolIcon color="primary" />;
      case "elevator":
        return <ElevatorIcon color="primary" />;
      case "gym":
        return <FitnessCenterIcon color="primary" />;
      case "garden":
        return <ParkIcon color="primary" />;
      case "private garden":
        return <YardIcon color="primary" />;
      case "clubhouse":
        return <MeetingRoomIcon color="primary" />;
      case "playground":
        return <SportsSoccerIcon color="primary" />;
      case "parking":
        return <LocalParkingIcon color="primary" />;
      case "solar panels":
        return <SolarPowerIcon color="primary" />;
      default:
        return <CheckCircleIcon color="primary" />;
    }
  };


  useEffect(() => {
    changeFavourite()
  }, [favouriteList, property?.id])



  const labelWidth = "100px";

  const Row = ({ label, value }) => (
    <Box sx={{ display: "flex", mb: 1 }}>
      <Box sx={{ minWidth: labelWidth }}>
        <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          {label}
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
        {value}
      </Typography>
    </Box>
  );

  if (!property)
    return <Loader />;

  return (

    <Box sx={{ paddingX: 12, margin: "auto" }}>

      {/* This is the Head Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          textAlign: 'center',
          mb: 5,
          mt: 6,
          color: '#FF8000',
          fontSize: { xs: '20', sm: '30px', md: '2.5rem' },
        }}
      >
        Book Your Property Now!
      </Typography>

      {/* Starting of the Img + Maps Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 5,
          mt: 6,
          justifyContent: 'center',
          alignItems: 'start',
          mb: 7
        }}
      >
        <Box sx={{ width: { xs: '100%', md: '70%' } }}>
          <PropertyDetailsImage property={property} />
        </Box>

        <Box sx={{ width: { xs: '100%', md: '30%' } }}>
          <PropertyLocationMap
            key={property.id}
            district={property.district}
            city={property.city}
          />
        </Box>

      </Box>
      <Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            px: 1
          }}
        >

        </Box>
        {/* Ending of the Img + Maps Section */}


        {/* Starting of the Body Section  */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" }, justifyContent: "space-between", gap: 4, mt: 2 }}>

          {/* Starting of Left-Side Body Section */}
          <Box sx={{ width: { xs: '100%', md: '70%' } }}>

            {/* Starting of LeftSide First Section */}
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.text.primary, my: 2 }}>
                {property.name}
              </Typography>

              <Typography variant="body1" sx={{ color: theme.palette.text.secondary, my: 2 }}>
                {property.description}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", }}>
                <LocationOnIcon sx={{ color: primaryColor, mr: 1 }} />
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {property.address}, {property.district}, {property.city}
                </Typography>
              </Box>
            </Box>
            {/* Ending of LeftSide First Section */}

            {/* Starting of Property Information */}
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', color: theme.palette.text.primary, mb: 2 }}
              >
                Property Information
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  columnGap: 6,
                  rowGap: 2,
                }}
              >
                <Box sx={{ width: '300px' }}>
                  <Row label="Unit Type:" value={property.property_type} />
                  <Divider sx={{ borderColor: '#f0f0f0', my: 1 }} />

                  <Row label="Bedrooms:" value={property.bedrooms} />
                  <Divider sx={{ borderColor: '#f0f0f0', my: 1 }} />

                  <Row label="Bathrooms:" value={property.bathrooms} />
                  <Divider sx={{ borderColor: '#f0f0f0', my: 1 }} />

                  <Row label="Total Area:" value={`${property.area_sqm} sqm`} />
                  <Divider sx={{ borderColor: '#f0f0f0', my: 1 }} />

                  <Row label="Year Built:" value={property.year_built} />
                  <Divider sx={{ borderColor: '#f0f0f0', my: 1 }} />

                </Box>

                <Box sx={{ width: '300px' }}>
                  <Row label="Parking:" value={property.parking ? "Available" : "Not Available"} />
                  <Divider sx={{ borderColor: '#f0f0f0', my: 1 }} />

                  <Row label="Balcony:" value={property.balcony ? "Yes" : "No"} />
                  <Divider sx={{ borderColor: '#f0f0f0', my: 1 }} />

                  <Row label="Furnished:" value={property.furnished ? "Yes" : "No"} />
                  <Divider sx={{ borderColor: '#f0f0f0', my: 1 }} />

                  <Row label="Developer:" value={property.developer} />
                  <Divider sx={{ borderColor: '#f0f0f0', my: 1 }} />

                </Box>
              </Box>
            </Box>
            {/* Ending of Property Information */}


            {/* Starting of Features */}
            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', color: theme.palette.text.primary, mb: 3 }}
              >
                Features / Amenities
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  gap: 2,
                }}
              >
                {property.amenities.map((amenity, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: { xs: '140px', md: '150px' },
                      p: 2,
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15), 0 6px 12px rgba(0,0,0,0.10)",
                      backgroundColor: theme.palette.background.paper,
                    }}
                  >
                    <Box sx={{ fontSize: 28, color: primaryColor, mb: 1 }}>
                      {getAmenityIcon(amenity)}
                    </Box>
                    <Typography variant="body2" sx={{
                      color: theme.palette.text.primary,
                    }}>
                      {amenity}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            {/* Ending of Features */}
          </Box>
          {/* Ending of Left-Side Body Section */}


          {/* Starting of Right-Side Body Section */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: { xs: '100%', md: '30%' } }}>

            {/* Starting of Payment Details */}
            <Box
              sx={{
                p: 2,
                borderRadius: "12px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15), 0 6px 12px rgba(0,0,0,0.10)",
                backgroundColor: theme.palette.background.paper,

              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.primary,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontWeight: 'bold',

                }}
              >
                <PaymentsIcon sx={{ color: primaryColor }} />
                Payment Details
              </Typography>

              <Row label="Purpose:" value={property.for_rent ? "For Rent" : "For Sale"} />

              {!property.for_rent && (
                <>
                  <Row label="Price:" value={property.price} />

                  {!property.installment_available && <Row label="Method:" value="Cash Only" />}

                  {property.installment_available && (
                    <>
                      <Row label="Method:" value="Cash & Installment" />
                      <Row label="Installment:" value={property.installment_price_per_month} />
                      <Row label="Installment Period: " value={property.installment_period_months} />
                    </>
                  )}
                </>
              )}
              {property.for_rent && <Row label="Rent:" value={property.rent_price} />}
            </Box>
            {/* Ending of Payment Details */}

            {/* Starting of Contact Section */}
            <Box
              sx={{
                p: 2,
                borderRadius: "12px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15), 0 6px 12px rgba(0,0,0,0.10)",
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  alt="Developer"
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  sx={{ width: 60, height: 60, mr: 2, ml: 2 }}
                />
                <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
                  {property.developer}
                </Typography>
              </Box>

              <Divider sx={{ width: "100%", mb: 2 }} />

              <Box
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
                    flex: 1,
                    px: 2,
                    ':hover': {
                      backgroundColor: hoverColor,
                    },
                  }}
                  onClick={() => window.open(`https://wa.me/${property.phone}`, '_blank')}                >
                  <WhatsAppIcon sx={{ marginRight: 1 }} />
                  WhatsApp
                </Button>

              </Box>
            </Box>
            {/* Ending of Contact Section */}

          </Box>
          {/* Ending of Right-Side Body Section */}

        </Box>
      </Box>
      {/* Ending of the Body Section  */}

      {/* Starting of Recommended Section */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.text.primary, mt: 8 }}>
          Recommended For You
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: {
              xs: 'center',
              sm: 'center',
              md: 'space-between'
            },
            flexWrap: 'wrap',
            backgroundColor: 'background.default',
            px: { xs: 2, sm: 3, md: 5 },
            gap: 4,
            mt: 4
          }}
        >
          {
            recommendedProperties.map((property) => (
              <Box
                key={property.id}
                sx={{
                  flex: {
                    xs: '0 0 100%',
                    sm: '0 0 45%',
                    md: '0 0 calc(100%/3 - 32px)', // 4 * 8 = 32px 
                  },
                  boxSizing: 'border-box',
                  mx: { xs: 'auto', md: '0' },
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
      </Box>
      {/* Ending of Recommended Section */}

    </Box >
  );
};

export default PropertyDetails;
