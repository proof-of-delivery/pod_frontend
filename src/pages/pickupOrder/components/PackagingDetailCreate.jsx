import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, List, ListItem, ListItemText, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { mockPickupOrders } from '../../warehouseOrders/data';

const PackagingDetailsCreate = () => {
  const { pickupOrderId } = useParams();
  const pickupOrder = mockPickupOrders.find((order) => order.pickupOrderNo === pickupOrderId);

  const [selectedRows, setSelectedRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [packagingData, setPackagingData] = useState({
    packageType: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    cbm: '',
  });
  const [cartItems, setCartItems] = useState([]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPackagingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreatePackagingOrder = () => {
    const packagingOrderData = {
      ...packagingData,
      items: cartItems.map((item) => ({
        pickupOrderItemId: item.id,
        quantity: item.quantity,
        packagingDetailId: uuidv4(),
      })),
    };

    // Logic to create the packaging order with the packagingOrderData
    console.log('Create Packaging Order:', packagingOrderData);

    // Reset the form and cart items
    setPackagingData({
      packageType: '',
      weight: '',
      length: '',
      width: '',
      height: '',
      cbm: '',
    });
    setCartItems([]);
    setOpenDialog(false);
  };

  const handleAddToCart = () => {
    const itemsToAdd = selectedRows.map((rowId) => {
      const row = rows.find((row) => row.id === rowId);
      return {
        id: row.id,
        quantity: row.quantity,
      };
    });
    setCartItems((prevCartItems) => [...prevCartItems, ...itemsToAdd]);
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== itemId));
  };

  const columns = [
    { field: 'itemId', headerName: 'Item ID', width: 150 },
    { field: 'itemDescription', headerName: 'Item Description', width: 250 },
    { field: 'unit', headerName: 'Unit', width: 120 },
    { field: 'quantity', headerName: 'Quantity', width: 120 },
  ];

  const rows = pickupOrder.items.map((item) => ({
    id: item.position,
    itemId: item.itemNumber,
    itemDescription: item.itemDescription,
    unit: item.unit,
    quantity: item.quantity,
  }));

  const isAddToCartDisabled = selectedRows.length === 0;

  return (
    <div style={{ display: 'flex', padding: '0' }}>
      <div style={{ display: 'flex', flex: '1', marginRight: '16px' }}>
        <div style={{ height: '60vh', width: '100%', flex: '1', margin: '0 1rem 1rem 0' }}>
        <h2>Packaging Details Create</h2>
          <DataGrid
            columns={columns}
            rows={rows}
            checkboxSelection
            rowSelectionModel={selectedRows}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setSelectedRows(newRowSelectionModel);
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddToCart}
            disabled={isAddToCartDisabled}
            style={{ marginTop: '16px' }}
          >
            Add to Cart
          </Button>
        </div>

        <Card style={{ height: '60vh', margin: '8vh 0 0 0' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Cart
            </Typography>
            {cartItems.length === 0 ? (
              <Typography variant="body1">Cart is empty</Typography>
            ) : (
              <div style={{ maxHeight: '45vh', overflowY: 'auto' }}>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      marginBottom: '8px',
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  >
                    <Typography variant="body1" gutterBottom>
                      {item.itemId} - {item.itemDescription}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Unit: {item.unit} | Quantity: {item.quantity}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => handleRemoveFromCart(item.id)}
                      style={{ marginTop: '8px' }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <Button
              variant="contained"
              onClick={handleOpenDialog}
              disabled={cartItems.length === 0}
              style={{ marginTop: '16px' }}
            >
              Create Packaging Order
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create Packaging Order</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="packageType"
              label="Package Type"
              value={packagingData.packageType}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="weight"
              label="Weight"
              value={packagingData.weight}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="length"
              label="Length"
              value={packagingData.length}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="width"
              label="Width"
              value={packagingData.width}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="height"
              label="Height"
              value={packagingData.height}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="cbm"
              label="CBM"
              value={packagingData.cbm}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <Typography variant="h6" gutterBottom>
              Items in Cart
            </Typography>
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={`${item.itemId} - ${item.itemDescription}`}
                    secondary={`Unit: ${item.unit} | Quantity: ${item.quantity}`}
                  />
                </ListItem>
              ))}
            </List>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCreatePackagingOrder} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PackagingDetailsCreate;
