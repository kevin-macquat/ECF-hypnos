import { useSelector } from 'react-redux';

function Home() {

  const user = useSelector((state) => state.user.user);

  return (
    <>
      <h1>Hello World !</h1>
      <h2>{user.email}</h2>
    </>
  );
}

export default Home;
