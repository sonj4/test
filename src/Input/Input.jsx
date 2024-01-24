import React from 'react';
import styles from './Input.module.css';
import { useState } from 'react';
import { validateField } from '../validateField';
import { useRegistrationData } from '../context';
import { useTranslation } from 'react-i18next';

export default function Input({ field, step }) {
  const [inputValue, setInputValue] = useState(field.defaultValue);
  const [isValid, setIsValid] = useState(
    field.code === 'gender' || field.code === 'countrycode' ? true : false
  );
  const [errMsg, setErrMsg] = useState('');

  const { t } = useTranslation();

  const {
    registrationDataFromStep1,
    updateRegistrationDataFromStep1,
    updateFieldValidityFromStep1,
    updateRegistrationDataFromStep2,
    updateFieldValidityFromStep2,
  } = useRegistrationData();

  const handleChange = (event) => {
    const { isValid, validationErrors } = validateField(
      event.target.value,
      field.validators,
      registrationDataFromStep1.password
    );
    setInputValue(event.target.value);
    setIsValid(isValid);
    setErrMsg(validationErrors.join(','));
    if (step === 1) {
      updateRegistrationDataFromStep1(field.code, event.target.value);
      updateFieldValidityFromStep1(field.code, isValid);
    } else if (step === 2) {
      updateRegistrationDataFromStep2(field.code, event.target.value);
      updateFieldValidityFromStep2(field.code, isValid);
    }
  };

  // const handleBlur = (e) => {
  //   updateRegistrationDataFromStep1(field.code, e.target.value);
  //   updateFieldValidityFromStep1(field.code, isValid);
  // }

  const inputType =
    field.fieldType === 'string'
      ? 'text'
      : field.fieldType === 'dropdown'
      ? 'dropdown'
      : field.fieldType === 'date'
      ? 'date'
      : field.fieldType === 'password'
      ? 'password'
      : '';

  if (inputType === 'dropdown') {
    const options = field.valueList.sort((a, b) => a.order - b.order);
    return (
      <>
        <label
          htmlFor={field.code}
          className={
            isValid
              ? `${styles.inputLabel} ${styles.valid}`
              : `${styles.inputLabel} ${styles.error}`
          }
        >
          {/* {field.name} */}
          {t(field.code)}
        </label>
        <div className={styles.inputErrorMsgContainer}>
          <select
            name={field.name}
            id={field.code}
            required={field.required ? field.required : false}
            value={inputValue}
            onChange={(e) => handleChange(e)}
            //onBlur={(e) => handleBlur(e)}
            className={
              isValid
                ? `${styles.selectField} ${styles.valid}`
                : `${styles.selectField} ${styles.error}`
            }
          >
            {options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              );
            })}
          </select>
          {!isValid && <span className={styles.errorMsg}>{errMsg}</span>}
        </div>
      </>
    );
  } else {
    return (
      <>
        <label
          htmlFor={field.code}
          className={
            `${styles.inputLabel} ${isValid ? styles.valid : styles.error} ${field.required ? styles.required : ''}`
          }
        >
          {t(field.code)}
        </label>
        <div className={styles.inputErrorMsgContainer}>
          <input
            type={inputType}
            name={field.name}
            id={field.code}
            required={field.required ? field.required : false}
            value={inputValue}
            onChange={(e) => handleChange(e)}
            className={
              isValid
                ? `${styles.inputField} ${styles.valid}`
                : `${styles.inputField} ${styles.error}`
            }
            //onBlur={(e) => handleBlur(e)}
            autoComplete='off'
          />
          {!isValid && <span className={styles.errorMsg}>{errMsg}</span>}
        </div>
      </>
    );
  }
}
