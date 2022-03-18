import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';

import { addUser, addToken } from "./userSlice";

function Login() {
  const [token, setToken] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    (async function() {
      const url = 'http://ecf.local/api/login';

      const postData = {
        "email": "admin@admin.com",
        "password": "admin"
      }
      // const postData = {
      //   "email": "user@user.com",
      //   "password": "user"
      // }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"},
        body: JSON.stringify(postData),
      });

      const tokenData = await response.json();
      console.log('login component');
      console.log(tokenData);
      console.log(tokenData.token);

      setToken(tokenData);
      dispatch(addToken(tokenData.token));
      console.log(token);

      const tokenForDecode = await jwtDecode(tokenData.token);
      dispatch(addUser(tokenForDecode));
      console.log(tokenForDecode);

      const postData2 = {
        "email": "user@user.com",
        "password": "user"
      }

      const response2 = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"},
        body: JSON.stringify(postData2),
      });
      const tokenData2 = await response2.json();
      console.log('user');
      console.log(tokenData2);
      const tokenForDecode2 = await jwtDecode(tokenData2.token);
      console.log(tokenForDecode2);

    }());

  }, []);

  return(
    <>
      <h1>Login</h1>
    </>
  )
}

export default Login;
