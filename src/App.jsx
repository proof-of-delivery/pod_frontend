import Logo from './assets/logo.svg'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate} from 'react-router-dom';
import '@fontsource/poppins';

import WarehouseOrders from './pages/warehouseOrders/warehouseOrders.jsx';
import PickupOrder from './pages/pickupOrder/PickupOrder.jsx';
import MenuButton from './components/MenuButton';
import WarehouseOrderForm from './pages/warehouseOrders/components/WarehouseOrderForm'; 
import { WarehouseOrderService } from './services/apiService'
import WarehouseOrderItems from './pages/warehouseOrders/components/WarehouseOrderItem';
import PickupOrderItems from './pages/pickupOrder/components/PickupOrderItems';
import PickupOrderCreate from './pages/pickupOrder/components/PickupOrderCreate';
function App() {
  const warehouseOrderService = new WarehouseOrderService();

  const theme = createTheme({
    palette: {
      primary:{
        main: "#112355"
      }
    }
  })

  const initialValues = {
    warehouseOrder: {
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
  
  warehouseOrderService.getWarehouseOrders()
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="app">
          <div className="header">
            <img src={Logo} alt="logo" />
          </div>
          <div className="main">
            <div className="menu">
              <MenuButton to="/warehouseorders">Warehouse Order</MenuButton>
              <MenuButton to="/pickuporders">Pickup Order</MenuButton>
            </div>
            <Routes>
              <Route path="/" element={<Navigate to="/warehouseorders" />} />
              <Route path="/warehouseorders" element={<WarehouseOrders/>}/>
              <Route path="/warehouseorders/:orderNo/items" element={<WarehouseOrderItems />} />
              <Route path="/pickuporders/" element={<PickupOrder />} />
              <Route path="/pickuporders/create" element={<PickupOrderCreate />} />
              <Route path="/pickuporders/:pickupOrderId/items" element={<PickupOrderItems />} />
          </Routes>

          </div>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

