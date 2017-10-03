import React from 'react';
import { NavLink } from 'react-router-dom';

// export const Header = props => {
export const Header = () => {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <ul className="nav navbar-nav">
            <li>
              <NavLink to={'/'} activeStyle={{ color: 'red' }}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={'/login'} activeClassName={'active'}>
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
