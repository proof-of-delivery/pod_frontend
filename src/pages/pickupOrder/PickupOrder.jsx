import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import App from '../../App'
import { Stack } from '@mui/material';
import WarehouseOrder from '../warehouseOrders/warehouseOrders.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function PickupOrder(props) {
const handleOverlayClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div>
      <BootstrapDialog
        maxWidth='lg'
        aria-labelledby="customized-dialog-title"
        open={handleOverlayClick}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClick={props.onClose}>
          <strong>Pickup Order</strong>
        </BootstrapDialogTitle>

        <DialogContent >
          <Stack direction='row' spacing={2} sx={{paddingLeft: 10}}>
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <TextField id="standard-basic" label="Standard" variant="standard" />

          </Stack>

          
          <WarehouseOrder/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.onClose} style={{backgroundColor: 'green', color: 'white', fontSize: 12}} >
            CREATE
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
