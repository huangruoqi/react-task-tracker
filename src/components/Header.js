import React from 'react'
import Button from './Button'
import {useLocation} from 'react-router-dom'

const Header = ({ title, toggleAdd, showAdd }) => {
  const location = useLocation();

  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && <Button color={!showAdd ? 'green' : 'red'} text={!showAdd ? 'Add' : 'Close'} onClick={toggleAdd} />}
    </header>
  )
}

export default Header

