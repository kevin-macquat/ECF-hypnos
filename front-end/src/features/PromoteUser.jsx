import _ from 'lodash';
import { useState } from "react";
import { useSelector } from 'react-redux';

function PromoteUser(props) {
  const admin = useSelector((state) => state.user.user);
  const allHotels = _.sortBy(useSelector((state) => state.hotels.hotels), ['name']);
  const getUserList = props.getUserList;
  const getHotelsList = props.getHotelsList;
  const hotelList = allHotels.filter(hotel => hotel.user === undefined);
  const user = props.user;

  const [hotelId, setHotelId] = useState(0);
  const [showSelection, setShowSelection] = useState(false);

  async function promoteUser() {
    if(user.roles.includes('ROLE_MANAGER') || user.roles.includes('ROLE_ADMIN') || hotelId === 0 ) {
      console.log('CUTTED');
      setShowSelection(false);
      return
    }

    const userPostData = {
      "roles": ['ROLE_MANAGER']
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
      "user": '/api/users/' + user.id,
    };
    await fetch('http://ecf.local/api/hotels/' + hotelId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/merge-patch+json",
        'Authorization': 'Bearer ' + admin.token,
      },
      body: JSON.stringify(hotelPostData),
    });
    console.log('hotelPostData');

    getUserList();
    getHotelsList();
    setShowSelection(false);
  }

  return(
    <>
      {!showSelection &&
        <button onClick={() => setShowSelection(!showSelection)}>
          promouvoir
        </button>
      }
      {showSelection &&
      <>
        {hotelList.length > 0 ?
          <select
              value={hotelId}
              onChange={(e) => setHotelId(Number(e.target.value))}
            >
              <option
                value={0}
              >
                -- selectioner un hotel --
              </option>

              {hotelList.map(hotel => {
                return(
                  <option
                    value={hotel.id}
                  >
                    {hotel.name}
                  </option>
                )
              })}

          </select>
          :
          <span>Pas d'hotel disponible</span>
        }
        <button onClick={() => promoteUser()}>
        valider
      </button>
      </>
      }
    </>
  )
}

export default PromoteUser;
