import { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateHotel() {

  const user = useSelector((state) => state.user.user);

  const [name, setName] = useState('hotelTest');
  const [city, setCity] = useState('hotel city');
  const [adress, setAdress] = useState('hotel adress');
  // const [description, setPassword] = useState('test');
  // const [stars, setPassword] = useState('test');
  // const [userId, setPasswordForConfirmation] = useState('test');
  // const [bookingLink, setPasswordForConfirmation] = useState('test');

  const navigate = useNavigate();

  async function createHotel(e) {
    e.preventDefault();

    if(
      name === "" ||
      city === "" ||
      adress === ""
    ) {
      return
    }

    const url = 'http://ecf.local/api/hotels';
    const postData = {
      "name": name,
      "city": city,
      "adress": adress
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user.token,
      },
      body: JSON.stringify(postData),
    });

    const responseData = await response.json();
    console.log(responseData)

    const hotelResponse = await fetch("http://ecf.local/api/hotels/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"},
    });

    const hotelData = await hotelResponse.json();
    console.log(hotelData);

    navigate("/admin/hotel_liste");
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
