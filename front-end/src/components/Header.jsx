import React from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import Logout from "../features/Logout";
import h_hypnos_logo from "../images/h_hypnos_logo.png";
import hypnos_name_logo from "../images/hypnos_name_logo.png";

function Header() {


  const hotels = useSelector((state) => state.hotels.hotels);
  const token = useSelector((state) => state.user.user.token);
  const user = useSelector((state) => state.user.user);

  return (
    <header id="main-header">
      <nav>
        <ul>
          <li>
            <img src={h_hypnos_logo} alt="Logo" />
            <img src={hypnos_name_logo} alt="Logo name" />
          </li>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/rooms">rooms</Link>
          </li>
          {hotels.map(hotel => {
              return(
              <li>
                <Link to={'/hotel/' + hotel.id}>{hotel.name}</Link>
              </li>)
           })}
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