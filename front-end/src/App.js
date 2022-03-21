// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

import Admin from './features/Admin';
import Home from './features/Home';
import Rooms from './features/Rooms';


function App() {

  const user = useSelector((state) => state.user.user);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          {user.roles.includes('ROLE_ADMIN') &&
            <Route path="/admin" exact element={<Admin />} />
          }
          <Route path="/rooms" exact element={<Rooms />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
