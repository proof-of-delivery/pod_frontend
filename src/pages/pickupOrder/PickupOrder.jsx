import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import PickupOrderCard from './components/PickupOrderCard';
import { mockCustomers, mockPickupOrders } from '../warehouseOrders/data';

const PickupOrders = () => {
  const [customer, setCustomer] = useState('');

  const handleChange = (event) => {
    setCustomer(event.target.value);
  };

  const filteredPickupOrders = customer
    ? mockPickupOrders.filter((order) => order.customerId === customer)
    : mockPickupOrders;

  return (
    <div style={{ padding: '0' }}>
      <h2>Pickup Orders</h2>
      <FormControl sx={{ my: 1, minWidth: 200 }}>
        <InputLabel id="select-customer-label">Customer</InputLabel>
        <Select
          labelId="select-customer-label"
          value={customer}
          onChange={handleChange}
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
      <Grid container spacing={2}>
        {filteredPickupOrders.map((order) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={order.pickupOrderNo}>
            <Link to={`/pickuporders/${order.pickupOrderNo}/items`} style={{ textDecoration: 'none' }}>
              <PickupOrderCard order={order} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PickupOrders;
