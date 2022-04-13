import _ from 'lodash';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { addHotels, deleteHotels } from './hotelsSlice';
import PromoteUser from './PromoteUser';

function UpdateHotel() {
  const dispatch = useDispatch();

  const admin = useSelector((state) => state.user.user);
  const hotels = _.sortBy(useSelector((state) => state.hotels.hotels), ['name']);
  const [usersList, setUsersList] = useState([]);

  async function getHotelsList() {
    dispatch(deleteHotels([]));

    const response = await fetch('http://ecf.local/api/hotels/', {
      headers: {
        'Accept': 'application/json',
      }
    });
    const hotelsData = await response.json();
    dispatch(addHotels(await hotelsData));
  }

  async function getUserList() {
    const url = 'http://ecf.local/api/users';
    const response = await fetch(url, {
      headers: {
        "Accept": "application/json",
      },
    });
    const usersListeData = await response.json();
    setUsersList(await _.sortBy(usersListeData, ['name', 'email']));
  }

  async function demoteUser(user) {
    hotels.forEach(async hotel => {
      if(user.roles.includes('ROLE_ADMIN') || Number(hotel.user.slice(11)) !== user.id) {
        return
      }

      const userPostData = {
        "roles": ['ROLE_USER']
      };
      await fetch('http://ecf.local/api/users/' + user.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/merge-patch+json",
          'Authorization': 'Bearer ' + admin.token,
        },
        body: JSON.stringify(userPostData),
      });

      const hotelPostData = {
        "user": null
      };
      await fetch('http://ecf.local/api/hotels/' + hotel.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/merge-patch+json",
          'Authorization': 'Bearer ' + admin.token,
        },
        body: JSON.stringify(hotelPostData),
      });

      getUserList();
      getHotelsList();
    })
  }

  useEffect(() => {
    getUserList();
    getHotelsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <>
      <h1>Utilisateurs</h1>
      {usersList.length > 0 ?
        <>
          {usersList.map(user => {
            if(user.roles.includes('ROLE_ADMIN')) {
              return<></>
            }
            return(
              <>
                <article key={user.id}>
                  <p>{user.email}</p>
                  <p>{
                    user.roles.includes('ROLE_MANAGER') ?
                    <>Manageur</>
                    :
                    <>Utilisateur</>
                  }</p>
                  <p>{user.first_name}</p>
                  <p>{user.last_name}</p>
                </article>
                {
                  user.roles.includes('ROLE_MANAGER') ?
                  <button
                    onClick={() => demoteUser(user)}
                  >
                    destituer
                  </button>
                  :
                  <PromoteUser
                    getUserList={ getUserList }
                    getHotelsList={ getHotelsList }
                    user={ user }
                  />
                }

              </>
            )
          })}
          </>
          :
          <h2>LOADING...</h2>
      }
    </>
  )
}

export default UpdateHotel;
