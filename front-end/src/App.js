// import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addHotels } from './features/hotelsSlice';

import Admin from './features/Admin';
import Login from './features/Login';
import Home from './features/Home';
import Hotel from './features/Hotel';
import Hotels from './features/Hotels';
import Rooms from './features/Rooms';


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
      // console.log(response);

      const hotelsData = await response.json();
      // console.log(hotelsData);
      dispatch(addHotels(hotelsData));
    }());

  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />


          <Route path="/hotels" exact element={<Hotels />} />
          {hotels.map(hotel => {
             return <Route path={'/hotel/' + hotel.id} exact element={<Hotel component={hotel} />}/>
          })}

          {user.roles.includes('ROLE_ADMIN') &&
            <Route path="/admin" exact element={<Admin />} />
          }

          <Route path="/login" exact element={<Login />} />
          <Route path="/rooms" exact element={<Rooms />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
