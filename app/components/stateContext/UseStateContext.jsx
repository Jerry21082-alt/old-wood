"use client";

import { useContext, createContext, useState } from "react";

const Context = createContext();

export default function UseStateContext({ children }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  return (
    <Context.Provider
      value={{
        openMenu,
        setOpenMenu,
        toggleMobileMenu,
        setToggleMobileMenu,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const stateProvider = () => useContext(Context);
