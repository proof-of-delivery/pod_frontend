import { useState } from 'react'
import Logo from './assets/logo.svg'
import './App.css'

function App() {

  return (
    <div className='app'>
      <div className="header">
        <img src={Logo} alt="logo"/>
      </div>
      <div className="main"></div>
      <div className="footer">
        
      </div>
    </div>
  )
}

export default App
