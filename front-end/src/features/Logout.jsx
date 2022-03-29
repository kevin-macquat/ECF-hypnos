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
      <button
        id="button-logout"
        onClick={() => logout()}
      >
        <span>
          logout
        </span>
      </button>
    </>
  )
}

export default Logout;
