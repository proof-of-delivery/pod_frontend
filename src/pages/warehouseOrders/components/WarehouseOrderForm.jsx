import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Box, Grid } from '@mui/material';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { WarehouseOrderService, ItemService } from '../../../services/apiService';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';


const initialValues = {
    customer_id : '',
    customer_address: '',
    documentNo: '',
    date: null,
    purchaseOrderNo: '',
    deliveryDate: null,
    items: [
      {
        position: 0,
        itemNo: 0,
        description: '',
        supplierItemNo: '',
        quantity: 0,
      },
    ],
};

const WarehouseOrderForm = () => {
  
  const warehouseOrderService = new WarehouseOrderService();
  const itemService = new ItemService();

  const formik = useFormik({
  initialValues,
  onSubmit: async (values) => {
    console.log(values)
    // Create the warehouse order
    console.log(values.items)
    try {
      const response = await warehouseOrderService.createWarehouseOrder({
        customer_id: values.customer_id,
        customer_address: values.customer_address,
        doc_no: values.documentNo,
        date: values.date,
        purchase_order_no: values.purchaseOrderNo,
        deliveryDate: values.deliveryDate
      });

      if (response.status === 201) {
        // Success
        console.log('Warehouse order created successfully');

        // Create the items
        const warehouseOrderId = response.data.id;
        for (const item of values.items) {
          try {
            const itemResponse = await itemService.createItem({
              position: item.position,
              item_no: item.itemNo,
              description: item.description,
              supplier_item_id: item.supplierItemNo,
              quantity: item.quantity,
              warehouse_order_id: warehouseOrderId
            });

            if (itemResponse.status === 201) {
              // Success
              console.log('Item created successfully');
            } else {
              // Error
              console.log('An error occurred while creating the item');
            }
          } catch (error) {
            // Network error
            console.log(error);
          }
        }
      } else {
        // Error
        console.log('An error occurred while creating the warehouse order');
      }
    } catch (error) {
      // Network error
      console.log(error);
    }
    
  }
});


  const handleAddItem = () => {
    formik.setFieldValue('items', [...formik.values.items, ...initialValues.items]);
  };

  const handleRemoveItem = index => {
    const newItems = [...formik.values.items];
    newItems.splice(index, 1);
    formik.setFieldValue('items', newItems);
  };

  return (
    <div>
      <h1>Warehouse Order Form</h1>
      <h3>Warehouse Order header</h3>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField name="customer_id" label="Customer_id" fullWidth  value={formik.values.customer_id} onChange={formik.handleChange} />
          </Grid>
          <Grid item xs={3}>
            <TextField name="customer_address" label="Customer Adress" fullWidth  value={formik.values.customer_address} onChange={formik.handleChange} />
          </Grid>
          <Grid item xs={3}>
            <TextField name="documentNo" label="Document No" fullWidth  value={formik.values.documentNo} onChange={formik.handleChange} />
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}> 
              <DatePicker name="date" label="Date" fullWidth value={formik.values.date} onChange={value => {formik.setFieldValue("date", value ? dayjs(value).format("YYYY-MM-DD") : ""); }}/> 
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3}>
            <TextField name="purchaseOrderNo" label="Purchase Order No" fullWidth  value={formik.values.purchaseOrderNo} onChange={formik.handleChange} />
          </Grid>
          <Grid item xs={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker name="deliveryDate" label="Delivery Date" fullWidth value={formik.values.deliveryDate} onChange={value => {formik.setFieldValue("deliveryDate", value ? dayjs(value).format("YYYY-MM-DD") : ""); }} />
          </LocalizationProvider>
          </Grid>
        </Grid>

        <h3>Warehouse Order Items</h3>
        {formik.values.items.map((_, index) => (
          <Box key={index}>
            <Box display="flex">
              <Box marginBottom={2} marginRight={2}>
                <TextField
                  name={`items.${index}.position`}
                  label="Position"
                  type="number"
                  fullWidth
                  size="small"
                  value={formik.values.items[index].position}
                  onChange={formik.handleChange}
                />
              </Box>
              <Box marginBottom={2} marginRight={2}>
                <TextField
                  name={`items.${index}.itemNo`}
                  label="Item No"
                  type="number"
                  fullWidth
                  size="small"
                  value={formik.values.items[index].itemNo}
                  onChange={formik.handleChange}
                />
              </Box>
              <Box marginBottom={2} marginRight={2}>
                <TextField
                  name={`items.${index}.description`}
                  label="Description"
                  fullWidth
                  size="small"
                  value={formik.values.items[index].description}
                  onChange={formik.handleChange}
                />
              </Box>
              <Box marginBottom={2} marginRight={2}>
                <TextField
                  name={`items.${index}.supplierItemNo`}
                  label="Supplier Item No"
                  fullWidth
                  size="small"
                  value={formik.values.items[index].supplierItemNo}
                  onChange={formik.handleChange}
                />
              </Box>
              <Box marginBottom={2} marginRight={2}>
                <TextField
                  name={`items.${index}.quantity`}
                  label="Quantity"
                  type="number"
                  fullWidth
                  size="small"
                  value={formik.values.items[index].quantity}
                  onChange={formik.handleChange}
                />
              </Box>

              <Button variant="contained" onClick={() => handleRemoveItem(index)} style={{marginBottom: "1rem"}}>
                Remove
              </Button>
            </Box>
          </Box>
        ))}
        <Button variant="contained" onClick={handleAddItem} style={{margin: "0.5rem 1rem 0.5rem 0"}} >
          Add Item
        </Button>

        <Button variant="contained" type="submit" style={{margin: "0.5rem 1rem 0.5rem 0"}}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default WarehouseOrderForm;

