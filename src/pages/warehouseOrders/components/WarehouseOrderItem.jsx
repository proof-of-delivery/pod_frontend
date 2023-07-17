// WarehouseOrderItems.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { mockWarehouseOrders } from '../data';

const WarehouseOrderItems = () => {
  const { orderNo } = useParams();
  const order = mockWarehouseOrders.find((order) => order.orderNo === orderNo);

  const columns = [
    { field: 'position', headerName: 'Position', width: 120 },
    { field: 'so', headerName: 'SO', width: 150 },
    { field: 'itemNumber', headerName: 'Item Number', width: 150 },
    { field: 'itemDescription', headerName: 'Item Description', width: 200 },
    { field: 'unit', headerName: 'Unit', width: 100 },
    { field: 'quantity', headerName: 'Quantity', width: 120 },
    { field: 'requestQuantity', headerName: 'Request Quantity', width: 180, editable:true },
    { field: 'confirmedQuantity', headerName: 'Confirmed Quantity', width: 180, editable:true },
    { field: 'totalRequestedQuantity', headerName: 'Total Requested Quantity', width: 220 },
    { field: 'totalConfirmedQuantity', headerName: 'Total Confirmed Quantity', width: 220 },
    { field: 'pickedUpQuantity', headerName: 'Picked Up Quantity', width: 180 },
    { field: 'quantityOnHand', headerName: 'Quantity on Hand', width: 180 },
    { field: 'quantityReserved', headerName: 'Quantity Reserved', width: 180 },
    { field: 'quantityBackordered', headerName: 'Quantity Backordered', width: 200 },
    { field: 'backorderQuantityReceived', headerName: 'Backorder Quantity Received', width: 240 },
    // Add other columns as needed
  ];

  const rows = order.items.map((item) => ({
    id: item.position,
    position: item.position,
    so: item.so,
    itemNumber: item.itemNumber,
    itemDescription: item.itemDescription,
    unit: item.unit,
    quantity: item.quantity,
    requestQuantity: item.requestQuantity,
    confirmedQuantity: item.confirmedQuantity,
    totalRequestedQuantity: item.totalRequestedQuantity,
    totalConfirmedQuantity: item.totalConfirmedQuantity,
    pickedUpQuantity: item.pickedUpQuantity,
    quantityOnHand: item.quantityOnHand,
    quantityReserved: item.quantityReserved,
    quantityBackordered: item.quantityBackordered,
    backorderQuantityReceived: item.backorderQuantityReceived,
    // Add other row data as needed
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={rows}
        pageSize={5}
        autoHeight
        disableColumnMenu
        disableColumnResize={false}
      />
    </div>
  );
};

export default WarehouseOrderItems;
