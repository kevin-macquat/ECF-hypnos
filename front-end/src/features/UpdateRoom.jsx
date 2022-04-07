import { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

function UpdateRoom() {
  const location = useLocation();
  const room = location.state;
  const user = useSelector((state) => state.user.user);

  const [title, setTitle] = useState(room.title);
  const [description, setDescription] = useState(room.description);
  const [price, setPrice] = useState(room.price);
  // const [image, setPassword] = useState('test');
  // const [galery, setPasswordForConfirmation] = useState('test');
  // const [bookingLink, setPasswordForConfirmation] = useState('test');

  const navigate = useNavigate();

  async function updateRoom(e) {
    e.preventDefault();

    if(
      title === "" ||
      description === "" ||
      price === ""
    ) {
      return
    }

    const url = 'http://ecf.local/api/rooms/' + room.id;

    const postData = {
      "title": title,
      "description": description,
      "price": Number(price)
    }

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/merge-patch+json"},
        'Authorization': 'Bearer ' + user.token,
      body: JSON.stringify(postData),
    });

    const responseData = await response.json();
    console.log(responseData);
    navigate('/hotel/' + user.hotel);
  }

  return(
    <>
      <h1>Modifer</h1>
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
          onClick={(e) => updateRoom(e)}
        >
          modifer
        </button>
      </form>
    </>
  )
}

export default UpdateRoom;