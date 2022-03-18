import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addRooms } from './roomsSlice';

function Rooms() {
  // const [rooms, setRooms] = useState([])
  const rooms = useSelector((state) => state.rooms.rooms);
  const token = useSelector((state) => state.user.token);
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
