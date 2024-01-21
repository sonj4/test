import { useContext, createContext, useState } from "react";

const RegistrationDataContext = createContext();

export const useRegistrationData = () => useContext(RegistrationDataContext);

export const RegistrationDataProvider = ({ children }) => {
  const [registrationData, setRegistrationData] = useState({});

  const updateRegistrationData = (newData) => {
    setRegistrationData({ ...registrationData, ...newData });
  };

  return (
    <RegistrationDataContext.Provider
      value={{ registrationData, updateRegistrationData }}
    >
      {children}
    </RegistrationDataContext.Provider>
  );
};
