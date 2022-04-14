import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import Logout from "../features/Logout";
import h_hypnos_logo from "../images/h_hypnos_logo.png";
import hypnos_name_logo from "../images/hypnos_name_logo.png";

function Header() {
  const token = useSelector((state) => state.user.user.token);
  const user = useSelector((state) => state.user.user);

  const [width, setWidth] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(false);

  const menu =
  <>
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
        <Link to={"/admin/manage_user"}>
        Gestion de Managers
        </Link>
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
  </>;

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
  }, []);

  return (
    <header id="main-header">
      <nav>
          {width <= 725 ?
            <>
              <Link to="/">
                <img src={h_hypnos_logo} alt="Logo" />
              </Link>
              <div onClick={() => setShowMenu(!showMenu)}>
                <img src="https://img.icons8.com/ios-filled/100/000000/menu-rounded.png" alt="Menu"/>
              </div>
              {showMenu &&
                <ul onClick={() => setShowMenu(false)}>
                  {menu}
                </ul>
              }
            </>
          :
            <ul>
              <Link to="/">
                <img src={h_hypnos_logo} alt="Logo" />
                <img src={hypnos_name_logo} alt="Logo name" />
              </Link>
              {menu}
            </ul>
          }
      </nav>
    </header>
  )

}

export default Header;