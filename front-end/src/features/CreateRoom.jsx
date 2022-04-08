import { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateRoom() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const hotels = useSelector((state) => state.hotels.hotels);

  const [title, setTitle] = useState('room');
  const [description, setDescription] = useState('room description');
  const [price, setPrice] = useState(100);
  // const [image, setPassword] = useState('test');
  const [hotel, setHotel] = useState(user.hotel);
  // const [galery, setPasswordForConfirmation] = useState('test');
  // const [bookingLink, setPasswordForConfirmation] = useState('test');

  async function createRoom(e) {
    e.preventDefault();

    if(
      title === "" ||
      description === "" ||
      price === ""
    ) {
      return
    }

    const url = 'http://ecf.local/api/rooms';
    const postData = {
      "title": title,
      "description": description,
      "price": Number(price),
      "hotel": "api/hotels/" + hotel
    }
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user.token,
      },
      body: JSON.stringify(postData),
    });

    if(user.roles.includes('ROLE_MANAGER')) {
      navigate('/hotel/' + user.hotel);
    } else if(user.roles.includes('ROLE_ADMIN')) {
      navigate(-1);
    }
  }

  const isPermitted = user.roles.includes('ROLE_ADMIN');

  return(
    <>
      <h1>Créer une chambre</h1>
      <form>
        <label>
          Titre de la chambre:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Prix:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        {isPermitted &&
          <select
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
          >

            {hotels.map(hotel => {
              return(
                <option
                  value={hotel.id}
                >
                  {hotel.name}
                </option>
              )
            })}

          </select>
        }

        <button
          type="submit"
          onClick={(e) => createRoom(e)}
        >
          créer
        </button>
      </form>
    </>
  )
}

export default CreateRoom;
