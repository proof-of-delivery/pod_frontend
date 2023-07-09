import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Button, Autocomplete, TextField, Chip, Dialog, DialogTitle, DialogContent, Skeleton } from '@mui/material';
import { WarehouseOrderService } from '../../services/apiService';
import fdata from './data';
import WarehouseOrderDetails from '../warehouseOrderDetails/WarehouseOrderDetails';
import WarehouseOrderForm from './components/WarehouseOrderForm';
import './style.css';

function WarehouseOrders() {
  const [data, setData] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const warehouseOrderService = new WarehouseOrderService();

  useEffect(() => {
    warehouseOrderService.getWarehouseOrders()
      .then(response => {
        const statuses = ['Cancelled', 'Draft', 'Confirmed'];
        const dataWithStatus = response.data.map(order => ({
          ...order,
          status: statuses[Math.floor(Math.random() * statuses.length)]
        }));
        setData(dataWithStatus);
        setIsLoading(false)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  const handleRowClick = (params) => {
    const selectedOrder = data.find((order) => order.id === params.row.id);
    setSelectedRow(selectedOrder);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

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
    { field: 'id', headerName: 'Id', width:100},
    { field: 'customer_id', headerName: 'Customer id', width:160 },
    { field: 'doc_no', headerName: 'Document No', width:200 },
    { field: 'purchase_order_no', headerName: 'Purchase Order No', width:200 },
    { field: 'date', headerName: 'Date', width:150 },
    { field: 'customer_address', headerName: 'Customer Address', width:200 },
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
          onClick={() => setFormOpen(true)}
        >
          New
        </Button>
        <Autocomplete freeSolo id="search-wh-order" disableClearable options={fdata.map((option) => option.customerId)} renderInput={(params) => (
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
      {isLoading ? (
        <>
          <Skeleton variant="text" height={50} />
          <Skeleton variant="rectangular" height={50} />
          {Array.from(new Array(5)).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={50} />
          ))}
        </>  
      ) : (
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
          density="standard"
        />
      )}

      <Dialog fullWidth maxWidth="xl" open={detailsOpen} onClose={handleDetailsClose}>
        <DialogTitle style={{display: "flex", justifyContent: "space-between"}}>
          <h4 style={{margin: "0.5rem 0 0 0"}}>Warehouse ID: {selectedRow ? selectedRow.id : "Warehouse Id"}</h4>
         
          <IconButton onClick={handleDetailsClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent >
          <WarehouseOrderDetails selectedRow={selectedRow}/>
        </DialogContent>
      </Dialog>

      <Dialog open={formOpen} onClose={() => setFormOpen(false)} fullWidth maxWidth="xl">
        <DialogContent>
          <WarehouseOrderForm/>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WarehouseOrders;
