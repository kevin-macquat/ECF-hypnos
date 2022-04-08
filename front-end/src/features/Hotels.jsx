import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { addHotels, deleteHotels } from './hotelsSlice';
import _ from 'lodash';

function Hotels() {
  const hotels = _.sortBy(useSelector((state) => state.hotels.hotels), ['name']);
  const user = useSelector((state) => state.user.user);
  console.log(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <>
      <main>
        <button
        onClick={() => navigate('/admin/create_hotel')}
        >
          Ajouter un hotel
        </button>
        {hotels.length > 0 ?
          <>
            {hotels.map(hotel => {
              return(
                <article key={hotel.id}>
                  <Link to={'/hotel/' + hotel.id}>{hotel.name}</Link>
                  <p>{hotel.city}</p>
                  <p>{hotel.adress}</p>
                  <p>{hotel.stars}☆</p>
                  {user.roles.includes('ROLE_ADMIN') &&
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

export default Hotels;
