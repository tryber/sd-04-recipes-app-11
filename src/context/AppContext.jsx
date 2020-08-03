import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const context = {
    email,
    password,
    title,
    showSearch,
    setEmail,
    setPassword,
    setTitle,
    setShowSearch,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
