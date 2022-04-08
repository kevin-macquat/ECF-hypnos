import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addUser } from "./userSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('manager@manager.com');
  const [password, setPassword] = useState('manager');

  async function login(e) {
    e.preventDefault();

    const url = 'http://ecf.local/api/login';

    if(email === "" || password === "") {
      return
    }

    const postData = {
      "email": email,
      "password": password
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"},
      body: JSON.stringify(postData),
    });

    const tokenData = await response.json();
    const tokenForDecode = await jwtDecode(tokenData.token);

    if(tokenForDecode.roles.includes('ROLE_MANAGER')){
      const manager = await fetch("http://ecf.local/api/users/" + tokenForDecode.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const managerData = await manager.json();
      const hotelId = Number(managerData.hotel.slice(12));

      dispatch(addUser({...tokenForDecode, ...tokenData, 'hotel': hotelId}));
      navigate('/hotel/' + hotelId);
    }else {
      dispatch(addUser({...tokenForDecode, ...tokenData}));
      navigate('/hotels');
    }
  }

  return(
    <>
      <h1>Connexion</h1>
      <form>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Mot de passe:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          onClick={(e) => login(e)}
        >
          Connexion
        </button>
      </form>
      <button
        onClick={() => navigate('/create_account')}
      >
        Créer un compte
      </button>
    </>
  )
}

export default Login;
