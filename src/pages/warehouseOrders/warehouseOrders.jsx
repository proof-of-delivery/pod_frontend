import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Autocomplete, TextField, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import fdata from './data';
import { Link } from 'react-router-dom';
import WarehouseOrderForm from './components/WarehouseOrderForm';
import './style.css';

function WarehouseOrders() {
  const [data, setData] = useState(fdata);
  const [open, setOpen] = useState(false);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    if (searchValue === '') {
      setData(fdata);
    } else {
      const filteredData = fdata.filter((row) =>
        row.customerId.toLowerCase().includes(searchValue.toLowerCase())
      );
      setData(filteredData);
    }
  };

  const columns = [
    { field: 'id', headerName: 'Id', width: 80 },
    { field: 'customerId', headerName: 'Customer id', width: 160 },
    { field: 'documentNo', headerName: 'Document No', width: 200 },
    { field: 'purchaseOrderNo', headerName: 'Purchase Order No', width: 200 },
    { field: 'date', headerName: 'Date', width: 150 },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
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
      },
    },
  ];

  return (
    <div>
      <div className="form">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          disableElevation
          onClick={() => setOpen(true)}
        >
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
              className="search-field"
              size="small" // Add custom width here
            />
          )}
        />
      </div>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        density="standard"
      />
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xl">
        <DialogContent>
          <WarehouseOrderForm/>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

export default WarehouseOrders;
