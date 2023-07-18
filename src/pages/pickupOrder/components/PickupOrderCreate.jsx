import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Button, Grid, Checkbox, Typography, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, TextField, List, ListItem, ListItemText } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { mockCustomers, mockWarehouseOrders } from '../../warehouseOrders/data';

const PickupOrderCreate = () => {
  const [customer, setCustomer] = useState('');
  const [warehouseOrder, setWarehouseOrder] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [pickupData, setPickupData] = useState({
    name: '',
    address: '',
    pickupDate: '',
    pickupTime: '',
  });

  const handleChangeCustomer = (event) => {
    const selectedCustomer = event.target.value;
    setCustomer(selectedCustomer);
    setWarehouseOrder('');
    setSelectedRows([]);
    setCartItems([]);
  };

  const handleChangeWarehouseOrder = (event) => {
    const selectedOrder = event.target.value;
    setWarehouseOrder(selectedOrder);
  };

  const handleAddToCart = () => {
    const itemsToAdd = selectedRows.map((rowId) => {
      const row = rows.find((row) => row.id === rowId);
      return {
        id: uuidv4(),
        itemId: row.itemId,
        itemDescription: row.itemDescription,
        unit: row.unit,
        quantity: row.quantity,
      };
    });
    setCartItems((prevCartItems) => [...prevCartItems, ...itemsToAdd]);
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== itemId));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPickupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreatePickupOrder = () => {
    const pickupOrderData = {
      ...pickupData,
      items: cartItems.map((item) => ({
        itemId: item.itemId,
        itemDescription: item.itemDescription,
        unit: item.unit,
        quantity: item.quantity,
      })),
    };

    // Logic to create the pickup order with the pickupOrderData
    console.log('Create Pickup Order:', pickupOrderData);

    // Reset the form and cart items
    setPickupData({
      name: '',
      address: '',
      pickupDate: '',
      pickupTime: '',
    });
    setCartItems([]);
    setOpenDialog(false);
  };

  const filteredWarehouseOrders = mockWarehouseOrders.filter((order) => order.customerId === customer);

  const columns = [
    { field: 'itemId', headerName: 'Item ID', width: 150 },
    { field: 'itemDescription', headerName: 'Item Description', width: 250 },
    { field: 'unit', headerName: 'Unit', width: 120 },
    { field: 'quantity', headerName: 'Quantity', width: 120 },
  ];

  const rows = warehouseOrder
    ? mockWarehouseOrders.find((order) => order.orderNo === warehouseOrder).items.map((item, index) => ({
        id: index + 1,
        ...item,
      }))
    : [];

  const isAddToCartDisabled = selectedRows.length === 0;

  useEffect(() => {
    // Update the cart items when the warehouse order changes
    setCartItems(cartItems);
  }, [warehouseOrder]);

  return (
    <div style={{ display: 'flex', padding: '0' }}>
      <div style={{ flex: '1', marginRight: '16px' }}>
        <h2>Create Pickup Order</h2>
        <FormControl style={{ marginBottom: '16px', minWidth: '200px' }}>
          <InputLabel id="select-customer-label">Customer</InputLabel>
          <Select
            labelId="select-customer-label"
            value={customer}
            onChange={handleChangeCustomer}
            label="Customer"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {mockCustomers.map((customer) => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ marginBottom: '16px', minWidth: '200px' }}>
          <InputLabel id="select-warehouse-order-label">Warehouse Order</InputLabel>
          <Select
            labelId="select-warehouse-order-label"
            value={warehouseOrder}
            onChange={handleChangeWarehouseOrder}
            label="Warehouse Order"
            disabled={!customer}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {filteredWarehouseOrders.map((order) => (
              <MenuItem key={order.orderNo} value={order.orderNo}>
                {order.orderNo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {warehouseOrder && (
          <div style={{ display: 'flex' }}>
            <div style={{ height: '60vh', width: '100%', flex: '1', marginRight: '3rem' }}>
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

            <div style={{ flex: '1' }}>
              <Card style={{ height: '60vh' }}>
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
                    Create Pickup Order
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create Pickup Order</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="name"
              label="Name"
              value={pickupData.name}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="address"
              label="Address"
              value={pickupData.address}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="pickupDate"
              label="Pickup Date"
              type="date"
              value={pickupData.pickupDate}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              name="pickupTime"
              label="Pickup Time"
              type="time"
              value={pickupData.pickupTime}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
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
          <Button onClick={handleCreatePickupOrder} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PickupOrderCreate;
