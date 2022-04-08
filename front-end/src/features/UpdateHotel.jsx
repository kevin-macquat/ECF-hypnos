import { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

function UpdateHotel() {
  const location = useLocation();
  console.log(location);
  const hotel = location.state;
  console.log(hotel);
  const user = useSelector((state) => state.user.user);

  const [name, setName] = useState(hotel.name);
  const [city, setCity] = useState(hotel.city);
  const [adress, setAdress] = useState(hotel.adress);
  // const [description, setPassword] = useState('test');
  // const [stars, setPassword] = useState('test');
  // const [userId, setPasswordForConfirmation] = useState('test');
  // const [bookingLink, setPasswordForConfirmation] = useState('test');

  const navigate = useNavigate();

  async function updateRoom(e) {
    e.preventDefault();

    if(
      name === "" ||
      city === "" ||
      adress === ""
    ) {
      return
    }

    const url = 'http://ecf.local/api/hotels/' + hotel.id;

    const postData = {
      "name": name,
      "city": city,
      "adress": adress
    }

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/merge-patch+json",
        'Authorization': 'Bearer ' + user.token,
      },
      body: JSON.stringify(postData),
    });

    const responseData = await response.json();
    console.log(responseData);
    navigate("/admin/hotel_liste");
  }

  return(
    <>
      <h1>Modifer</h1>
      <form>
        <label>
          Nom de l'hotel:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Ville:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          Adresse:
          <input
            type="text"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
          />
        </label>
        <button
          type="submit"
          onClick={(e) => updateRoom(e)}
        >
          modifer
        </button>
      </form>
    </>
  )
}

export default UpdateHotel;