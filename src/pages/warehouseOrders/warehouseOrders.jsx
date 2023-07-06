import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button, Autocomplete, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import './style.css'

function WarehouseOrders() {
  const fetched_data = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 32 },
    { id: 3, name: 'Charlie', age: 40 },
    { id: 4, name: 'Dave', age: 28 },
    { id: 5, name: 'Eve', age: 35 },
    { id: 6, name: 'Frank', age: 45 },
  ];

  const [data, setData] = useState(fetched_data)
  
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    if (searchValue === '') {
      setData(fetched_data);
    } else {
      const filteredData = fetched_data.filter((row) => row.name.toLowerCase().includes(searchValue.toLowerCase()));
      setData(filteredData);
    }
  }

  const columns = [
    { field: 'id', headerName: 'Id', width:80},
    { field: 'documentNo', headerName: 'Document No', width:200 },
    { field: 'date', headerName: 'Date', width:150 },
    { field: 'status', headerName: 'Status', width:150 },
    { field: 'customerId', headerName: 'Customer id', width:160 },
    { field: 'purchaseOrderNo', headerName: 'Purchase Order No', width:200 },
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
          options={data.map((option) => option.name)}
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
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        density='standard'
      />
    </div>
  )
}

export default WarehouseOrders
