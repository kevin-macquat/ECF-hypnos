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
        onClick={() => logout()}
      >logout</button>
    </>
  )
}

export default Logout;
