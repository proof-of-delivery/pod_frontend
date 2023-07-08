import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Box, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const initialValues = {
    customer_id : '',
    customer_address: '',
    documentNo: '',
    date: '',
    purchaseOrderNo: '',
    deliveryDate: '',
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
  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
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
            <TextField name="customer_id" label="Customer_id" fullWidth size="small" value={formik.values.customer_id} onChange={formik.handleChange} />
          </Grid>
          <Grid item xs={3}>
            <TextField name="customer_address" label="Customer Adress" fullWidth size="small" value={formik.values.customer_address} onChange={formik.handleChange} />
          </Grid>
          <Grid item xs={3}>
            <TextField name="documentNo" label="Document No" fullWidth size="small" value={formik.values.documentNo} onChange={formik.handleChange} />
          </Grid>
          <Grid item xs={3}>
            <TextField name="date" label="Date" fullWidth size="small" value={formik.values.date} onChange={formik.handleChange} />
          </Grid>
          <Grid item xs={3}>
            <TextField name="purchaseOrderNo" label="Purchase Order No" fullWidth size="small" value={formik.values.purchaseOrderNo} onChange={formik.handleChange} />
          </Grid>
          <Grid item xs={3}>
            <TextField name="deliveryDate" label="Delivery Date" fullWidth size="small" value={formik.values.deliveryDate} onChange={formik.handleChange} />
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

