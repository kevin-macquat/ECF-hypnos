import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import Logout from "../features/Logout";
import h_hypnos_logo from "../images/h_hypnos_logo.png";
import hypnos_name_logo from "../images/hypnos_name_logo.png";

function Header() {

  const token = useSelector((state) => state.user.user.token);
  const user = useSelector((state) => state.user.user);

  return (
    <header id="main-header">
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img src={h_hypnos_logo} alt="Logo" />
              <img src={hypnos_name_logo} alt="Logo name" />
            </Link>
          </li>
          <li>
            <Link to="/hotels">
              Liste des hotels
            </Link>
          </li>
          <li>
            Reserver
          </li>

          {user.roles.includes('ROLE_USER') &&
            <li>
              Mes reservations
            </li>
          }

          {user.roles.includes('ROLE_MANAGER') &&
            <li>
              <Link to={"/hotel/" + user.hotel}>
                Mon établissements
              </Link>
            </li>
          }

          {user.roles.includes('ROLE_ADMIN') &&
            <li>
              Gestion de Managers
            </li>
          }

          {token ?
            <li>
              <Logout />
            </li>
          :
            <li>
              <Link to="/login">
                Connexion
              </Link>
            </li>
          }
        </ul>
      </nav>
    </header>
  )

}

export default Header;