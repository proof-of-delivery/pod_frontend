import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { mockPickupOrders } from '../../warehouseOrders/data';

const PickupOrderItems = () => {
  const { pickupOrderNo } = useParams();
  console.log(pickupOrderNo)
  const pickupOrder = mockPickupOrders.find((order) => order.pickupOrderNo === 'PUO002');

  const columns = [
    { field: 'position', headerName: 'Position', width: 100 },
    { field: 'so', headerName: 'SO', width: 150 },
    { field: 'itemNumber', headerName: 'Item Number', width: 150 },
    { field: 'itemDescription', headerName: 'Item Description', width: 250 },
    { field: 'unit', headerName: 'Unit', width: 100 },
    { field: 'quantity', headerName: 'Quantity', width: 120 },
  ];

  const rows = pickupOrder.items.map((item) => ({
    id: item.position,
    position: item.position,
    so: item.so,
    itemNumber: item.itemNumber,
    itemDescription: item.itemDescription,
    unit: item.unit,
    quantity: item.quantity,
  }));

  return (
    <div>
      <div style={{margin: '1rem 0'}}>

      <Typography variant="h4">Pickup Order Items</Typography>
      <Typography variant="h7">Pickup Date and Time: {pickupOrder.pickupTime}</Typography><br/>
      <Typography variant="h7">Status: {pickupOrder.status}</Typography>
      
      </div>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid columns={columns} rows={rows} pageSize={5} autoHeight />
      </div>
    </div>
  );
};

export default PickupOrderItems;
