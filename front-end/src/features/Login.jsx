import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addUser } from "./userSlice";

function Login() {
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('admin');

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    dispatch(addUser({...tokenForDecode, ...tokenData}));
    navigate('/rooms');
  }

  return(
    <>
      <h1>Login</h1>
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
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          onClick={(e) => login(e)}
        >login</button>
      </form>
    </>
  )
}

export default Login;
