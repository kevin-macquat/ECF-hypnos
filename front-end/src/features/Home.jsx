import { useSelector } from 'react-redux';
import Hotels from './Hotels';

function Home() {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <div id='home'>
        <h1>Bienvenue</h1>
        <h2>{user.firstName} {user.lastName}</h2>
      </div>
      <Hotels />
    </>
  );
}

export default Home;
