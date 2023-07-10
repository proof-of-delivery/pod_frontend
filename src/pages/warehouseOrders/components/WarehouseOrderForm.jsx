import React, { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Box, Grid } from '@mui/material';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { WarehouseOrderService, ItemService } from '../../../services/apiService';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import FirebaseService from '../../../services/firebaseService';
import { query, where, getDocs, collection } from 'firebase/firestore';
import db from '../../../../firebase.js';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

const initialValues = {
    purchaseOrderNo: '',
    nameOfShip:'',
    deliveryDate: null,
    deliveryAddress: '',
    weightPackage: '',
    documentNo: '',
    date: null,
    customer_id : '',
    customer_address: '',
    email: '',
    assistance:'',
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

  const [itemData, setItemData] = useState({});

  const formik = useFormik({
    initialValues,
    onSubmit: async values => {
      console.log(values);
      // Create the warehouse order
      console.log(values.items);
      try {
        const response = await warehouseOrderService.createWarehouseOrder({
          purchase_order_no: values.purchaseOrderNo,
          name_of_ship: values.nameOfShip,
          delivery_date: values.deliveryDate,
          delivery_address: values.deliveryAddress,
          weight_package: values.weightPackage,
          doc_no: values.documentNo,
          date: values.date,
          customer_id: values.customer_id,
          customer_address: values.customer_address,
          email: values.email,
          assistance: values.assistance
        });
  
        if (response.status === 201) {
          // Success
          console.log("Warehouse order created successfully");
  
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
                console.log("Item created successfully");
              } else {
                // Error
                console.log("An error occurred while creating the item");
              }
            } catch (error) {
              // Network error
              console.log(error);
            }
          }
        } else {
          // Error
          console.log("An error occurred while creating the warehouse order");
        }
      } catch (error) {
        // Network error
        console.log(error);
      }
    }
  });
  

  const handleItemNoChange = async (event, index) => {
    // Update the formik value for the itemNo field
    formik.setFieldValue(`items.${index}.itemNo`, event.target.value);

    // Get the entered item number
    const itemNo = event.target.value;
    console.log(itemNo)

    // Query Cloud Firestore for inventory items with a matching item_no attribute
    const inventoryRef = collection(db, 'inventory_items');
    const q = query(inventoryRef, where('item_no', '==', itemNo));
    const snapshot = await getDocs(q);
    
    console.log(snapshot)
    if (!snapshot.empty) {
      const item = snapshot.docs[0].data();
      // If an item with a matching item_no attribute exists, update the itemData state with its data
      setItemData((prevState) => ({
        ...prevState,
        [index]: {
          quantityReserved: item.quantity_reserved,
          quantityOnHand: item.quantity_on_hand,
          quantityFree: item.quantity_free,
        },
      }));
    } else {
      // If no item with a matching item_no attribute exists, update the itemData state with zero values
      setItemData((prevState) => ({
        ...prevState,
        [index]: {
          quantityReserved: 0,
          quantityOnHand: 0,
          quantityFree: 0,
        },
      }));
    }
  };

  

  const handleAddItem = () => {
    formik.setFieldValue('items', [...formik.values.items, ...initialValues.items]);
  };

  const handleRemoveItem = index => {
    const newItems = [...formik.values.items];
    newItems.splice(index, 1);
    formik.setFieldValue('items', newItems);
  };

  const fields = [
    { name: "customer_id", label: "Customer_id", xs: 2, component: TextField },
    { name: "customer_address", label: "Customer Address", xs: 2, component: TextField },
    { name: "documentNo", label: "Document No", xs: 3, component: TextField },
    { name: "purchaseOrderNo", label: "Purchase Order No", xs: 3, component: TextField },
    {
      name: "date",
      label: "Date",
      xs: 3,
      component: DatePicker,
      onChange: value => {
        formik.setFieldValue("date", value ? dayjs(value).format("YYYY-MM-DD") : "");
      }
    },
    {
      name: "deliveryDate",
      label: "Delivery Date",
      xs: 3,
      component: DatePicker,
      onChange: value => {
        formik.setFieldValue("deliveryDate", value ? dayjs(value).format("YYYY-MM-DD") : "");
      }
    }
  ];
  

  return (
    <div>
      <h1>Warehouse Order Form</h1>
      <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} justifyContent="start" gap={10}>
        <Grid item xs={5}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField name="purchaseOrderNo" label="Purchase Order No" fullWidth size="small"  value={formik.values.purchaseOrderNo} onChange={formik.handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField name="nameOfShip" label="Name Of Ship" fullWidth size="small"  value={formik.values.nameOfShip} onChange={formik.handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField name="deliveryAddress" label="Delivery Address" fullWidth size="small"  value={formik.values.deliveryAddress} onChange={formik.handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField name="weightPackage" label="Weight/Package" fullWidth size="small"  value={formik.values.weightPackage} onChange={formik.handleChange} />
            </Grid>
            <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker name="deliveryDate" label="Delivery Date" fullWidth size="small" value={formik.values.deliveryDate} onChange={value => {formik.setFieldValue("deliveryDate", value ? dayjs(value).format("YYYY-MM-DD") : ""); }} />
            </LocalizationProvider>
            </Grid>
          </Grid> 
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={2} >
            <Grid item xs={4}>
              <TextField name="customer_id" label="Customer ID" fullWidth size="small"  value={formik.values.customer_id} onChange={formik.handleChange} />
            </Grid>
            <Grid item xs={8}>
              <TextField name="customer_address" label="Customer Address" fullWidth size="small"  value={formik.values.customer_address} onChange={formik.handleChange} />
            </Grid>
            <Grid item xs={5}>
              <TextField name="documentNo" label="Document No" fullWidth size="small"  value={formik.values.documentNo} onChange={formik.handleChange} />
            </Grid>
            <Grid item xs={7}>
              <TextField name="purchaseOrderNo" label="Purchase Order No" fullWidth size="small"  value={formik.values.purchaseOrderNo} onChange={formik.handleChange} />
            </Grid>

            <Grid item xs={12}>
              <TextField name="email" label="Email" type='email' fullWidth size="small"  value={formik.values.email} onChange={formik.handleChange} />
            </Grid>
            
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}> 
                <DatePicker name="date" label="Date" fullWidth value={formik.values.date} onChange={value => {formik.setFieldValue("date", value ? dayjs(value).format("YYYY-MM-DD") : ""); }}/> 
              </LocalizationProvider>
            </Grid>
            
          </Grid> 
        </Grid>
      </Grid>

        
        <Button variant='outlined' color='success' startIcon={<AddIcon/>} onClick={handleAddItem} style={{margin: "1rem 0"}}  disableElevation>
              Add Item
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Position</TableCell>
                <TableCell>Item No</TableCell>
                <TableCell>Description</TableCell>
                {/* <TableCell>Supplier Item No</TableCell> */}
                <TableCell>Quantity</TableCell>
                <TableCell>Quantity Free</TableCell>
                <TableCell>Quantity Reserved</TableCell>
                <TableCell>Quantity On Hand</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formik.values.items.map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      name={`items.${index}.position`}
                      type="number"
                      fullWidth
                      size="small"
                      value={formik.values.items[index].position}
                      onChange={formik.handleChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`items.${index}.itemNo`}
                      type="number"
                      fullWidth
                      size="small"
                      value={formik.values.items[index].itemNo}
                      onChange={(event) => handleItemNoChange(event, index)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`items.${index}.description`}
                      fullWidth
                      size="small"
                      value={formik.values.items[index].description}
                      onChange={formik.handleChange}
                    />
                  </TableCell>
                  {/* <TableCell>
                    <TextField
                      name={`items.${index}.supplierItemNo`}
                      fullWidth
                      size="small"
                      value={formik.values.items[index].supplierItemNo}
                      onChange={formik.handleChange}
                    />
                  </TableCell> */}
                  <TableCell>
                    <TextField
                      name={`items.${index}.quantity`}
                      type="number"
                      fullWidth
                      size="small"
                      value={formik.values.items[index].quantity}
                      onChange={formik.handleChange}
                    />
                  </TableCell>
                  <TableCell>{itemData[index] ? (<p style={{color:"green"}}>{itemData[index]?.quantityFree}</p>) : "-"}</TableCell>
                  <TableCell>{itemData[index] ? (<p style={{color:"red"}}>{itemData[index]?.quantityReserved}</p>) : "-"}</TableCell>
                  <TableCell>{itemData[index] ? (<p style={{}}>{itemData[index]?.quantityOnHand}</p>) : "-"}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleRemoveItem(index)} disableElevation>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        
        <Button variant="contained" type="submit" color='success' style={{margin: "1rem 1rem 0.5rem 0"}} disableElevation>
          Confirm
        </Button>
      </form>
    </div>
  );
};

export default WarehouseOrderForm;

