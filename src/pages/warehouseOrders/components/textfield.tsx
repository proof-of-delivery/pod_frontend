import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const currencies = [ 
  {
    value: 'DEF',
    label: 'Property',
  },
  {
    value: 'TES',
    label: 'Test1',
  },
  {
    value: 'TESS',
    label: 'Test2',
  },
  {
    value: 'TESSS',
    label: 'Test3',
  },
  
];

const  SelectTextFields = () =>{
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Attribute"
          defaultValue="DEF"
          style={{justifyContent: 'start'}}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}
export default SelectTextFields;