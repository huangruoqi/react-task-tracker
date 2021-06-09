import React from 'react'
import Button from './Button'

const Header = ({ title, toggleAdd, showAdd }) => {
  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button color={!showAdd ? 'green' : 'red'} text={!showAdd ? 'Add' : 'Close'} onClick={toggleAdd} />

    </header>
  )
}

export default Header

