import React, { createContext, useState, useEffect } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
 
  const [id, setId] = useState(sessionStorage.getItem('id'));
  const [id_rol, setId_rol] = useState(sessionStorage.getItem('id_rol'));
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  useEffect(() => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('id_rol', id_rol);
  }, [token, id, id_rol]);


  const setGlobalToken = (value) => {
    setToken(value);
  };
  const setGlobalId = (value) => {
    setId(value);
  };
  const setGlobalId_rol = (value) => {
    setId_rol(value);
  };

  

  return (
    <MyContext.Provider value={{ token, id, id_rol, setGlobalToken, setGlobalId, setGlobalId_rol }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
