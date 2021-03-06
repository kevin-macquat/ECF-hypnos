// import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addHotels } from './features/hotelsSlice';

import CreateAccount from './features/CreateAccount';
import Login from './features/Login';
import Header from './components/Header';
import Home from './features/Home';
import Hotel from './features/Hotel';
import Hotels from './features/Hotels';
import CreateRoom from './features/CreateRoom';
import UpdateRoom from './features/UpdateRoom';
import CreateHotel from './features/CreateHotel';
import UpdateHotel from './features/UpdateHotel';
import ManageUser from './features/ManageUser';
import { fetchApi } from './features/fetchApi';
import Reservation from './features/Reservation';
import ReservationList from './features/ReservationList';


function App() {

  const user = useSelector((state) => state.user.user);
  const hotels = useSelector((state) => state.hotels.hotels);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function() {
      const response = await fetchApi('hotels', {
        headers: {
          'Accept': 'application/json',
        }
      });

      const hotelsData = await response.json();
      dispatch(addHotels(hotelsData));
    }());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />

          <Route path="/hotels" exact element={<Hotels />} />
          {hotels.map(hotel => {
             return <Route key={hotel.id} path={'/hotel/' + hotel.id} exact element={<Hotel component={hotel} />}/>
          })}

          <Route path="/reservation" exact element={<Reservation />} />

          {user.roles.includes('ROLE_ADMIN') &&
            <>
              <Route path="/admin/manage_user" exact element={<ManageUser />} />
              <Route path="/admin/create_hotel" exact element={<CreateHotel />} />
              <Route path="/admin/update_hotel" exact element={<UpdateHotel />} />
              <Route path="/manager/create_room" exact element={<CreateRoom />} />
              <Route path="/manager/update_room" exact element={<UpdateRoom />} />
            </>
          }

          {user.roles.includes('ROLE_MANAGER') &&
            <>
              <Route path="/manager/create_room" exact element={<CreateRoom />} />
              <Route path="/manager/update_room" exact element={<UpdateRoom />} />
            </>
          }

          {user.roles.includes('ROLE_USER') &&
            <>
              <Route path="/reservation_list" exact element={<ReservationList />} />
            </>
          }

          <Route path="/create_account" exact element={<CreateAccount />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
