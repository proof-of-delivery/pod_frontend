import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { mockWarehouseOrders } from '../data';
import { Grid, Typography } from '@mui/material';

const WarehouseOrderItems = () => {
  const { orderNo } = useParams();
  const order = mockWarehouseOrders.find((order) => order.orderNo === orderNo);

  const [rows, setRows] = useState(() =>
    order.items.map((item) => ({
      id: item.position,
      position: item.position,
      so: item.so,
      itemNumber: item.itemNumber,
      itemDescription: item.itemDescription,
      unit: item.unit,
      quantity: Number(item.quantity),
      requestQuantity: Number(item.requestQuantity),
      confirmedQuantity: Number(item.confirmedQuantity),
      totalRequestedQuantity: Number(item.totalRequestedQuantity),
      totalConfirmedQuantity: Number(item.totalConfirmedQuantity),
      pickedUpQuantity: item.pickedUpQuantity,
      quantityOnHand: item.quantityOnHand,
      quantityReserved: item.quantityReserved,
      quantityBackordered: item.quantityBackordered,
      backorderQuantityReceived: item.backorderQuantityReceived,
    }))
  );
  
  const handleEditCellChange = async (params) => {
    alert(await params.row.requestQuantity)
    const { id, field, value } = params;
    let updatedValue = value;
  
    if (field === 'requestQuantity' || field === 'confirmedQuantity') {
      const intValue = parseInt(value, 10);
  
      if (isNaN(intValue) || intValue < 0 || intValue > params.row.quantity) {
        // Invalid value, set it to the current value
        updatedValue = params.value;
      } else {
        updatedValue = intValue;
      }
    }
  
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.position === id) {
          if (field === 'requestQuantity') {
            const requestQuantity = Math.min(updatedValue, row.quantity);
            const totalRequestedQuantity =
              row.totalRequestedQuantity - row.requestQuantity + requestQuantity;
  
            return {
              ...row,
              requestQuantity,
              totalRequestedQuantity,
            };
          }
        }
  
        return row;
      });
  
      return updatedRows;
    });
  };
  
  const columns = [
    { field: 'position', headerName: 'POS', width: 60 },
    { field: 'so', headerName: 'SO', width: 80 },
    { field: 'itemNumber', headerName: 'Item No', width: 80 },
    { field: 'itemDescription', headerName: 'Item Description', width: 180 },
    { field: 'unit', headerName: 'Unit', width: 80 },
    { field: 'quantity', headerName: 'Quantity', width: 90, type: 'number' },
    {
      field: 'requestQuantity',
      headerName: 'Request Qty',
      width: 150,
      editable: true,
      type: 'number',
    },
    {
      field: 'confirmedQuantity',
      headerName: 'Confirmed Qty',
      width: 115,
      editable: true,
      type: 'number',
    },
    { field: 'totalRequestedQuantity', headerName: 'Total Requested Qty', width: 150, type: 'number' },
    { field: 'totalConfirmedQuantity', headerName: 'Total Confirmed Qty', width: 150, type: 'number' },
    { field: 'pickedUpQuantity', headerName: 'Picked Up Qty', width: 115, type: 'number' },
    { field: 'quantityOnHand', headerName: 'Qty on Hand', width: 110, type: 'number' },
    { field: 'quantityReserved', headerName: 'Qty Reserved', width: 110, type: 'number' },
    { field: 'quantityBackordered', headerName: 'Qty Backordered', width: 130, type: 'number' },
    {
      field: 'backorderQuantityReceived',
      headerName: 'Backorder Qty Received',
      width: 200,
      type: 'number',
    },
  ];

  return (
    <>
      <div style={{ margin: '1rem 0' }}>
        <Typography variant="h3">Order No: {order.orderNo}</Typography>
        <Grid container spacing={2} style={{ marginTop: '1rem' }}>
          <Grid item xs={3}>
            <Typography variant="body1">
              <b>Customer ID:</b> {order.customerId}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">
              <b>Assistance ID:</b> {order.assistanceId}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">
              <b>Name of Ship:</b> {order.shipName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">
              <b>Delivery Date:</b> {order.deliveryDate}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">
              <b>Delivery Address:</b> {order.deliveryAddress}
            </Typography>
          </Grid>
        </Grid>
      </div>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={rows}
          pageSize={5}
          autoHeight
          density="standard"
          on={handleEditCellChange}
          slots={{
            Toolbar: GridToolbar,
          }}
          disableColumnMenu
          
        />
      </div>
    </>
  );
};

export default WarehouseOrderItems;
