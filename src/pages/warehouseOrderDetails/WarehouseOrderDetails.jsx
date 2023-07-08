import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import './style.css'

function WarehouseOrderDetails({ selectedRow }) {
  const fields = [
    { label: 'Purchase Order ID:', value: selectedRow.purchaseOrderNo },
    { label: 'Customer ID:', value: selectedRow.customerId },
    { label: 'Document No:', value: selectedRow.documentNo },
    { label: 'Date:', value: selectedRow.date },
    { label: 'Status:', value: selectedRow.status },
  ];

  return (
    <>
        <div className="wh-header">
        {fields.map((field) => (
            <h6 key={field.label}>
            <span style={{color: '#676767', fontSize: 16, fontWeight: '500'}}>{field.label} </span>
            <span style={{color: '#2C2C2C', fontSize: 16, fontWeight: '700'}}>{field.value}</span>     
            </h6>
        ))}
        </div>
        <hr/>
        
    </>
  )
}

export default WarehouseOrderDetails
