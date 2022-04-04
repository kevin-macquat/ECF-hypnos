import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRooms, deleteRooms } from './roomsSlice';
import _ from 'lodash';

function Hotel(props) {
  const hotel = props.component;
  const rooms = _.sortBy(useSelector((state) => state.rooms.rooms), ['title', 'price']);

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
      <p>
        {hotel.name}
      </p>
      {rooms.map(room => {
        return <p key={room.id}>{room.title}</p>
      })}
    </>
  );
}

export default Hotel;
