import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateRoom() {

  const user = useSelector((state) => state.user.user);

  const [title, setTitle] = useState('room');
  const [description, setDescription] = useState('room description');
  const [price, setPrice] = useState(100);
  // const [image, setPassword] = useState('test');
  const hotel= '/api/hotels/' + user.hotel;
  // const [galery, setPasswordForConfirmation] = useState('test');
  // const [bookingLink, setPasswordForConfirmation] = useState('test');

  const navigate = useNavigate();

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
      "hotel": hotel
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"},
        'Authorization': 'Bearer ' + user.token,
      body: JSON.stringify(postData),
    });

    const responseData = await response.json();
    console.log(responseData)

    const hotelResponse = await fetch("http://ecf.local/api/hotels/" + user.hotel, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"},
    });

    const hotelData = await hotelResponse.json();
    console.log(hotelData);

    navigate("/hotel/" + user.hotel);
  }

  return(
    <>
      <h1>Créer un compte</h1>
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
            type="test"
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
