import _ from 'lodash';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchApi } from "./fetchApi";
import moment from 'moment';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Calendar } from 'react-date-range';

import { addRooms, deleteRooms } from './roomsSlice';

function Reservation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hotelList = _.sortBy(useSelector((state) => state.hotels.hotels), ['id']);
  const rooms = _.sortBy(useSelector((state) => state.rooms.rooms), ['title']);
  const user = useSelector((state) => state.user.user);

  const [roomId, setRoomId] = useState(0);
  const [hotelId, setHotelId] = useState(0);
  const [infoModal, setInfoModal] = useState({color:'', text:''});
  const [nightNumber, setNightNumber] = useState(1);
  const [stayDate, setStayDate] = useState({
    startDate: moment().toDate(),
    endDate: moment().add(nightNumber, 'd').toDate()
  });
  const [allRoomsReservations, setAllRoomsReservations] = useState([])

  function disabledDatesList() {
    let datesList = [];
    if(allRoomsReservations.length > 0) {
      allRoomsReservations.forEach(reservation => {
        for (let m = moment(reservation.dateStart); m.isSameOrBefore(reservation.dateEnd); m.add(1, 'days')) {
          datesList.push(m.toDate());
        }
      })
    }
    return datesList
  }

  const disabledDates = disabledDatesList();

  function setReservationDates(selectionedDate) {
    setStayDate({
      startDate: moment(selectionedDate).toDate(),
      endDate: moment(selectionedDate).add(nightNumber, 'd').toDate(),
    });
  }

  function addNight() {
    setNightNumber(nightNumber + 1);
    setStayDate({
      startDate: stayDate.startDate,
      endDate: moment(stayDate.startDate).add(nightNumber + 1, 'd').toDate(),
    });
  }

  function subNight() {
    if(nightNumber <= 1) {
      setNightNumber(1);
      setStayDate({
        startDate: stayDate.startDate,
        endDate: moment(stayDate.startDate).add(1, 'd').toDate(),
      });
    } else {
      setNightNumber(nightNumber - 1);
      setStayDate({
        startDate: stayDate.startDate,
        endDate: moment(stayDate.startDate).add(nightNumber - 1, 'd').toDate(),
      });
    }
  }

  function isFreeRoom() {
    let testAllReservation = []
    if(allRoomsReservations.length > 0) {
      allRoomsReservations.forEach(reservation => {
        if((moment(reservation.dateStart) > moment(stayDate.startDate) &&
          moment(reservation.dateStart) > moment(stayDate.endDate)) ||
          (moment(reservation.dateEnd) < moment(stayDate.startDate) &&
          moment(reservation.dateEnd) < moment(stayDate.endDate))
        ) {
          testAllReservation.push(true);
        } else {
          testAllReservation.push(false);
        }
      })
    }

    if(testAllReservation.every(e => e === true)) {
      setInfoModal({color:'green', text:'Disponible'});
      return true
    } else {
      setInfoModal({color:'red', text:'Pas disponible'});
      return false
    }

  }

  async function reserve(e) {
    e.preventDefault();

    if(Boolean(roomId)) {
      if(!user.token) {
        navigate('/login');
        return
      }

      const response = await fetchApi('rooms/' + roomId, {
        headers: {
          'Accept': 'application/json',
        }
      });
      const roomsData = await response.json();

      const postData = {
        "room": "api/rooms/" + roomId,
        "user": "api/users/" + user.id,
        "dateStart": moment(stayDate.startDate).format(),
        "dateEnd": moment(stayDate.endDate).format(),
        "roomTitle": await roomsData.title
      }

      await fetchApi('reservations', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + user.token,
        },
        body: JSON.stringify(postData),
      });

      (async() => {
        setAllRoomsReservations(await getRoomsReservation());
      })();

      // navigate('/reservation_list');
    }
  }

  async function getHotelRooms() {
    const response = await fetchApi('hotels/' + hotelId + '/rooms', {
      headers: {
        'Accept': 'application/json',
      }
    });

    const roomsData = await response.json();
    return await roomsData;
  }

  async function getRoomsReservation() {
    const response = await fetchApi('rooms/' + roomId + '/reservations', {
      headers: {
        'Accept': 'application/json',
      }
    });

    const roomsData = await response.json();
    return await roomsData;
  }

  useEffect(() => {
    isFreeRoom()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRoomsReservations, stayDate.startDate, stayDate.endDate]);

  useEffect(() => {
    if(roomId !== 0) {
      (async() => {
        setAllRoomsReservations(await getRoomsReservation());
      })();
    } else {
      setAllRoomsReservations([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  useEffect(() => {
    dispatch(deleteRooms());
    if(hotelId !== 0) {
      (async() => {
        dispatch(addRooms(await getHotelRooms()));
      })();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelId]);

  return(
    <>
    <div className="form">
      <h1>Réservation</h1>

      <form>
        <label>
          <p>Hotels :</p>

          {hotelList.length > 0 ?
            <select
                value={hotelId}
                onChange={(e) => setHotelId(Number(e.target.value))}
              >
                <option
                  value={0}
                >
                  -- sélectionner un hotel --
                </option>

                {hotelList.map(hotel => {
                  return(
                    <option
                      value={hotel.id}
                      key={hotel.id}
                    >
                      {hotel.name}
                    </option>
                  )
                })}

            </select>
            :
            <span>Pas d'hôtel disponible</span>
          }
        </label>

        <label>
          <p>Chambres :</p>

          {rooms.length > 0 ?
            <select
                value={roomId}
                onChange={(e) => setRoomId(Number(e.target.value))}
              >
                <option
                  value={0}
                >
                  -- sélectionner une chambre --
                </option>

                {rooms.map(room => {
                  return(
                    <option
                      value={room.id}
                      key={room.id}
                    >
                      {room.title}
                    </option>
                  )
                })}

            </select>
            :
            <span>Aucune chambre disponible</span>
          }
        </label>

        <label id="number-night-container">
          <p>Nombre de nuits :</p>
          <button type="button" onClick={() => subNight()}>-</button>
          <p id="night">{nightNumber} nuits</p>
          <button type="button" onClick={() => addNight()}>+</button>
        </label>

        <label>
          <p>Début du séjour :</p>

          <Calendar
            minDate={moment().toDate()}
            maxDate={moment().add(10, 'M').add(1, 'w').day(6).toDate()}
            onChange={(e) => setReservationDates(e)}
            ranges={[stayDate]}
            displayMode="dateRange"
            disabledDates={disabledDates}
          />
        </label>

        {Boolean(roomId) &&
         <>
            {infoModal.text &&
              <div
                id={infoModal.color}
              >
                <p>
                  {infoModal.text}
                </p>
              </div>
            }
         </>
        }
        <br/>
        <button
          type="submit"
          onClick={(e) => reserve(e)}
        >
          réserver
        </button>
      </form>
    </div>
    </>
  )
}

export default Reservation;
