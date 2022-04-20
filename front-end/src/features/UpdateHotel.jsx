import { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchApi } from "./fetchApi";

function UpdateHotel() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const hotel = location.state;

  const [name, setName] = useState(hotel.name);
  const [city, setCity] = useState(hotel.city);
  const [adress, setAdress] = useState(hotel.adress);
  // const [description, setPassword] = useState('test');
  const [stars, setStars] = useState(hotel.stars || 1);
  // const [userId, setPasswordForConfirmation] = useState('test');
  // const [bookingLink, setPasswordForConfirmation] = useState('test');

  async function updateRoom(e) {
    e.preventDefault();

    if(
      name === "" ||
      city === "" ||
      adress === "" ||
      stars < 1 ||
      stars > 5
    ) {
      return
    }

    const postData = {
      "name": name,
      "city": city,
      "adress": adress,
      "stars": Number(stars)
    };
    await fetchApi('hotels/' + hotel.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/merge-patch+json",
        'Authorization': 'Bearer ' + user.token,
      },
      body: JSON.stringify(postData),
    });
    navigate("/hotels");
  }

  return(
    <div id="update-hotel" className="form">
      <h1>Modifer</h1>
      <form>
        <label>
          <p>Nom de l'hotel:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <p>Ville:</p>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          <p>Adresse:</p>
          <input
            type="text"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
          />
        </label>
        <label>
          <p>Etoiles:</p>
          <input
            type="number"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            min="1"
            max="5"
          />
        </label>
        <br/>
        <button
          type="submit"
          onClick={(e) => updateRoom(e)}
        >
          modifer
        </button>
      </form>
    </div>
  )
}

export default UpdateHotel;