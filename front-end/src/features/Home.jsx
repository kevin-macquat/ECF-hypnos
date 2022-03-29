import { useSelector } from 'react-redux';

import Header from '../components/Header';

function Home() {

  const user = useSelector((state) => state.user.user);

  return (
    <>
      <Header />
      <h1>Hello World !</h1>
      <h2>{user.email}</h2>
    </>
  );
}

export default Home;
