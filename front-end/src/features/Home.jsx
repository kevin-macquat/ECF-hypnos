import { useSelector } from 'react-redux';

import Header from '../components/Header';
import Login from './Login';

function Home() {

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.user.token);

  return (
    <>
      <Header />
      <h1>Hello World !</h1>
      <h2>{user.email}</h2>
      {!token && <Login />}
    </>
  );
}

export default Home;
