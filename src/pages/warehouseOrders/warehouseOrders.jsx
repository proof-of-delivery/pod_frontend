// WarehouseOrders.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Select, InputLabel, MenuItem, FormControl, Grid } from '@mui/material';
import WarehouseOrderCard from './components/WarehouseOrderCard';
import { mockCustomers, mockWarehouseOrders } from './data';

const WarehouseOrders = () => {
  const [customer, setCustomer] = useState('');

  const handleChange = (event) => {
    setCustomer(event.target.value);
  };

  const filteredWarehouseOrders = mockWarehouseOrders.filter((order) => order.customerId === customer);

  return (
    <div style={{ padding: '0' }}>
      <h3>Warehouse Orders</h3>
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
        {filteredWarehouseOrders.map((order) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={order.orderNo}>
            <Link to={`/warehouseorders/${order.orderNo}/items`} style={{ textDecoration: 'none' }}>
              <WarehouseOrderCard order={order} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WarehouseOrders;
