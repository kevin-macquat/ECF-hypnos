import jwtDecode from "jwt-decode";
import { addUser } from "./userSlice";

export function fetchApi(url, ...otherParams) {
  const baseUrl = 'https://kevin-macquat-ecf2.herokuapp.com/api/';
  // const baseUrl = 'http://ecf.local/api/';
  return fetch(`${baseUrl}${url}`, ...otherParams);
}

export async function login(email, password, dispatch, navigate) {
    console.log("début login");

  if(email === "" || password === "") {
    return
  }

  const postData = {
    "email": email,
    "password": password
  }
  const response = await fetchApi('login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"},
    body: JSON.stringify(postData),
  });

  const tokenData = await response.json();
  const tokenForDecode = await jwtDecode(tokenData.token);

  const user = await fetchApi("users/" + tokenForDecode.id, {
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
      'id': userData.id,
    }));
    navigate('/');
  }else {
    dispatch(addUser({
      ...tokenForDecode,
      ...tokenData,
      'firstName': userData.first_name,
      'lastName': userData.last_name,
      'id': userData.id,
    }));
    navigate('/');
  }
}

// export default Login;
