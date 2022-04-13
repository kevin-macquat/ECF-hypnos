import { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchApi } from "./fetchApi";

function CreateHotel() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const [name, setName] = useState('hotelTest');
  const [city, setCity] = useState('hotel city');
  const [adress, setAdress] = useState('hotel adress');
  // const [description, setPassword] = useState('test');
  // const [stars, setPassword] = useState('test');
  // const [userId, setPasswordForConfirmation] = useState('test');
  // const [bookingLink, setPasswordForConfirmation] = useState('test');

  async function createHotel(e) {
    e.preventDefault();

    if(
      name === "" ||
      city === "" ||
      adress === ""
    ) {
      return
    }

    const postData = {
      "name": name,
      "city": city,
      "adress": adress
    }
    await fetchApi('hotels', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user.token,
      },
      body: JSON.stringify(postData),
    });

    navigate("/hotels");
  }

  return(
    <>
      <h1>Ajouter un hotel</h1>
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
          onClick={(e) => createHotel(e)}
        >
          créer
        </button>
      </form>
    </>
  )
}

export default CreateHotel;
