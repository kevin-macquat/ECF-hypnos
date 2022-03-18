import { useDispatch } from 'react-redux';

import { deleteUser } from "./userSlice";

function Logout() {

  const dispatch = useDispatch();

  function logout() {
    dispatch(deleteUser())
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
