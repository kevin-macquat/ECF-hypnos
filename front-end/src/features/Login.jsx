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

    const user = await fetch("http://ecf.local/api/users/" + tokenForDecode.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userData = await user.json();

    if(tokenForDecode.roles.includes('ROLE_MANAGER')){
      const hotelId = Number(userData.hotel.slice(12));
      dispatch(addUser({
        ...tokenForDecode,
        ...tokenData,
        'hotel': hotelId,
        'firstName': userData.first_name,
        'lastName': userData.last_name,
      }));
      navigate('/');
    }else {
      dispatch(addUser({
        ...tokenForDecode,
        ...tokenData,
        'firstName': userData.first_name,
        'lastName': userData.last_name,
      }));
      navigate('/');
    }
  }

  return(
    <div id="login">
      <h1>Connexion</h1>
      <form>
        <label>
          <p>Email:</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Mot de passe:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br/>
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
    </div>
  )
}

export default Login;
