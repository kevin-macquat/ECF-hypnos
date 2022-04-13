import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deleteUser } from "./userSlice";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(deleteUser());
    navigate('/');
  }

  return(
    <>
      <p
        id="logout"
        onClick={() => logout()}
      >
        Déconnection
      </p>
    </>
  )
}

export default Logout;
