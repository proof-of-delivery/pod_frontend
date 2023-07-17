import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PickupOrderCard = ({ order }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          PUO NO: {order.pickupOrderNo}
        </Typography>
        <Typography variant="body1">
          <b>Customer ID:</b> {order.customerId}
        </Typography>
        <Typography variant="body1">
          <b>Customer Name:</b> {order.customerName}
        </Typography>
        <Typography variant="body1">
          <b>Pickup Date:</b> {order.pickupDate}
        </Typography>
        <Typography variant="body1">
          <b>Status:</b> {order.status}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PickupOrderCard;

