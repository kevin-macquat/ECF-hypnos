import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { addHotels } from './hotelsSlice';

import Header from '../components/Header';

function Hotels() {

  const hotels = useSelector((state) => state.hotels.hotels);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function() {
      const url = 'http://ecf.local/api/hotels';

      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        }
      });

      const hotelsData = await response.json();
      dispatch(addHotels(hotelsData));
    }());

  }, []);

  return (
    <>
    <Header />
      <main>
        {hotels.length > 0 ?
          <>
            {hotels.map(hotel => {
              return(
                <article key={hotel.id}>
                  <Link to={'/hotel/' + hotel.id}>{hotel.name}</Link>
                  <p>{hotel.city}</p>
                  <p>{hotel.adress}</p>
                  <p>{hotel.stars}☆</p>
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
