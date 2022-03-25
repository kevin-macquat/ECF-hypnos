import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRooms, deleteRooms } from './roomsSlice';

import Header from '../components/Header';

function Hotel(props) {
  const hotel = props.component;
  const rooms = useSelector((state) => state.rooms.rooms);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(deleteRooms([]));
    hotel.rooms.forEach(room =>{
      (async function() {
        const url = 'http://ecf.local' + room;

        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
          }
        });

        const roomData = await response.json();
        dispatch(addRooms([roomData]));
      }())
    })

  }, [hotel.rooms]);

  return (
    <>
      <Header />
      <p>
        {hotel.name}
      </p>
      {rooms.map(room => {
        return <p>{room.title}</p>
      })}
    </>
  );
}

export default Hotel;
