import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const UserLogin = () => {
  const { nome } = useContext(AppContext);

  return (
    <div id="meals">
      <span>{nome}</span>
    </div>
  );
};

export default UserLogin;
