import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav style={{ background: '#333', padding: '10px' }}>
      <Link to="/" style={{ color: '#fff', marginRight: '12px' }}>Home</Link>
      <Link to="/about" style={{ color: '#fff', marginRight: '12px' }}>About</Link>
      <Link to="/services" style={{ color: '#fff', marginRight: '12px' }}>Services</Link>
      <Link to="/contact" style={{ color: '#fff' }}>Contact</Link>
    </nav>
  )
}

export default Navbar
