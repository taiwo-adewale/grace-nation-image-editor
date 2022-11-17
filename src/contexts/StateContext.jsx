import React, { createContext, useContext, useState } from "react";

const StateContext = createContext(null);

export const StateContextProvider = ({ children }) => {
  const [allImages, setAllImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(0);
  const [allLogoProps, setAllLogoProps] = useState([]);

  const value = {
    allImages,
    setAllImages,
    selectedImg,
    setSelectedImg,
    allLogoProps,
    setAllLogoProps,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
