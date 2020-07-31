import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const context = {
    email,
    password,
    setEmail,
    setPassword,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
