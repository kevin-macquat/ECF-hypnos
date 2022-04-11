import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <h1>Bienvenue</h1>
      <h2>{user.firstName} {user.lastName}</h2>
    </>
  );
}

export default Home;
