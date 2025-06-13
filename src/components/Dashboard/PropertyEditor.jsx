import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  RadioGroup,
  Radio,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { RealEstateContext } from "../../context/RealEstateContextProvider";
import { primaryColor } from "../../../theme";
import { useLocation, useNavigate } from "react-router-dom";

const validPexelsIds = [
  271747, 1571460, 323775, 106399, 534151, 259588, 1571461, 1643383, 1457848,
  259962,
];

const getRandomPexelsImage = () => {
  const randomId =
    validPexelsIds[Math.floor(Math.random() * validPexelsIds.length)];
  return `https://images.pexels.com/photos/${randomId}/pexels-photo-${randomId}.jpeg`;
};

const currentYear = new Date().getFullYear();

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed")
    .required("Property name is required"),
  developer: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed")
    .required("Developer is required"),
  city: Yup.string().required("City is required"),
  district: Yup.string().required("District is required"),
  address: Yup.string()
    .matches(
      /^[a-zA-Z0-9\s,]+$/,
      "Only letters, numbers, and spaces are allowed"
    )
    .required("Address is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .when("for_rent", {
      is: false,
      then: (schema) => schema.required("Price is required for sale"),
      otherwise: (schema) => schema,
    }),

  rent_price: Yup.number()
    .typeError("Rent price must be a number")
    .when("for_rent", {
      is: true,
      then: (schema) => schema.required("Rent price is required for rent"),
      otherwise: (schema) => schema,
    }),
  bedrooms: Yup.number()
    .typeError("Bedrooms must be a number")
    .integer("Bedrooms must be an integer")
    .min(0, "Bedrooms cannot be negative")
    .required("Bedrooms is required"),
  bathrooms: Yup.number()
    .typeError("Bathrooms must be a number")
    .integer("Bathrooms must be an integer")
    .min(0, "Bathrooms cannot be negative")
    .required("Bathrooms is required"),
  area_sqm: Yup.number()
    .typeError("Area must be a number")
    .min(1, "Area must be at least 1 sqm")
    .required("Area is required"),
  year_built: Yup.number()
    .typeError("Year built must be a number")
    .integer("Year built must be an integer")
    .max(currentYear, `Year built can't be in the future`)
    .required("Year built is required"),
  property_type: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Only letters are allowed")
    .required("Property type is required"),
  contact_email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  contact_phone: Yup.string()
    .matches(/^\+?\d[\d\s]*$/, "Phone number must contain only digits, optional '+' at the beginning, and optional spaces")
    .min(11, "Phone number must be at least 11 characters")
    .required("Phone is required"),
  image_url: Yup.string().url("Invalid URL"),
  amenities: Yup.string()
    .matches(
      /^([a-zA-Z0-9\s\-\/]+)(,\s*[a-zA-Z0-9\s\-\/]+)*$/,
      "Enter amenities separated by commas"
    )
    .required("Amenities are required"),


  installment_price_per_month: Yup.number()
    .typeError("Installment price must be a number")
    .when("installment_available", {
      is: true,
      then: (schema) => schema.required("Installment price is required"),
    }),
  installment_period_months: Yup.number()
    .typeError("Installment period must be a number")
    .when("installment_available", {
      is: true,
      then: (schema) => schema.required("Installment period is required"),
    }),
  description: Yup.string().trim().required("Description is required"),
});

