import React, { useContext, useState } from 'react';
import { RealEstateContext } from '../../context/RealEstateContextProvider.jsx';
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';


export default function PropertiesData() {

  const { allProperties, deleteProperty } = useContext(RealEstateContext);
  const [open, setOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();


  const handleEdit = (property) => {
    console.log('Data to be edited:', property);
    navigate('/dashboard/propertyManagement', { state: { propertyToEdit: property } });

  };


  const handleDelete = (property) => {
    setPropertyToDelete(property);
    setOpen(true);
  };


  const handleConfirmDelete = () => {
    if (propertyToDelete) {
      deleteProperty(propertyToDelete.realId);
    }
    setOpen(false);
    setPropertyToDelete(null);
  };


  const handleCancelDelete = () => {
    setOpen(false);
    setPropertyToDelete(null);
  };


  const rows = allProperties.map((property, index) => ({
    ...property,
    index: index + 1,
    realId: property.id,
    purpose: property.for_rent ? 'Rent' : 'Sale'
  }));


  const columns = [
    {
      field: 'index',
      headerName: '#',
      width: 60,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
    },
    { field: 'name', headerName: 'Name', flex: 1, align: "center", headerAlign: 'center' },
    { field: 'property_type', headerName: 'Type', flex: 1, align: "center", headerAlign: 'center' },
    { field: 'developer', headerName: 'Developer', flex: 1, align: "center", headerAlign: 'center' },
    {
      field: 'purpose',
      headerName: 'Purpose',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'price_display',
      headerName: 'Price',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) =>
        params.row.for_rent ? params.row.rent_price : params.row.price
    },
    {
      field: 'area_sqm',
      headerName: 'Area (sqm)',
      flex: 0.5,
      align: "center",
      headerAlign: 'center',
      renderCell: (params) => (`${params.row.area_sqm} m²`)
    },
    { field: 'bedrooms', headerName: 'Bedrooms', flex: 0.5, align: "center", headerAlign: 'center' },
    { field: 'bathrooms', headerName: 'Bathrooms', flex: 0.5, align: "center", headerAlign: 'center' },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
      align: "center",
      headerAlign: 'center',
      renderCell: (params) => params.row.address || ''
    },
    {
      field: 'district',
      headerName: 'District',
      flex: 1,
      align: "center",
      headerAlign: 'center',
      renderCell: (params) => params.row.district || ''
    },
    {
      field: 'city',
      headerName: 'City',
      flex: 0.8,
      align: "center",
      headerAlign: 'center',
      renderCell: (params) => params.row.city || ''
    },
    {
      field: 'editButton',
      headerName: 'Edit',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <button
          onClick={() => handleEdit(params.row)}
          style={{
            padding: '10px 30px',
            backgroundColor: 'green',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          Edit
        </button>
      )
    },
    {
      field: 'deleteButton',
      headerName: 'Delete',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <button
          onClick={() => handleDelete(params.row)}
          style={{
            padding: '10px 25px',
            backgroundColor: '#d32f2f',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          Delete
        </button>
      )
    }
  ];

  return (
    <div style={{ height: '850px', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        showToolbar
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
          },
        }}
      />

      {/* Dialog for delete confirmation */}
      <Dialog
        open={open}
        onClose={handleCancelDelete}
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 2,
            minWidth: 350,
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontSize: '1.2rem',
            fontWeight: 600,
            color: theme.palette.text.primary,
          }}
        >
          Are you sure you want to delete this property?
        </DialogTitle>

        <DialogActions
          sx={{
            justifyContent: 'center',
            paddingBottom: 3,
            gap: 2,
          }}
        >
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              backgroundColor: 'green',
              color: 'white',
              minWidth: 100,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#006400',
              },
            }}
          >
            OK
          </Button>
          <Button
            onClick={handleCancelDelete}
            variant="contained"
            sx={{
              backgroundColor: 'red',
              color: 'white',
              minWidth: 100,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#b71c1c',
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
