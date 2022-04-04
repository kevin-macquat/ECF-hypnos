// import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addHotels } from './features/hotelsSlice';

import Admin from './features/Admin';
import CreateAccount from './features/CreateAccount';
import Login from './features/Login';
import Header from './components/Header';
import Home from './features/Home';
import Hotel from './features/Hotel';
import Hotels from './features/Hotels';


function App() {

  const user = useSelector((state) => state.user.user);
  const hotels = useSelector((state) => state.hotels.hotels);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function() {
      const url = 'http://ecf.local/api/hotels';
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        }
      });

      const hotelsData = await response.json();
      dispatch(addHotels(hotelsData));
    }());

  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />


          <Route path="/hotels" exact element={<Hotels />} />
          {hotels.map(hotel => {
             return <Route path={'/hotel/' + hotel.id} exact element={<Hotel component={hotel} />}/>
          })}

          {user.roles.includes('ROLE_ADMIN') &&
            <Route path="/admin" exact element={<Admin />} />
          }

          <Route path="/create_account" exact element={<CreateAccount />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
