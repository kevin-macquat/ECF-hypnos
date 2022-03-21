import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRooms } from './roomsSlice';

import Header from '../components/Header';

function Rooms() {
  const rooms = useSelector((state) => state.rooms.rooms);
  const token = useSelector((state) => state.user.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function() {
      const url = 'http://ecf.local/api/rooms';

      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });

      const roomsData = await response.json();
      dispatch(addRooms(roomsData));
    }());

  }, []);

  return (
    <>
    <Header />
      <main>
        {rooms.length > 0 ?
          <>
            {rooms.map(room => {
              return(
                <article key={room.id}>
                  <h2>{room.title}</h2>
                  <p>{room.price}</p>
                </article>
              )
            })}
          </>
          :
          <h2>LOADING...</h2>
        }
      </main>
    </>
  );
}

export default Rooms;
