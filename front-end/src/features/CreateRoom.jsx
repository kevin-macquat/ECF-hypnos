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
      "image": "https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/loisirs/sorties/hotels/belles-chambres-d-hotel/76660985-1-fre-FR/Les-plus-belles-chambres-d-hotel-pour-une-nuit-de-Saint-Valentin-reussie.jpg",
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
    <div id="create-room" className="form">
      <h1>Créer une chambre</h1>
      <form>
        <label>
          <p>Titre de la chambre:</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <p>Description:</p>
          <textarea
            cols="30"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          <p>Prix:</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        {isPermitted &&
          <label>
            <p>Hotel:</p>
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
          </label>
        }

        <br/>
        <button
          type="submit"
          onClick={(e) => createRoom(e)}
        >
          créer
        </button>
      </form>
    </div>
  )
}

export default CreateRoom;
