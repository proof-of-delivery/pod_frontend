import Logo from './assets/logo.svg'
import './App.css'

import {useEffect} from 'react';
import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, Link, useLocation} from 'react-router-dom';
import '@fontsource/poppins';

import WarehouseOrders from './pages/warehouseOrders/warehouseOrders.jsx';
import PickupOrder from './pages/pickupOrder/PickupOrder.jsx';
import MenuButton from './components/MenuButton';

function App() {
  
  const theme = createTheme({
    palette: {
      primary:{
        main: "#112355"
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="app">
          <div className="header">
            <img src={Logo} alt="logo" />
          </div>
          <div className="main">
            <div className="menu">
              <MenuButton to="/">Warehouse Order</MenuButton>
              <MenuButton to="/pickup">Pickup Order</MenuButton>
            </div>
            <Routes>
              <Route path="/" element={<WarehouseOrders/>}/>
              <Route path="/pickup" element={<PickupOrder/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
