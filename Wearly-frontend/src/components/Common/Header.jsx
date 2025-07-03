import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'
import Cart from '../Layout/Cart'

const Header = () => {
  return (
    <header className='border-b border-gray-200'>
      {/* Topbar */}
      <Topbar/>
      {/* Navbar */}
      <Navbar/>
      {/* Cart Drawer */}
      <Cart/>
    </header>
  )
}

export default Header
