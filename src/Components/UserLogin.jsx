import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const validEmail = (email) => /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);

const setToLocalStorage = (email) => {
  const userEmail = JSON.stringify({ email });
  localStorage.setItem('user', userEmail);
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
};

const UserLogin = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(AppContext);

  return (
    <div>
      <h3>Login</h3>
      <form>
        <label htmlFor="email">Email</label>
        <input
          required
          id="email"
          type="email"
          data-testid="email-input"
          value={email}
          placeholder="Type your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          id="password"
          type="password"
          data-testid="password-input"
          value={password}
          placeholder="Type your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/comidas">
          <button
            type="submit"
            data-testid="login-submit-btn"
            disabled={!(validEmail(email) && password.length > 6)}
            onClick={() => setToLocalStorage(email)}
          >
            Login
          </button>
        </Link>
      </form>
    </div>
  );
};

export default UserLogin;
