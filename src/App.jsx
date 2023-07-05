import Logo from './assets/logo.svg'
import './App.css'

import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import '@fontsource/poppins';

import WarehouseOrders from './pages/WarehouseOrders/warehouseOrders';
import PickupOrder from './pages/pickupOrder/PickupOrder';

function App() {

  const theme = createTheme({
    palette: {
      primary:{
        main: "#112355"
      }
    }
  })

  function MenuButton({ to, children }) {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
      <Button
        component={Link}
        to={to}
        variant={isActive ? 'contained' : 'outlined'}
        disableElevation
        style={{ backgroundColor: isActive ? '#112355' : undefined }}
      >
        {children}
      </Button>
    );
  }  

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="app">
          <div className="header">
            <img src={Logo} alt="logo" />
          </div>
          <div className="main">
            <div className="menu">
              <MenuButton to="/warehouse">Warehouse Order</MenuButton>
              <MenuButton to="/pickup">Pickup Order</MenuButton>
            </div>
            <Routes>
              <Route path="/warehouse" element={<WarehouseOrders/>}/>
              <Route path="/pickup" element={<PickupOrder/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
