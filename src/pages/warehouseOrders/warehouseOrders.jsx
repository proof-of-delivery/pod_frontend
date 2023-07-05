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
  

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'age', headerName: 'Age' },
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
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
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
        checkboxSelection
      />
    </div>
  )
}

export default WarehouseOrders