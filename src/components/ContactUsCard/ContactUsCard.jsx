import React, { useContext } from 'react';
import { Box, FormControl, InputLabel, OutlinedInput, Typography, Button, useTheme } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ContactContext } from '../../context/ContactUsContextProvider';
import { toast } from 'react-toastify';
import { ThemeContext } from '@emotion/react';
import { hoverColor, primaryColor } from '../../../theme';

const ContactUsCard = () => {

  const theme = useTheme();

  const { addContactMessage } = useContext(ContactContext)


  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const now = new Date();
      const timestamp = now.toISOString();

      const messageWithTimestamp = {
        ...values,
        dateSent: timestamp
      };

      await addContactMessage(messageWithTimestamp);
      resetForm();
    } catch (error) {
      console.error('Error submitting the form:', error);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        boxSizing: 'border-box',
        px: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '900px' }}>
        <Formik
          initialValues={{ name: '', email: '', phone: '', subject: '', message: '' }}
          validationSchema={Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Email is required'),
            phone: Yup.string()
              .matches(/^[0-9]{11}$/, 'Phone number must be 10 digits')
              .required('Phone number is required'),
            subject: Yup.string().required('Subject is required'),
            message: Yup.string().required('Message is required'),
          })}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
              >
                <FormControl sx={{
                  width: { xs: '100%', sm: '100%', md: '48.5%' }, my: 2,
                  backgroundColor: theme.palette.background.paper,
                }} variant="outlined">
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <OutlinedInput
                    id="name"
                    type="text"
                    label="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                  />
                </FormControl>

                {/* Email */}
                <FormControl sx={{
                  width: { xs: '100%', sm: '100%', md: '48.5%' }, my: 2, backgroundColor: theme.palette.background.paper,
                }} variant="outlined">
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <OutlinedInput
                    id="email"
                    type="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                  />
                </FormControl>

                {/* Phone */}
                <FormControl sx={{
                  width: { xs: '100%', sm: '100%', md: '48.5%' }, my: 2,
                  backgroundColor: theme.palette.background.paper,
                }} variant="outlined">
                  <InputLabel htmlFor="phone">Phone</InputLabel>
                  <OutlinedInput
                    id="phone"
                    type="tel"
                    label="Phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && Boolean(errors.phone)}
                  />
                </FormControl>

                {/* Subject */}
                <FormControl sx={{
                  width: { xs: '100%', sm: '100%', md: '48.5%' }, my: 2,
                  backgroundColor: theme.palette.background.paper,
                }} variant="outlined">
                  <InputLabel htmlFor="subject">Subject</InputLabel>
                  <OutlinedInput
                    id="subject"
                    type="text"
                    label="Subject"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.subject && Boolean(errors.subject)}

                  />
                </FormControl>
              </Box>

              {/* Message */}
              <TextareaAutosize
                minRows={4}
                placeholder="Enter your message"
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  width: '100%',
                  fontSize: '16px',
                  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  lineHeight: '23px',
                  color: theme.palette.text.primary,
                  padding: '16.5px 14px',
                  borderRadius: '4px',
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  backgroundColor: theme.palette.background.paper,
                  opacity: 1
                }}
                sx={{
                  '&::placeholder': {
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: '16px',
                    lineHeight: '23px',
                    color: 'rgb(255, 255, 255)',
                    opacity: 1,
                  },
                }}
              />

              {/* Submit */}
              <Box sx={{ my: 2, textAlign: 'start' }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  sx={{
                    border: `1px ${primaryColor} solid`,
                    fontSize: '16px',
                    fontWeight: 'bold',
                    borderRadius: '4px',
                    padding: '10px 20px',
                    '&:hover': {
                      backgroundColor: hoverColor,
                      border: `1px ${primaryColor} solid`,
                    },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box >
  );
};

export default ContactUsCard;
