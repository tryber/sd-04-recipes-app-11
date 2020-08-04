import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const Profile = () => {
  const email = window.localStorage.getItem('user');

  return (
    <div>
      <Header title="Perfil" />

      <p data-testid="profile-email">{email}</p>

      <Link to="/receitas-favoritas">
        <button data-testid="profile-favorite-btn">Receitas Favoritas</button>
      </Link>
      <Link to="/receitas-feitas">
        <button data-testid="profile-done-btn">Receitas Feitas</button>
      </Link>
      <Link to="/">
        <button
          data-testid="profile-logout-btn"
          onClick={() => window.localStorage.clear()}
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
};

export default Profile;
