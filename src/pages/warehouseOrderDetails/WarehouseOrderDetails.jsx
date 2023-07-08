import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import './style.css'

function WarehouseOrderDetails({ selectedRow, data }) {
    // console.log(selectedRow.items[0])
  const fields = [
    { label: 'Purchase Order ID:', value: selectedRow.purchaseOrderNo },
    { label: 'Customer ID:', value: selectedRow.customerId },
    { label: 'Document No:', value: selectedRow.documentNo },
    { label: 'Date:', value: selectedRow.date },
    { label: 'Status:', value: selectedRow.status },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'position', headerName: 'Position', width: 120 },
    { field: 'item_no', headerName: 'Item No', width: 120 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'supplier_item_id', headerName: 'Supplier Item No', width: 200 },
    { field: 'quantity', headerName: 'Quantity', width: 120 },
    { field: 'inventory_quantity', headerName: 'Inventory Quantity', width: 150 },
    
  ];

  const items = [
    {
      id: 1,
      position: 1,
      itemNo: 'I001',
      description: 'Item 1',
      supplierItemNo: 'S001',
      quantity: 10,
    },
    {
      id: 2,
      position: 2,
      itemNo: 'I002',
      description: 'Item 2',
      supplierItemNo: 'S002',
      quantity: 20,
    },
  ]
  return (
    <div>
      <Button variant='outlined' style={{margin: "0 1rem 0 0"}}>Check Inventory</Button>
      <Button variant='outlined'>Unreserve</Button>
      <div className="wh-header">
        {fields.map((field) => (
          <h6 key={field.label}>
            <span style={{color: '#676767', fontSize: 16, fontWeight: '500'}}>{field.label} </span>
            <span style={{color: '#2C2C2C', fontSize: 16, fontWeight: '700'}}>{field.value}</span>     
          </h6>
        ))}
      </div>
      <DataGrid rows={selectedRow.items} columns={columns} initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        density='standard'/>

    <Button variant='contained' color="success" disableElevation style={{margin: "1rem 1rem 0 0"}} disabled={selectedRow.status === 'completed' || selectedRow.status === 'cancelled'}>Confirm</Button> 
    <Button variant='contained' color='error' disableElevation style={{margin: "1rem 1rem 0 0"}} disabled={selectedRow.status === 'completed' || selectedRow.status === 'cancelled'}>Cancel</Button>

    </div>
  )
}

export default WarehouseOrderDetails
