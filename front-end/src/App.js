// import logo from './logo.svg';
import './App.css';
import Admin from './features/Admin';
import Login from './features/Login';
import Rooms from './features/Rooms';

import { useSelector } from 'react-redux';
import Logout from './features/Logout';

function App() {

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  return (
    <>
      <h1>Hello World !</h1>
      <h2>{user.email}</h2>
      <Login />
      <Logout />
      {token ? <Rooms /> : null}
      {user.roles.includes('ROLE_ADMIN') && <Admin />}
    </>
  );
}

export default App;
