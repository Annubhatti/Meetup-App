import React from 'react'
import logo from "../images/logo.png";

function Header() {
  return (
    <div>
      <header>
        <nav className='navbar bg-body-tertiary'>
          <div className='container'>
            <div className='navbar-brand'>
              <img src={logo} alt="logo" width="100" height="auto"
            
               />
            </div>
            <div className='float-end'>
              <input type="search" placeholder='⌕ Search by title and t...' />
            </div>
          </div>
        </nav>
      </header>
      <hr />
    </div>
  )
}

export default Header
