import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button, Autocomplete, TextField, Chip, Dialog, DialogTitle, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

import fdata from './data'
import WarehouseOrderDetails from '../warehouseOrderDetails/WarehouseOrderDetails';
import './style.css'

function WarehouseOrders() {

  const [data, setData] = useState(fdata)

  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    if (searchValue === '') {
      setData(fdata);
    } else {
      const filteredData = fdata.filter((row) => row.customerId.toLowerCase().includes(searchValue.toLowerCase()));
      setData(filteredData);
    }
  }

  const columns = [
    { field: 'id', headerName: 'Id', width:180},
    { field: 'customerId', headerName: 'Customer id', width:160 },
    { field: 'documentNo', headerName: 'Document No', width:200 },
    { field: 'purchaseOrderNo', headerName: 'Purchase Order No', width:200 },
    { field: 'date', headerName: 'Date', width:150 },
    {
      field: 'status',
      headerName: 'Status',
      width:150,
      renderCell: (params) => {
        let color;
        if (params.value === 'Cancelled') {
          color = 'error';
        } else if (params.value === 'Draft') {
          color = 'warning';
        } else if (params.value === 'Confirmed') {
          color = 'success';
        }
        return <Chip label={params.value} color={color} />;
      }
    },
  ];
  
  
  return (
    <div>
      <div className='form'>
        <Button variant="contained" startIcon={<AddIcon/>} disableElevation>
          New
        </Button>
        <Autocomplete
          freeSolo
          id="search-wh-order"
          disableClearable
          options={fdata.map((option) => option.customerId)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
              onChange={handleSearch}
              className='search-field' 
              size='small'// Add custom width here
            />
          )}
       />

      </div>
      <DataGrid 
        rows={data} 
        columns={columns}
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        density='standard'
      />

      <Dialog fullWidth maxWidth="xl" open={open} onClose={handleClose}>
        <DialogTitle style={{display: "flex", justifyContent: "space-between"}}>
          <h4 style={{margin: "0.5rem 0 0 0"}}>Warehouse ID: {selectedRow ? selectedRow.id : "Warehouse Id"}</h4>
         
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent >
          <WarehouseOrderDetails selectedRow={selectedRow}/>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default WarehouseOrders
