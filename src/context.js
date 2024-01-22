import { useContext, createContext, useState } from 'react';

const RegistrationDataContext = createContext();

export const useRegistrationData = () => useContext(RegistrationDataContext);

export const RegistrationDataProvider = ({ children, initialData }) => {
 // console.log('INITIAL DATA FROM CONTEXT: ', initialData);
  //STEP 1
  const initialRegistrationDataFromStep1 = initialData
    ? initialData.step1.reduce((acc, field) => {
        acc[field.code] = field.defaultValue || '';
        return acc;
      }, {})
    : {};

  const initialValidityFromStep1 = initialData
    ? initialData.step1.reduce((acc, field) => {
        if (field.code === "gender" ) acc[field.code] = true;
        
        else acc[field.code] = false;
        return acc;
      }, {})
    : {};

  const [registrationDataFromStep1, setRegistrationDataFromStep1] = useState(
    initialRegistrationDataFromStep1
  );

  const [validityFromStep1, setValidityFromStep1] = useState(
    initialValidityFromStep1
  );

  const updateRegistrationDataFromStep1 = (fieldCode, value) => {
    setRegistrationDataFromStep1((prevData) => ({
      ...prevData,
      [fieldCode]: value,
    }));
  };

  const updateFieldValidityFromStep1 = (fieldCode, isValid) => {
    setValidityFromStep1((prevValidity) => ({
      ...prevValidity,
      [fieldCode]: isValid,
    }));
  };

  const isStep1FormValid = () => {
    return Object.values(validityFromStep1).every((isValid) => isValid);
  }


  //STEP 2
  const initialRegistrationDataFromStep2 = initialData
    ? initialData.step2.reduce((acc, field) => {
        acc[field.code] = field.defaultValue || '';
        return acc;
      }, {})
    : {};

  const initialValidityFromStep2 = initialData
    ? initialData.step2.reduce((acc, field) => {
      if (field.code === "countrycode" ) acc[field.code] = true;
     
      else acc[field.code] = false;
        return acc;
      }, {})
    : {};

  const [registrationDataFromStep2, setRegistrationDataFromStep2] = useState(
    initialRegistrationDataFromStep2
  );

  const [validityFromStep2, setValidityFromStep2] = useState(initialValidityFromStep2)
 

  const updateRegistrationDataFromStep2 = (fieldCode, value) => {
    setRegistrationDataFromStep2((prevData) => ({
      ...prevData,
      [fieldCode]: value,
    }));
  };

  const updateFieldValidityFromStep2 = (fieldCode, isValid) => {
    setValidityFromStep2((prevValidity) => ({
      ...prevValidity,
      [fieldCode]: isValid,
    }));
  };


  
  const isStep2FormValid = () => {
    return Object.values(validityFromStep2).every((isValid) => isValid);
  }

  return (
    <RegistrationDataContext.Provider
      value={{
        registrationDataFromStep1,
        updateRegistrationDataFromStep1,
        validityFromStep1,
        updateFieldValidityFromStep1,
        isStep1FormValid,
        registrationDataFromStep2,
        updateRegistrationDataFromStep2,
        validityFromStep2,
        updateFieldValidityFromStep2,
        isStep2FormValid,
      }}
    >
      {children}
    </RegistrationDataContext.Provider>
  );
};
