import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const WarehouseOrderCard = ({ order }) => {
  const { orderNo, customerId, assistanceId, shipName, deliveryDate, deliveryAddress, items } = order;

  const confirmedItems = items.filter((item) => Number(item.confirmedQuantity) > 0);
  const totalQuantity = items.reduce((total, item) => total + Number(item.quantity), 0);
  const totalRequestedQuantity = items.reduce((total, item) => total + Number(item.requestQuantity), 0);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={'bold'}>Order No: {orderNo}</Typography>
        <Typography variant="body1">Delivery Date: {deliveryDate}</Typography>
        <Typography variant="body1">Total Requested Quantity: {totalRequestedQuantity}</Typography>
        <Typography variant="body1">Confirmed Quantity: {confirmedItems.length}</Typography>
        <Typography variant="body1">Total Quantity: {totalQuantity}</Typography>
      </CardContent>
    </Card>
  );
};

export default WarehouseOrderCard;
