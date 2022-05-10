import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchApi } from './fetchApi';
import moment from 'moment';

function ReservationList() {
  const hotels = _.sortBy(useSelector((state) => state.hotels.hotels), ['name']);
  const user = useSelector((state) => state.user.user);

  const [reservations, setReservations] = useState([])

  async function getReservations() {
    const response = await fetchApi('users/' + user.id + '/reservations', {
      headers: {
        'Accept': 'application/json',
      }
    });
    const userReservationsData = await response.json();
    return userReservationsData;
  }

  async function deleteReservation(reservation) {
    await fetchApi('reservations/' + reservation.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + user.token,
      }
    });
  }

  async function cancelReservation(reservation) {
    if(moment(reservation.dateStart) < moment().add(3, 'd')) {
      return
    } else {
       await deleteReservation(reservation);

      (async() => {
        setReservations(_.sortBy(await getReservations(), ['dateStart']));
      })();
    }
  }

  useEffect(() => {
    (async() => {
      setReservations(_.sortBy(await getReservations(), ['dateStart']));
    })();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id='hotel_page'>
      <header>
        <h1>
          Mes Réservations
        </h1>
      </header>
      {reservations.length > 0 ?
        <>
          {reservations.map(reservation => {
            return(
              <div
                className='room'
                key={reservation.id}
              >
                <div>
                  <p>{hotels.map(hotel =>
                    hotel.rooms.includes(reservation.room) ?
                      <>{hotel.name} à {hotel.city}</>
                      :
                      <></>
                    )}
                  </p>
                  <p>Du {moment(reservation.dateStart).format("DD/MM/YYYY")} au {moment(reservation.dateEnd).format("DD/MM/YYYY")}
                  </p>
                  <p>{reservation.roomTitle}</p>
                  <button
                    type='button'
                    className='button'
                    onClick={() => cancelReservation(reservation)}
                  >
                    annuler
                  </button>
                  <br />
                </div>
                <div id='css-test'></div>

              </div>
            )
          })}
        </>
        :
        <p>Vous n'avez aucune réservations</p>
      }
    </div>
  );
}

export default ReservationList;
