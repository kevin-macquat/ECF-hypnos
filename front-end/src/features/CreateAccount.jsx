import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchApi, login } from "./fetchApi";

function CreateAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState('Jean');
  const [name, setName] = useState('FamilleJean');
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('test');
  const [passwordForConfirmation, setPasswordForConfirmation] = useState('test');

  async function createAccount(e) {
    e.preventDefault();

    if(
      email === "" ||
      password !== passwordForConfirmation ||
      name === "" ||
      firstname === ""
    ) {
      return
    }

    const postData = {
      "email": email,
      "roles": [
        "ROLE_USER"
      ],
      "password": "password",
      "firstName": firstname,
      "lastName": name
    }
    const response = await fetchApi('users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"},
      body: JSON.stringify(postData),
    });

    const responseData = await response.json();

    // temporaly for hash password

    const modifyPassword = {
      "password": password,
      "plainPassword": password
    }
    await fetchApi('users/' + responseData.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/merge-patch+json",
      },
      body: JSON.stringify(modifyPassword),
    });

    (async() => {
      login(email, password, dispatch, navigate);
    })();
  }

  return(
    <div id="create_account" className="form">
      <h1>Créer un compte</h1>
      <form>
        <label>
          <p>Prenom:</p>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>
        <label>
          <p>Nom:</p>
          <input
            type="test"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <p>Email:</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Mot de passe:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <p>Confirmer mot de passe:</p>
          <input
            type="password"
            value={passwordForConfirmation}
            onChange={(e) => setPasswordForConfirmation(e.target.value)}
          />
        </label>
        <br/>
        <button
          type="submit"
          onClick={(e) => createAccount(e)}
        >
          créer
        </button>
      </form>
    </div>
  )
}

export default CreateAccount;