const PropertyEditor = () => {
  const navigate = useNavigate();
  const { allProperties, getAllProperties, updateProperty } = useContext(RealEstateContext);
  const [zones, setZones] = useState([]);
  const [districts, setDistricts] = useState([]);
  const location = useLocation();
  const { propertyToEdit } = location.state || {};

  useEffect(() => {
    console.log(" Data received from handleEdit:", propertyToEdit);
  }, [propertyToEdit]);

  useEffect(() => {
    axios
      .get("https://684b43c2165d05c5d35c002f.mockapi.io/propertiesApi/zones")
      .then((response) => setZones(response.data));
  }, []);

  const formik = useFormik({

    initialValues: propertyToEdit
      ? {
        ...propertyToEdit,
        city: propertyToEdit.city || "",
        district: propertyToEdit.district || "",
        address: propertyToEdit.address || "",
        contact_email: propertyToEdit.email || "",
        contact_phone: propertyToEdit.phone || "",
        price: propertyToEdit.for_rent
          ? ""
          : propertyToEdit.price ? parseInt(propertyToEdit.price.replace(/[^0-9]/g, "")) : "",
        rent_price: propertyToEdit.for_rent
          ? propertyToEdit.rent_price ? parseInt(propertyToEdit.rent_price.replace(/[^0-9]/g, "")) : ""
          : "",
        amenities: propertyToEdit.amenities?.join(", ") || "",
        installment_price_per_month:
          propertyToEdit.installment_price_per_month
            ? parseInt(propertyToEdit.installment_price_per_month.replace(/[^0-9]/g, ""))
            : "",
        installment_period_months:
          propertyToEdit.installment_period_months || "",
      }
      : {
        name: "",
        developer: "",
        city: "",
        district: "",
        address: "",
        price: "",
        rent_price: "",
        bedrooms: "",
        bathrooms: "",
        area_sqm: "",
        year_built: "",
        property_type: "",
        contact_phone: "",
        contact_email: "",
        image_url: getRandomPexelsImage(),
        description: "",
        amenities: "",
        for_rent: false,
        furnished: false,
        balcony: false,
        parking: false,
        installment_available: false,
        installment_price_per_month: "",
        installment_period_months: "",
      },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const {
          city,
          district,
          address,
          contact_phone,
          contact_email,
          ...rest
        } = values;

        const propertyData = {
          ...rest,
          price: values.price && Number(values.price).toLocaleString("en-EG") + " EGP",
          rent_price: values.rent_price && Number(values.rent_price).toLocaleString("en-EG") + " EGP/month",
          bedrooms: Number(values.bedrooms),
          bathrooms: Number(values.bathrooms),
          area_sqm: Number(values.area_sqm),
          year_built: Number(values.year_built),
          amenities: values.amenities.split(",").map((a) => a.trim()),
          installment_price_per_month:
            values.installment_price_per_month && values.installment_price_per_month + " EGP/month",
          city,
          district,
          address,
          phone: contact_phone,
          email: contact_email,
        };



        if (propertyToEdit) {

          await updateProperty(propertyToEdit.id, propertyData);
          toast.success("Property updated successfully");
          navigate("/dashboard/propertiesData");

        } else {

          const newProperty = {
            ...propertyData,
            id: allProperties.length + 1
          };

          await axios.post("https://684b36ad165d05c5d35bda40.mockapi.io/propertiesapi/all", newProperty);

          // const { id, ...rest } = propertyData; // Remove any accidental id
          // const newProperty = { ...rest };
          // await axios.post("https://684b36ad165d05c5d35bda40.mockapi.io/propertiesapi/all", newProperty);

          toast.success("Property added successfully");
        }


        resetForm();
        getAllProperties();

      }
      catch (err) {
        toast.error("Error submitting form: " + err.message);
      } finally {
        setSubmitting(false);
      }
    }
  }
  );


  useEffect(() => {
    const filteredDistricts = formik.values.city
      ? zones
        .filter((zone) => zone.city === formik.values.city)
        .map((zone) => zone.district)
      : zones.map((zone) => zone.district);
    setDistricts(filteredDistricts);
  }, [formik.values.city, zones]);

  const checkboxes = [
    { name: "parking", label: "Parking" },
    { name: "balcony", label: "Balcony" },
    { name: "furnished", label: "Furnished" },
    { name: "installment_available", label: "Installment Available" },
  ];

  const renderTextField = (name, label, type = "text") => (
    <TextField
      id={name}
      fullWidth
      name={name}
      label={label}
      type={type}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
    />
  );

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        mt: 4,
        borderRadius: 2,
        maxWidth: 900,
        mx: "auto",
        borderTop: `5px solid ${primaryColor}`,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          letterSpacing: "2px",
          textTransform: "uppercase",
          textAlign: "center",
          mt: 1,
          mb: 4,
          mx: "auto",
          color: "#FF8000",
        }}
      >
        {location.state?.propertyToEdit ? "Update Property" : "Add New Property"}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            rowGap: 3,
            columnGap: 8,
            mb: 3,
          }}
        >
          <RadioGroup
            row
            name="for_rent"
            value={formik.values.for_rent ? "rent" : "sale"}
            onChange={(e) =>
              formik.setFieldValue("for_rent", e.target.value === "rent")
            }
          >
            <FormControlLabel value="sale" control={<Radio />} label="Sale" />
            <FormControlLabel value="rent" control={<Radio />} label="Rent" />
          </RadioGroup>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {checkboxes.map((field) => (
              <FormControlLabel
                key={field.name}
                control={
                  <Checkbox
                    checked={formik.values[field.name]}
                    onChange={formik.handleChange}
                    name={field.name}
                  />
                }
                label={field.label}
              />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            columnGap: 4,
            rowGap: 2,
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ flex: "1 1 48%", minWidth: 280 }}>
            <TextField
              select
              label="City"
              name="city"
              fullWidth
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            >
              {[...new Set(zones.map((z) => z.city))].map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ flex: "1 1 48%", minWidth: 280 }}>
            <TextField
              select
              label="District"
              name="district"
              fullWidth
              value={formik.values.district}
              onChange={formik.handleChange}
              error={formik.touched.district && Boolean(formik.errors.district)}
              helperText={formik.touched.district && formik.errors.district}
            >
              {districts.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: 4,
            rowGap: 2,
            mb: 3,
          }}
        >
          {[
            { name: "name", label: "Property Name" },
            { name: "developer", label: "Developer" },
            { name: "address", label: "Address" },
            {
              name: formik.values.for_rent ? "rent_price" : "price",
              label: formik.values.for_rent
                ? "Rent Price (EGP/month)"
                : "Price (EGP)",
            },
            { name: "bedrooms", label: "Bedrooms", type: "number" },
            { name: "bathrooms", label: "Bathrooms", type: "number" },
            { name: "area_sqm", label: "Area (sqm)", type: "number" },
            { name: "year_built", label: "Year Built", type: "number" },
            { name: "property_type", label: "Property Type" },
            { name: "contact_email", label: "Contact Email" },
            { name: "contact_phone", label: "Contact Phone" },
            { name: "image_url", label: "Image URL" },
            ...(formik.values.installment_available
              ? [
                {
                  name: "installment_price_per_month",
                  label: "Installment Price/Month",
                },
                {
                  name: "installment_period_months",
                  label: "Installment Period (months)",
                },
              ]
              : []),
            { name: "amenities", label: "Amenities (comma-separated)" },
          ].map(({ name, label }) => (
            <Box key={name} sx={{ flex: "1 1 48%", minWidth: 280 }}>
              {renderTextField(name, label)}
            </Box>
          ))}
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            fullWidth
          />
        </Box>
        <Box>
          <Button
            type="submit"
            variant="contained"
          >
            {propertyToEdit ? "Update Property" : "Add Property"}
          </Button>
        </Box>
      </form>
    </Paper >
  );
};

export default PropertyEditor;
