import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from "./fetchApi";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('manager@manager.com');
  const [password, setPassword] = useState('manager');

  return(
    <div id="login" className="form">
      <h1>Connexion</h1>
      <form>
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
        <br/>
        <button
          type="submit"
          onClick={(e) => (async() => {
            e.preventDefault();
            login(email, password, dispatch, navigate);
          })()}
        >
          Connexion
        </button>
      </form>
      <button
        onClick={() => navigate('/create_account')}
      >
        Créer un compte
      </button>
    </div>
  )
}

export default Login;
