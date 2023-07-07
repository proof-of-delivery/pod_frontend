import Logo from './assets/logo.svg'
import IMG from './assets/image.png'
import './App.css'

import {useEffect} from 'react';
import { Button, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, Link, useLocation} from 'react-router-dom';
import '@fontsource/poppins';
import Stack from '@mui/material/Stack'

import WarehouseOrders from './pages/warehouseOrders/warehouseOrders.jsx';
import PickupOrder from './pages/pickupOrder/PickupOrder.jsx';
import Home from '../src/pages/home';
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
          <div className="main" style={{justifyContent:'center', paddingTop: 300, paddingLeft:500}}>
            
            <Stack direction='row' >
              <img src={IMG} alt="logo" />
              <Stack direction='column'>
                <div style={{paddingLeft: 70,paddingBottom: 20, fontSize:30}}>
                  Sign in
                </div >
                <div style={{paddingLeft:70, paddingBottom:10, fontWeight:'revert'}}>
                  New user? <span style={{color:'blue'}}>Create an account</span>
                </div>
                <TextField fullWidth style={{paddingLeft: 70,paddingBottom: 15, fontSize:30}}
                  id='outlined-multiline-flexible'
                  // multiline
                  maxRows={4}
                />
                <TextField fullWidth style={{paddingLeft: 70, paddingBottom:15, fontSize:30}}
                  id='outlined-multiline-flexible'
                  // multiline
                  maxRows={2}
                />
                <div style={{paddingLeft:70, }}>
                <Button href='/home' fullWidth style={{backgroundColor:'blue', color:'white'}} >SIGN IN</Button>
                </div>
              </Stack>
            </Stack>

            {/* <div className="menu">
              <MenuButton to="/">Warehouse Order</MenuButton>
              <MenuButton to="/pickup">Pickup Order</MenuButton>
            </div> */}
            <Routes>
              <Route path='/home' element={<Home/>}/>
              {/* <Route path="/" element={<WarehouseOrders/>}/>
              <Route path="/pickup" element={<PickupOrder/>}/> */}
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
