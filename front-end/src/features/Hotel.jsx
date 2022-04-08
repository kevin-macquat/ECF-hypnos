import _ from 'lodash';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addRooms, deleteRooms } from './roomsSlice';

function Hotel(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hotel = props.component;
  const rooms = _.sortBy(useSelector((state) => state.rooms.rooms), ['title', 'price']);
  const user = useSelector((state) => state.user.user);

  async function getHotelRooms() {
    const url = 'http://ecf.local/api/hotels/' + hotel.id + '/rooms';

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      }
    });

    const roomsData = await response.json();
    return await roomsData;
  }

  useEffect(() => {
    dispatch(deleteRooms([]));
    (async() => {
      dispatch(addRooms(await getHotelRooms()));
    })()

  }, []);

  async function deleteRoom(room) {
    await fetch('http://ecf.local/api/rooms/' + room.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + user.token,
      }
    });

    dispatch(deleteRooms(await getHotelRooms()));
  }

  const isPermitted = (user.roles.includes('ROLE_MANAGER') && user.hotel === hotel.id) ||
  user.roles.includes('ROLE_ADMIN');

  return (
    <>
      {isPermitted &&
        <button
        onClick={() => navigate('/manager/create_room')}
        >
          Ajouter une chambre
        </button>
      }
      <p>
        {hotel.name}
      </p>
      {rooms.map(room => {
        return <>
          <p key={room.id}>{room.title}</p>

          {isPermitted &&
            <>
              <button
                onClick={() => navigate('/manager/update_room', {state : room} )}
              >
                modifer
              </button>
              <button
                onClick={() => deleteRoom(room)}
              >
                supprimer
              </button>
            </>
          }

        </>
      })}
    </>
  );
}

export default Hotel;
