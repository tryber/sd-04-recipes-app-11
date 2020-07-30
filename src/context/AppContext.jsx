import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [nome, setNome] = useState('Alcionze');

  const context = {
    nome,
    setNome,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
