import { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchApi } from "./fetchApi";

function UpdateRoom() {
  const location = useLocation();
  const navigate = useNavigate();

  const room = location.state;
  const user = useSelector((state) => state.user.user);

  const [title, setTitle] = useState(room.title);
  const [description, setDescription] = useState(room.description);
  const [price, setPrice] = useState(room.price);
  // const [image, setPassword] = useState('test');
  // const [galery, setPasswordForConfirmation] = useState('test');
  // const [bookingLink, setPasswordForConfirmation] = useState('test');


  async function updateRoom(e) {
    e.preventDefault();

    if(
      title === "" ||
      description === "" ||
      price === ""
    ) {
      return
    }

    const postData = {
      "title": title,
      "description": description,
      "price": Number(price)
    }

    await fetchApi('rooms/' + room.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/merge-patch+json",
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

  return(
    <div id="update-room" className="form">
      <h1>Modifer</h1>
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

export default UpdateRoom;