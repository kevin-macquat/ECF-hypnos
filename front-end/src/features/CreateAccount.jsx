import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function CreateAccount() {
  const [firstname, setFirstname] = useState('Jean');
  const [name, setName] = useState('FamilleJean');
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('test');
  const [passwordForConfirmation, setPasswordForConfirmation] = useState('test');

  const navigate = useNavigate();

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

    const url = 'http://ecf.local/api/users';
    const postData = {
      "email": email,
      "roles": [
        "ROLE_USER"
      ],
      "password": "password",
      "firstName": firstname,
      "lastName": name
    }
    const response = await fetch(url, {
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
    await fetch(url + '/' + responseData.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/merge-patch+json"},
      body: JSON.stringify(modifyPassword),
    });

    navigate('/');
  }

  return(
    <>
      <h1>Créer un compte</h1>
      <form>
        <label>
          Prenom:
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>
        <label>
          Nom:
          <input
            type="test"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={passwordForConfirmation}
            onChange={(e) => setPasswordForConfirmation(e.target.value)}
          />
        </label>
        <button
          type="submit"
          onClick={(e) => createAccount(e)}
        >
          créer
        </button>
      </form>
    </>
  )
}

export default CreateAccount;