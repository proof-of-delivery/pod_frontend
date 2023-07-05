import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const FormPropsTextFields = () => {
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
          id="outlined-read-only-input"
          label="Search"
          defaultValue="Name, email, etc..."
          InputProps={{
            readOnly: false,
          }}
        />
        </div>
    </Box>
  );
}
export default FormPropsTextFields;