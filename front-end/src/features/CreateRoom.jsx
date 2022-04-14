import { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchApi } from "./fetchApi";

function CreateRoom() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const hotels = useSelector((state) => state.hotels.hotels);

  const [title, setTitle] = useState('room');
  const [description, setDescription] = useState('room description');
  const [price, setPrice] = useState(100);
  // const [image, setPassword] = useState('test');
  const [hotel, setHotel] = useState(user.hotel || 0);
  // const [galery, setPasswordForConfirmation] = useState('test');
  // const [bookingLink, setPasswordForConfirmation] = useState('test');

  async function createRoom(e) {
    e.preventDefault();

    if(
      title === "" ||
      description === "" ||
      price === "" ||
      hotel === 0
    ) {
      return
    }

    const postData = {
      "title": title,
      "description": description,
      "price": Number(price),
      "hotel": "api/hotels/" + hotel
    }
    await fetchApi('rooms', {
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
          <textarea
            cols="40"
            rows="5"
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
            <option
              value={0}
            >
              -- selectionner un hotel --
            </option>

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
