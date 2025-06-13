import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

export default function Form() {
const navigate = useNavigate();

  const { register, handleSubmit,reset, formState: { errors } } = useForm();

  const onSubmit = () => {
    /* Law success ro7 eft7 el Snackbar */
    handleClick();
    reset();
  }

/* Snackbar */
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
/* Snackbar */

  const Validation = {
    firstName: {
      ...register("firstName", {
        required: "First Name Is Required",
        minLength: {
          value: 3,
          message: "First Name Must Be At Least 3 Characters"
        }
      })
    },
    lastName: {
      ...register("lastName", {
        required: "Last Name Is Required",
        minLength: {
          value: 3,
          message: "Last Name Must Be At Least 3 Characters"
        }
      })
    },
    email: {
      ...register("email", {
        required: "Email Is Required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Enter Valid Email"
        }
      })
    },
    phoneNumber: {
      ...register("phoneNumber", {
        required: "Phone Number Is Required",
        pattern: {
          value: /^\d{10,}$/,
          message: "Enter Valid Phone Number"
        }
      })
    },
    age: {
      ...register("age", {
        required: "Age Is Required",
        min: {
          value: 18,
          message: "Minimum Age Is 18"
        },
        max: {
          value: 90,
          message: "Maximum Age Is 90"
        },
      })
    },
    address: {
      ...register("address", {
        required: "Address Is Required",
        minLength: {
          value: 3,
          message: "Address Must Be At Least 3 Characters"
        }
      })
    },
    city: {
      ...register("city", {
        required: "City Is Required",
        minLength: {
          value: 3,
          message: "City Must Be At Least 3 Characters"
        }
      })
    },
    position: {
      ...register("position", {
        required: "Position Is Required",
        minLength: {
          value: 3,
          message: "Position Must Be At Least 3 Characters"
        }
      })
    },
  }

  const roles = [
    {
      value: 'Admin',
      label: 'Admin',
    },
    {
      value: 'Manager',
      label: 'Manager',
    },
    {
      value: 'User',
      label: 'User',
    },
  ];



  return (    
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", gap: 2 }}
      noValidate
      autoComplete="off"

    >
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center" }}>
        <TextField
          /* el error deh mn MUI w deh ely bt5lyh el input yeb2a a7mr lw true */
          error={Boolean(errors.firstName)}
          /* helperText deh mn MUI w deh el div el error  */
          helperText={errors.firstName?.message}
          {...Validation.firstName}
          sx={{ flex: 1, marginRight: 2 }} label="First Name" variant="filled" />
        <TextField
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
          {...Validation.lastName}
          sx={{ flex: 1 }} label="Last Name" variant="filled" />
      </Box>
      <TextField
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        {...Validation.email}
        id='filled-basic' label="Email" variant="filled" />
      <TextField
        error={Boolean(errors.phoneNumber)}
        helperText={errors.phoneNumber?.message}
        {...Validation.phoneNumber}
        id='filled-basic' label="Phone Number" variant="filled" />
      <TextField
        error={Boolean(errors.age)}
        helperText={errors.age?.message}
        {...Validation.age}
        id='filled-basic' label="Age" variant="filled" type="number" />
      <TextField
        error={Boolean(errors.address)}
        helperText={errors.address?.message}
        {...Validation.address}
        id='filled-basic' label="Address" variant="filled" />
      <TextField
        error={Boolean(errors.city)}
        helperText={errors.city?.message}
        {...Validation.city}
        id='filled-basic' label="City" variant="filled" />
      <TextField
        error={Boolean(errors.position)}
        helperText={errors.position?.message}
        {...Validation.position}
        id='filled-basic' label="Position" variant="filled" />
      <TextField


        id="outlined-select-currency"
        select
        label="Select Access Type"
        defaultValue="User"
        variant='filled'

      >
        {roles.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ textAlign: "right" }} >
        <Button variant="contained" type="submit">Create New User</Button>
      </Box>
      <Snackbar 
        anchorOrigin={{ vertical:"top", horizontal:"right" }}
      open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          User Created Successfully!
        </Alert>
      </Snackbar>
    </Box>


  )
}
