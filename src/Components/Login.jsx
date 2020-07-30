import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Login = () => {
  const { nome } = useContext(AppContext);

  return (
    <div id="meals">
      <span>{nome}</span>
    </div>
  );
};

export default Login;
