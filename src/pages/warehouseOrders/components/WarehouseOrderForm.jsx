import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField, Button, Box, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { fieldToTextField } from 'formik-material-ui';

const initialValues = {
  warehouseOrder: {
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
  },
};

const WarehouseOrderForm = () => (
  <div>
    <h1>Warehouse Order Form</h1>
    <h3>Warehouse Order header</h3>

    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Field
                name="warehouseOrder.documentNo"
                label="Document No"
                component={TextField}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={3}>
              <Field name="warehouseOrder.date" label="Date" component={TextField} fullWidth
              size="small" />
            </Grid>
            <Grid item xs={3}>
              <Field name="warehouseOrder.customer_id" label="Customer_id" component={TextField} fullWidth
              size="small" />
            </Grid>
            <Grid item xs={3}>
              <Field name="warehouseOrder.customer_address" label="Customer Adress" component={TextField} fullWidth
              size="small" />
            </Grid>
            <Grid item xs={3}>
              <Field
                name="warehouseOrder.purchaseOrderNo"
                label="Purchase Order No"
                component={TextField}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={3}>
              <Field
                name="warehouseOrder.deliveryDate"
                label="Delivery Date"
                component={TextField}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>

          <h3>Warehouse Order Items</h3>
          <FieldArray name="warehouseOrder.items" >
            {({ push, remove }) => (
              <>
                {values.warehouseOrder.items.map((_, index) => (
                  <Box key={index}>
                    <Box display="flex">
                      <Box marginBottom={2} marginRight={2}>
                        <Field
                          name={`warehouseOrder.items.${index}.position`}
                          label="Position"
                          type="number"
                          component={TextField}
                          fullWidth
                          size="small"
                        />
                      </Box>
                      <Box marginBottom={2} marginRight={2}>
                        <Field
                          name={`warehouseOrder.items.${index}.itemNo`}
                          label="Item No"
                          type="number"
                          component={TextField}
                          fullWidth
                          size="small"
                        />
                      </Box>
                      <Box marginBottom={2} marginRight={2}>
                        <Field
                          name={`warehouseOrder.items.${index}.description`}
                          label="Description"
                          component={TextField}
                          fullWidth
                          size="small"
                        />
                      </Box>
                      <Box marginBottom={2} marginRight={2}>
                        <Field
                          name={`warehouseOrder.items.${index}.supplierItemNo`}
                          label="Supplier Item No"
                          component={TextField}
                          fullWidth
                          size="small"
                        />
                      </Box>
                      <Box marginBottom={2} marginRight={2}>
                        <Field
                          name={`warehouseOrder.items.${index}.quantity`}
                          label="Quantity"
                          type="number"
                          component={TextField}
                          fullWidth
                          size="small"
                          />
                        </Box>
  
                        <Button variant="contained" onClick={() => remove(index)} style={{marginBottom: "1rem"}}>
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  ))}
                  <Button variant="contained" onClick={() => push(initialValues.warehouseOrder.items[0])} style={{margin: "0.5rem 1rem 0.5rem 0"}} >
                    Add Item
                  </Button>
                </>
              )}
            </FieldArray>
  
            <Button variant="contained" type="submit" style={{margin: "0.5rem 1rem 0.5rem 0"}}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
  
  export default WarehouseOrderForm;
  