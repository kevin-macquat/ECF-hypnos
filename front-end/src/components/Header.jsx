import React from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import Logout from "../features/Logout";

function Header() {


  const token = useSelector((state) => state.user.user.token);
  const user = useSelector((state) => state.user.user);

  return (
    <header id="main-header">
      <nav>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/rooms">rooms</Link>
          </li>
          {user.roles.includes('ROLE_ADMIN') &&
            <li>
              <Link to="/admin">admin</Link>
            </li>
          }
          {token && <li><Logout /></li>}
        </ul>
      </nav>
    </header>
  )

}

export default Header;