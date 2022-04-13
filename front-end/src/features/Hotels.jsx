import _ from 'lodash';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

import { addHotels, deleteHotels } from './hotelsSlice';

function Hotels() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hotels = _.sortBy(useSelector((state) => state.hotels.hotels), ['name']);
  const user = useSelector((state) => state.user.user);

  async function getHotels() {
    const url = 'http://ecf.local/api/hotels/';

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      }
    });

    const hotelsData = await response.json();
    return await hotelsData;
  }

  useEffect(() => {
    dispatch(deleteHotels([]));
    (async function() {
      dispatch(addHotels(await getHotels()));
    }());

  }, []);

  async function deleteHotel(hotel) {
    await fetch('http://ecf.local/api/hotels/' + hotel.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + user.token,
      }
    });

    dispatch(deleteHotels(await getHotels()));
  }

  const isPermitted = user.roles.includes('ROLE_ADMIN');

  return (
    <>
      <main id='hotel-list'>
      {isPermitted &&
        <button
        onClick={() => navigate('/admin/create_hotel')}
        >
          Ajouter un hotel
        </button>
      }
        {hotels.length > 0 ?
          <>
            {hotels.map(hotel => {
              return(
                <>
                  <Link to={'/hotel/' + hotel.id}>
                    <article key={hotel.id}>
                      <p>{hotel.name}</p>
                      <span>{hotel.city}, </span>
                      <span>{hotel.adress}</span>
                      <p>{hotel.stars}☆</p>
                    </article>
                  </Link>
                  {isPermitted &&
                    <>
                      <button
                        onClick={() => navigate('/admin/update_hotel', {state : hotel} )}
                      >
                        modifer
                      </button>
                      <button
                        onClick={() => deleteHotel(hotel)}
                      >
                        supprimer
                      </button>
                    </>
                  }
                </>
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

export default Hotels;
